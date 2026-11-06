# Scripts & Data Generation

The `scripts/` directory contains tools to extract timeline events from `.mdx` files into specific data formats used by the LearnSeerah web app maps and chronicles.

**For translators:** translate `content/timeline/{locale}/*.mdx` using the
[translator guide](translations.md). Map event text and Chronicle are derived
from that source; there is no separate manual GeoJSON or CSV translation task.
The tools below are for the maintainer generation and integration step.

## Generation and integration

The scripts read the chosen locale's timeline files and convert them into JSON
or CSV. They do **not** write complete map GeoJSON files, upload to Google Sheets,
or update `content/chronicle.json`. Maintainers integrate generated event data
with map geometry and publish the Chronicle sheet. When timeline translations
change, the affected generated views need refreshing as well.

For a new locale, maintainers also register it in the path generator and
application configuration. The Chronicle generator currently has age-label text
for `en`, `ar`, `ur`, and `bn`; adding another locale may require that label too.
Report the locale and changed timeline range in the translation PR so these
steps can be coordinated.

## Available Scripts

### 1. `generate_areas_geojson_data.mjs`
Extracts timeline events and generates a JSON file. This data is manually placed inside `areas.geojson` in the `content/maps` folder to power the "Interactive Map" and "Seerah Highlights" map.

- **Output:** `Output/geojson-<lang>-events.json`

### 2. `generate_chronicle.mjs`
Extracts events and generates a CSV file specifically formatted for Chronicle (previously Timeline-V2). This CSV is then manually imported into a Google Sheet specified in the `content/chronicle.json` file acting as the data source for the LearnSeerah Chronicle feature.

- **Output:** `Output/chronicle-<lang>-events.csv`

### 3. `generate_storymap_events_data.mjs`
Extracts events data as JSON, which is then manually placed inside `storymap.geojson` files. Our backend uses this to generate the "Seerah Events Map" using a slider map.

- **Output:** `Output/storymap-<lang>-events.json`

## Global Flags

All three scripts support the following command-line flags to filter data dynamically:

- **`-l <language>`**: Specify the language to extract data from (e.g., `en`, `ur`, `ar`). Defaults to `ar`.
- **`-r <range>`**: Specify a year range, single year, or specific event to extract. This makes updates easier by querying only newly added events. You can use `{year}` or `{year}-event-{index}`.
  - *Single CE year extraction:* `-r 571`
  - *Year range:* `-r 571-610`
  - *Lower bound (year 610 onwards):* `-r 610-`
  - *Lower bound from a specific event index (including year 622 event 11):* `-r 622-event-11-`
  - *Upper bound (up to year 610):* `-r -610`
  - *Exact event index range:* `-r 571-event-1-610-event-11`

## Running via pnpm

Run from the repository root with Node.js and pnpm installed. Install dependencies
with `pnpm install`. The scripts write to `./Output/` and do not create that
directory themselves. Create it once before running them:

```powershell
New-Item -ItemType Directory -Force -Path Output
```

On macOS/Linux, use `mkdir -p Output`. The uppercase `Output` spelling matches
the scripts; on Windows an existing `output/` directory resolves to the same
location. These files are temporary exports, not translator deliverables. On a
case-sensitive filesystem, the existing `/output/` ignore rule does not cover
`Output/`, so review `git status` and avoid staging exports.

Use the package commands with an explicit locale (otherwise they default to `ar`):

```bash
# Extract Arabic events from year 571 to year 610 for the interactive maps
pnpm generate-areas-geojson-data -l ar -r 571-610

# Extract English events from year 571 to year 610 for the chronicle CSV
pnpm generate-chronicle -l en -r 571-610

# Extract Urdu events from year 622-event-11 to last event for the storymap
pnpm generate-storymap-events-data -l ur -r 622-event-11-
```

Review the generated output and terminal warnings before integration. JSON
exports contain event records, not map geometry; do not replace a complete
`.geojson` file with an export. For Chronicle, import the generated CSV into the
correct locale's sheet while keeping its schema intact. Event wording corrections
belong in timeline MDX so regeneration keeps the views consistent.

## Generated locale indexes

The Generate Locale Paths workflow uses `.github/workflows/generate-paths.js` to
write `paths/{locale}.json` and `paths/manifest.json`. It runs on relevant pushes
to configured branches, including `dev`; it is separate from the map and Chronicle
extraction commands above. Translators do not manually translate indexes or
manifest hashes. New locale support must be added to `SUPPORTED_LOCALES` by
maintainers before the workflow includes that language.
