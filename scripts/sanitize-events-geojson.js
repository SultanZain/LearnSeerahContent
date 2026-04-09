import fs from 'fs/promises';

// File paths
const INPUT_FILE = './content/maps/en/areas.geojson';
const OUTPUT_FILE = './Output/example.geojson';

// CLI flags
const args = process.argv.slice(2);
const skeletonMode = args.includes('--skeleton') || args.includes('-s');

// Skeleton placeholders
const PLACEHOLDERS = {
  title: 'INSERT TRANSLATED TITLE',
  location: 'INSERT TRANSLATED LOCATION',
  date: 'INSERT TRANSLATED DATE',
  age: 'INSERT TRANSLATED AGE',
};

const sanitizeEvents = (events) => {
  if (!Array.isArray(events)) return [];

  return events.map((event) => ({
    // Preserve only these two fields as-is
    year: event.year,
    eventId: event.eventId,

    // Replace translatable fields with placeholders
    title: PLACEHOLDERS.title,
    location: PLACEHOLDERS.location,
    date: PLACEHOLDERS.date,
    age: PLACEHOLDERS.age,
  }));
};

const main = async () => {
  try {
    const raw = await fs.readFile(INPUT_FILE, 'utf8');
    const geojson = JSON.parse(raw);

    if (
      geojson.type !== 'FeatureCollection' ||
      !Array.isArray(geojson.features)
    ) {
      throw new Error('Invalid GeoJSON structure');
    }

    geojson.features = geojson.features.map((feature) => {
      if (!feature || !feature.properties) return feature;

      const originalEvents = feature.properties.events;

      return {
        ...feature,
        properties: {
          ...feature.properties,
          events: skeletonMode
            ? sanitizeEvents(originalEvents) // skeleton mode
            : [], // default mode
        },
      };
    });

    await fs.writeFile(
      OUTPUT_FILE,
      JSON.stringify(geojson, null, 2),
      'utf8'
    );

    console.log(
      `✅ ${OUTPUT_FILE} created | mode: ${
        skeletonMode ? 'SKELETON' : 'EMPTY'
      }`
    );
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
};

main();