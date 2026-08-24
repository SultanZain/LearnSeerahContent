#!/usr/bin/env node
/**
 * Broadcast an OS push notification to every app install via FCM HTTP v1.
 *
 * Free + token-less: every install subscribes to the single `broadcast` topic
 * (native subscribe in the app's MainActivity), so we send to the TOPIC — no
 * device-token database, no Firestore, no Cloud Functions, no per-user tracking.
 *
 * Zero runtime dependencies — Node built-ins only (matches generate-paths.js), so
 * CI needs no `npm install` step for this.
 *
 * Inputs (env):
 *   FIREBASE_SERVICE_ACCOUNT  Full service-account JSON (repo secret). Required.
 *   FCM_TITLE                 Notification title. Required.
 *   FCM_BODY                  Notification body. Optional (sensible per-type default).
 *   FCM_TYPE                  'content-update' | 'app-update'. Required.
 *   FCM_VERSION               Optional version string (release tag) added to data.
 *
 * Exits non-zero on any parse/HTTP error so the CI step fails loudly.
 */

const https = require('https');
const crypto = require('crypto');

const TOPIC = 'broadcast';
const OAUTH_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
const TOKEN_URI = 'https://oauth2.googleapis.com/token';
const ANDROID_CHANNEL_ID = 'updates'; // must match push.ts + AndroidManifest meta-data

function base64url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

// Minimal HTTPS POST → { status, body }. Rejects only on transport errors.
function httpsPost(urlString, headers, body) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlString);
    const data = typeof body === 'string' ? body : JSON.stringify(body);
    const req = https.request(
      {
        method: 'POST',
        hostname: url.hostname,
        path: url.pathname + url.search,
        headers: { ...headers, 'Content-Length': Buffer.byteLength(data) },
      },
      (res) => {
        let chunks = '';
        res.on('data', (c) => (chunks += c));
        res.on('end', () => resolve({ status: res.statusCode, body: chunks }));
      },
    );
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// Sign a JWT with the service account key and exchange it for an OAuth access
// token scoped to FCM. RS256 over the service account's private key.
async function getAccessToken(sa) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const claim = {
    iss: sa.client_email,
    scope: OAUTH_SCOPE,
    aud: TOKEN_URI,
    iat: now,
    exp: now + 3600,
  };
  const unsigned = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(claim))}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(unsigned);
  signer.end();
  const jwt = `${unsigned}.${base64url(signer.sign(sa.private_key))}`;

  const form =
    `grant_type=${encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')}` +
    `&assertion=${encodeURIComponent(jwt)}`;
  const res = await httpsPost(
    TOKEN_URI,
    { 'Content-Type': 'application/x-www-form-urlencoded' },
    form,
  );
  if (res.status !== 200) {
    throw new Error(`OAuth token exchange failed (HTTP ${res.status}): ${res.body}`);
  }
  const token = JSON.parse(res.body).access_token;
  if (!token) throw new Error(`OAuth response had no access_token: ${res.body}`);
  return token;
}

async function main() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  const title = process.env.FCM_TITLE;
  const type = process.env.FCM_TYPE;
  const version = process.env.FCM_VERSION || '';
  const body =
    process.env.FCM_BODY ||
    (type === 'app-update'
      ? 'A new version is available. Open to update.'
      : 'Fresh lessons are ready. Open to sync.');

  if (!raw) throw new Error('FIREBASE_SERVICE_ACCOUNT secret is not set.');
  if (!title) throw new Error('FCM_TITLE is required.');
  if (type !== 'content-update' && type !== 'app-update') {
    throw new Error(`FCM_TYPE must be 'content-update' or 'app-update' (got '${type}').`);
  }

  let sa;
  try {
    sa = JSON.parse(raw);
  } catch {
    throw new Error('FIREBASE_SERVICE_ACCOUNT is not valid JSON.');
  }
  if (!sa.client_email || !sa.private_key || !sa.project_id) {
    throw new Error('Service account JSON is missing client_email / private_key / project_id.');
  }

  const accessToken = await getAccessToken(sa);

  // FCM v1 requires all `data` values to be strings.
  const data = { type };
  if (version) data.version = version;

  const message = {
    message: {
      topic: TOPIC,
      notification: { title, body },
      data,
      android: {
        priority: 'high',
        notification: { channel_id: ANDROID_CHANNEL_ID },
      },
    },
  };

  const fcmUrl = `https://fcm.googleapis.com/v1/projects/${sa.project_id}/messages:send`;
  const res = await httpsPost(
    fcmUrl,
    { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    message,
  );
  if (res.status !== 200) {
    throw new Error(`FCM send failed (HTTP ${res.status}): ${res.body}`);
  }
  const name = JSON.parse(res.body).name || '(no name returned)';
  console.log(`Push sent to topic "${TOPIC}" [type=${type}${version ? `, version=${version}` : ''}]`);
  console.log(`FCM message: ${name}`);
}

main().catch((err) => {
  console.error(`send-push failed: ${err.message}`);
  process.exit(1);
});
