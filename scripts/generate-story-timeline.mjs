// ---------------------------------------------------------- //
//            Extract timelines as single json file           //
// -------------------------------------------------------- --//
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

// Default language set to Arabic ('ar')
let language = 'ar'; 

// Parse command line arguments for language (-l flag)
const args = process.argv.slice(2);
const langFlagIndex = args.indexOf('-l');
if (langFlagIndex !== -1 && args[langFlagIndex + 1]) {
  language = args[langFlagIndex + 1]; // Set language if provided
}

const TIMELINE_DIR = `./content/timeline/${language}/`;  // Dynamic language directory
const OUTPUT_FILE = `./Output/storymap-${language}-events.json`;

const getEventData = async () => {
  const files = await fs.readdir(TIMELINE_DIR);
  const events = [];

  for (const file of files) {
    if (!file.endsWith('.mdx')) continue;

    const match = file.match(/^(\d+)-event-(\d+)\.mdx$/);
    if (!match) continue;

    const [_, yearStr, idStr] = match;
    const year = parseInt(yearStr, 10);
    const eventId = parseInt(idStr, 10);

    const filePath = path.join(TIMELINE_DIR, file);
    const fileContents = await fs.readFile(filePath, 'utf8');
    const { data: frontmatter, content: details } = matter(fileContents);

    const { title, location, date, age } = frontmatter;

    if (!title || !location || !date || age == null) {
      console.warn(`Missing frontmatter fields in: ${file}`);
      continue;
    }

    events.push({
      title,
      location,
      date,
      age: String(age),
      year,
      eventId,
      details: details.trim(),
    });
  }

  return events;
};

const main = async () => {
  let events = await getEventData();

  // Sort the events numerically by year and then by eventId
  events.sort((a, b) => {
    if (a.year !== b.year) {
      return a.year - b.year; // Sort by year first
    }
    return a.eventId - b.eventId; // Then sort by eventId
  });

  // Write the sorted events to the output file
  await fs.writeFile(OUTPUT_FILE, JSON.stringify({ events }, null, 2), 'utf8');
  console.log(`✅ ${OUTPUT_FILE} created with ${events.length} events.`);
};

main().catch(console.error);
