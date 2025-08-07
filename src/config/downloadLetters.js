import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';

// Configurable constants
const LETTERS_BASE_URL = 'https://www.berkshirehathaway.com/letters';
const PDF_DIR = path.join(process.cwd(), 'data', 'letters', 'raw');
const YEARS_TO_DOWNLOAD = Array.from({ length: 2024 - 1977 + 1 }, (_, i) => 1977 + i);

// Ensure download directory exists
async function ensureDirectoryExists(dirPath) {
    try {
        await fs.access(dirPath);
    } catch {
        await fs.mkdir(dirPath, { recursive: true });
    }
}

// Download a single letter
async function downloadLetter(year) {
    const filename = `${year}ltr.pdf`;
    const url = `${LETTERS_BASE_URL}/${filename}`;
    const outputPath = path.join(PDF_DIR, filename);

    try {
        const response = await axios({
            method: 'get',
            url,
            responseType: 'stream',
            timeout: 10000 // 10 second timeout
        });

        const writer = createWriteStream(outputPath);
        await pipeline(response.data, writer);
        
        console.log(`Successfully downloaded: ${filename}`);
        return true;
    } catch (error) {
        if (error.response?.status === 404) {
            console.log(`Letter not available for year ${year}`);
        } else {
            console.error(`Failed to download ${filename}:`, error.message);
        }
        return false;
    }
}

// Main download function
export async function downloadLetters() {
    await ensureDirectoryExists(PDF_DIR);
    
    const results = await Promise.allSettled(
        YEARS_TO_DOWNLOAD.map(year => downloadLetter(year))
    );

    const successfulDownloads = results.filter(r => r.status === 'fulfilled' && r.value).length;
    console.log(`Download complete. ${successfulDownloads}/${YEARS_TO_DOWNLOAD.length} letters downloaded successfully.`);
    
    return successfulDownloads;
}

// Run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
    downloadLetters().catch(console.error);
}