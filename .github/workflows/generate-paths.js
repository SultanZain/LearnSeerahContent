const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Configuration
// Root directory is 'content'. 
// If running from the root of LearnSeerahApp and 'content' is a sibling or submodule, adjust accordingly.
// For the LearnSeerahContent repo, 'content' is likely at the root.
const ROOT_DIR = 'content';
const OUTPUT_DIR = 'paths';
const CONTENT_TYPES = ['lessons', 'quiz', 'glossary', 'references', 'sections', 'timeline'];
const SUPPORTED_LOCALES = ['en', 'ar', 'ur', 'bn']; // Define your supported languages

function getSlugFromFile(file) {
    return path.basename(file, '.mdx');
}

function readMdxFilesFromDir(dirPath) {
    if (!fs.existsSync(dirPath)) return [];
    return fs.readdirSync(dirPath)
        .filter(file => file.endsWith('.mdx'))
        .map(getSlugFromFile)
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
}

function generatePaths() {
    // Ensure the content directory exists
    if (!fs.existsSync(ROOT_DIR)) {
        console.error(`Error: Root directory "${ROOT_DIR}" does not exist.`);
        console.log(`Current working directory: ${process.cwd()}`);
        return;
    }

    // Ensure output directory 'paths' exists
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        console.log(`Created directory: ${OUTPUT_DIR}`);
    }

    // Iterate through locales to build individual JSON files
    for (const locale of SUPPORTED_LOCALES) {
        const localeData = {
            lessons: [],
            quiz: [],
            glossary: [],
            references: [],
            sections: [],
            timeline: {}
        };

        let hasContent = false;

        // Iterate through content types
        for (const type of CONTENT_TYPES) {
            const typePath = path.join(ROOT_DIR, type, locale);

            if (!fs.existsSync(typePath)) {
                continue;
            }

            if (type === 'timeline') {
                // For timeline, parse the year from the filename
                const mdxFiles = fs.readdirSync(typePath)
                    .filter(file => file.endsWith('.mdx'));

                // Group files by year (extracted from filename)
                const filesByYear = {};

                for (const file of mdxFiles) {
                    // Extract year from filename (format: YYYY-event-id.mdx)
                    const yearMatch = file.match(/^(\d+)-/);
                    if (yearMatch) {
                        const year = yearMatch[1];
                        const slug = getSlugFromFile(file);

                        if (!filesByYear[year]) {
                            filesByYear[year] = [];
                        }
                        filesByYear[year].push(slug);
                        hasContent = true;
                    }
                }

                // Sort files within each year by event ID if present
                for (const y in filesByYear) {
                    filesByYear[y].sort((a, b) => {
                        const getEventNum = (s) => {
                            const parts = s.split('-event-');
                            return parts.length > 1 ? parseInt(parts[1], 10) : 0;
                        };
                        const aNum = getEventNum(a);
                        const bNum = getEventNum(b);
                        if (aNum !== bNum) return aNum - bNum;
                        return a.localeCompare(b);
                    });
                }

                localeData.timeline = filesByYear;
            } else {
                // For other content types, read MDX files directly
                const slugs = readMdxFilesFromDir(typePath);
                if (slugs.length > 0) {
                    localeData[type] = slugs;
                    hasContent = true;
                }
            }
        }

        // Write the JSON file for this specific locale
        const outputFile = path.join(OUTPUT_DIR, `${locale}.json`);
        fs.writeFileSync(outputFile, JSON.stringify(localeData, null, 2));
        console.log(`✅ Generated ${outputFile}`);
    }
}

/**
 * Hash a file's content with SHA-256, returning the first 16 hex chars.
 * Short enough to be compact in the manifest, long enough to be collision-free.
 */
function hashFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    return crypto.createHash('sha256').update(content).digest('hex').slice(0, 16);
}

/**
 * Emit paths/manifest.json — a flat { path → hash } map over every content
 * file and every paths/*.json so the mobile app can do a byte-level diff and
 * only re-download what actually changed.
 *
 * @param {string|undefined} commitSha  GITHUB_SHA from CI, or undefined locally.
 */
function generateManifest(commitSha) {
    const files = {};

    const numericSort = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });

    // 1. All MDX content files across every locale and content type.
    for (const locale of SUPPORTED_LOCALES) {
        for (const type of CONTENT_TYPES) {
            const dir = path.join(ROOT_DIR, type, locale);
            if (!fs.existsSync(dir)) continue;

            const files_ = fs.readdirSync(dir).filter(f => f.endsWith('.mdx')).sort(numericSort);
            for (const file of files_) {
                const rel = `${ROOT_DIR}/${type}/${locale}/${file}`;
                files[rel] = hashFile(path.join(dir, file));
            }
        }
    }

    // 2. The paths/*.json index files themselves (a reorder or new lesson slug
    //    changes these even without touching any MDX file).
    for (const locale of SUPPORTED_LOCALES) {
        const p = path.join(OUTPUT_DIR, `${locale}.json`);
        if (fs.existsSync(p)) {
            files[`paths/${locale}.json`] = hashFile(p);
        }
    }

    const manifest = {
        commit: commitSha || 'local',
        generatedAt: new Date().toISOString(),
        files,
    };

    const outputFile = path.join(OUTPUT_DIR, 'manifest.json');
    fs.writeFileSync(outputFile, JSON.stringify(manifest, null, 2));
    console.log(`✅ Generated ${outputFile} (${Object.keys(files).length} entries)`);
}

generatePaths();
generateManifest(process.env.GITHUB_SHA);