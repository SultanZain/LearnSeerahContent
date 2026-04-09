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

// Parse command line arguments for year/event range (-r flag)
let startYear = -Infinity;
let startEvent = -Infinity;
let endYear = Infinity;
let endEvent = Infinity;

const rangeFlagIndex = args.indexOf('-r');
if (rangeFlagIndex !== -1 && args[rangeFlagIndex + 1]) {
  const rangeStrRaw = args[rangeFlagIndex + 1];
  // Replace '-event-' with 'E' to safely split by '-'
  const rangeStr = rangeStrRaw.replace(/-event-/g, 'E');
  
  const parseBound = (str, isStart) => {
    if (!str) return { year: isStart ? -Infinity : Infinity, eventId: isStart ? -Infinity : Infinity };
    const parts = str.split('E');
    return {
      year: parseInt(parts[0], 10),
      eventId: parts.length > 1 ? parseInt(parts[1], 10) : (isStart ? -Infinity : Infinity)
    };
  };

  if (rangeStr.includes('-')) {
    const parts = rangeStr.split('-');
    const startObj = parseBound(parts[0], true);
    const endObj = parseBound(parts[1], false);
    startYear = startObj.year;
    startEvent = startObj.eventId;
    endYear = endObj.year;
    endEvent = endObj.eventId;
  } else {
    // Single year or single event
    const obj = parseBound(rangeStr, true);
    startYear = obj.year;
    endYear = obj.year;
    if (obj.eventId !== -Infinity) {
       startEvent = obj.eventId;
       endEvent = obj.eventId;
    } else {
       startEvent = -Infinity;
       endEvent = Infinity;
    }
  }
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

    if (year < startYear || year > endYear) {
      continue;
    }
    if (year === startYear && eventId < startEvent) {
      continue;
    }
    if (year === endYear && eventId > endEvent) {
      continue;
    }

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
