const fs = require('fs');
const path = require('path');

// Configuration
const ROOT_DIR = 'content'; // Root directory is 'content'
const OUTPUT_FILE = 'paths.json';
const CONTENT_TYPES = ['seerah', 'quiz', 'glossary', 'references', 'timeline'];
const SUPPORTED_LOCALES = ['en', 'ar', 'ur']; // Define your supported languages

function getSlugFromFile(file) {
  return path.basename(file, '.mdx');
}

function readMdxFilesFromDir(dirPath) {
  if (!fs.existsSync(dirPath)) return [];
  return fs.readdirSync(dirPath)
    .filter(file => file.endsWith('.mdx'))
    .map(getSlugFromFile);
}

function generatePaths() {
  // Ensure the content directory exists
  if (!fs.existsSync(ROOT_DIR)) {
    console.error(`Error: Root directory "${ROOT_DIR}" does not exist.`);
    return;
  }

  const result = {};

  // Initialize result object with empty structures for each locale
  for (const locale of SUPPORTED_LOCALES) {
    result[locale] = {};
    for (const type of CONTENT_TYPES) {
      result[locale][type] = type === 'timeline' ? {} : [];
    }
  }

  // Get all content types that actually exist in the content folder
  const existingContentTypes = fs.readdirSync(ROOT_DIR)
    .filter(dir => 
      fs.statSync(path.join(ROOT_DIR, dir)).isDirectory() && 
      CONTENT_TYPES.includes(dir)
    );

  // Now iterate through content types and locales to build the structure
  for (const type of existingContentTypes) {
    const typePath = path.join(ROOT_DIR, type);
    
    // Get all locale folders that exist in this content type
    const existingLocales = fs.readdirSync(typePath)
      .filter(dir => 
        fs.statSync(path.join(typePath, dir)).isDirectory() && 
        SUPPORTED_LOCALES.includes(dir)
      );
    
    for (const locale of existingLocales) {
      const localePath = path.join(typePath, locale);
      
      if (type === 'timeline') {
        // For timeline, parse the year from the filename
        const mdxFiles = fs.readdirSync(localePath)
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
            
            // Sort after all slugs are collected
            for (const y in filesByYear) {
              filesByYear[y].sort((a, b) => {
                const aNum = parseInt(a.split('-event-')[1], 10);
                const bNum = parseInt(b.split('-event-')[1], 10);
                return aNum - bNum;
              });
            }

          }
        }
        
        // Store the grouped files
        result[locale].timeline = filesByYear;
      } else {
        // For other content types, read MDX files directly
        const slugs = readMdxFilesFromDir(localePath);
        if (slugs.length > 0) {
          result[locale][type] = slugs;
        }
      }
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2));
  console.log(`✅ Generated ${OUTPUT_FILE}`);
}

generatePaths();