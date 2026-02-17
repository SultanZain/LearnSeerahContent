const fs = require('fs');
const path = require('path');

// Configuration
// Root directory is 'content'. 
// If running from the root of LearnSeerahApp and 'content' is a sibling or submodule, adjust accordingly.
// For the LearnSeerahContent repo, 'content' is likely at the root.
const ROOT_DIR = 'content';
const OUTPUT_DIR = 'paths';
const CONTENT_TYPES = ['seerah', 'quiz', 'glossary', 'references', 'timeline'];
const SUPPORTED_LOCALES = ['en', 'ar', 'ur', 'bn']; // Define your supported languages

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
            seerah: [],
            quiz: [],
            glossary: [],
            references: [],
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

generatePaths();