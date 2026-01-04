// ---------------------------------------------------------- //
//            Extract timelines as single json file           //
//            AND Generate TimelineJS CSV                     //
// -------------------------------------------------------- --//
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

// Import unified, remark, and rehype plugins
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

// Default language set to Urdu ('ur')
let language = 'ur'; 

// Parse command line arguments for language (-l flag)
const args = process.argv.slice(2);
const langFlagIndex = args.indexOf('-l');
if (langFlagIndex !== -1 && args[langFlagIndex + 1]) {
  language = args[langFlagIndex + 1]; // Set language if provided
}

const TIMELINE_DIR = `./content/timeline/${language}/`;  // Dynamic language directory
const OUTPUT_CSV_FILE = `./Output/timelinejs-${language}-events.csv`; // CSV output file

/**
 * Escapes a string for CSV output by enclosing it in double quotes
 * and doubling any internal double quotes.
 * @param {string} field The string to escape.
 * @returns {string} The escaped string.
 */
const escapeCsvField = (field) => {
  if (field === null || field === undefined) {
    return '';
  }
  const stringField = String(field);
  // Check if the field contains a comma, double quote, or newline
  if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
    // Escape internal double quotes by doubling them
    const escapedField = stringField.replace(/"/g, '""');
    // Enclose the entire field in double quotes
    return `"${escapedField}"`;
  }
  return stringField;
};

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
    const { data: frontmatter, content: detailsMarkdown } = matter(fileContents);

    const { title, location, date, age } = frontmatter;

    if (!title || !location || !date || age == null) {
      console.warn(`Missing frontmatter fields in: ${file}`);
      continue;
    }

    // Convert Markdown content to HTML
    let detailsHtml = '';
    try {
      const processed = await unified()
        .use(remarkParse)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeStringify, { allowDangerousHtml: true })
        .process(detailsMarkdown.trim());
      detailsHtml = String(processed);

      // Post-process to replace className with class
      detailsHtml = detailsHtml.replace(/\bclassName\b/g, 'class');
    } catch (error) {
      console.error(`Error processing Markdown in ${file}:`, error);
      // Fallback: store raw markdown or an error message if conversion fails
      detailsHtml = `<p style="color: red;">Error processing markdown for ${file}.</p><pre>${escapeCsvField(detailsMarkdown.trim())}</pre>`;
    }

    // Handling dynamic language age description
    let ageText = '';
    if (language === 'ur') {
      ageText = 'رسول ﷺ کی عمر مبارک : ' + String(age); // ur
    } else if (language === 'en') {
      ageText = 'Age of Hazrat Muhammad S.A.W : ' + String(age); // en
    } else if (language === 'ar') {
      ageText = 'عمر النبي ﷺ المباركة : ' + String(age); // ar
    }

    events.push({
      title,
      location,
      date,
      age: ageText,
      year,
      eventId,
      details: detailsHtml,
    });
  }

  return events;
};

/**
 * Generates CSV content for TimelineJS from an array of event objects.
 * @param {Array<Object>} events The array of event objects.
 * @returns {string} The CSV content.
 */
const generateTimelineJsCsv = (events) => {
  const headers = [
    "Year", "Month", "Day",
    // "Time", "End Year", "End Month", "End Day", "End Time",
    "Display Date", "Age", "Location", "Headline", "Text", "Media", "Media Credit", "Media Caption",
    "Media Thumbnail", "Alt Text", "Type", "Group", "Background"
  ];

  const csvRows = [headers.map(escapeCsvField).join(',')]; // Add header row

  for (const event of events) {
    const row = [
      escapeCsvField(event.year),       // Year
      '',                               // Month (empty)
      '',                               // Day (empty)
      // '',                               // Time (empty)
      // '',                               // End Year (empty)
      // '',                               // End Month (empty)
      // '',                               // End Day (empty)
      // '',                               // End Time (empty)
      escapeCsvField(event.date),       // Display Date
      escapeCsvField(event.age),        // Age
      escapeCsvField(event.location),   // Location
      escapeCsvField(event.title),      // Headline
      escapeCsvField(event.details),    // Text (HTML content)
      '',                               // Media (empty)
      '',                               // Media Credit (empty)
      '',                               // Media Caption (empty)
      '',                               // Media Thumbnail (empty)
      '',                               // Alt Text (empty)
      '',                               // Type (empty)
      '',                               // Group (empty)
      ''                                // Background (empty)
    ];
    csvRows.push(row.join(','));
  }

  return csvRows.join('\n');
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

  // 1. Generate and write the CSV file
  const csvContent = generateTimelineJsCsv(events);
  await fs.writeFile(OUTPUT_CSV_FILE, csvContent, 'utf8');
  console.log(`✅ ${OUTPUT_CSV_FILE} created with ${events.length} events.`);
};

main().catch(console.error);