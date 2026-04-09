# Scripts & Data Generation

The `scripts/` directory contains tools to extract timeline events from `.mdx` files into specific data formats used by the LearnSeerah web app maps and chronicles.

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
  - *Single year extraction:* `-r 5`
  - *Year range:* `-r 571-610`
  - *Lower bound (year 610 onwards):* `-r 610-`
  - *Lower bound from a specific event index (after year 622 event 11):* `-r 622-event-11-`
  - *Upper bound (up to year 610):* `-r -610`
  - *Exact event index range:* `-r 571-event-1-610-event-11`

## Running via pnpm

You can execute the extraction scripts securely and easily without using raw node commands by using the configured `pnpm` shortcut commands:

```bash
# Extract Arabic events from year 571 to year 610 for the interactive maps
pnpm generate-areas-geojson-data -l ar -r 571-610

# Extract English events from year 571 to year 610 for the chronicle CSV
pnpm generate-chronicle -l en -r 571-610

# Extract Urdu events from year 622-event-11 to last event for the storymap
pnpm generate-storymap-events-data -l ur -r 622-event-11-
```
