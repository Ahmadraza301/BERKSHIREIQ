import { readdir, readFile } from 'fs/promises';
import path from 'path';
import { PDFParser } from '@mastra/core';
import { vectorStore } from '../src/config/vectorStore.js';

// Configurable constants
const PDF_DIR = path.join(process.cwd(), 'data', 'letters', 'raw');
const CHUNK_SIZE = 1200;  // Optimal for financial document context
const CHUNK_OVERLAP = 300;
const INSERT_BATCH_SIZE = 50;

// Enhanced year extraction for 1977-2024 range
function extractYearFromFilename(filename) {
  const match = filename.match(/(19[7-9]\d|20[0-2]\d)/);
  return match ? parseInt(match[0]) : null;
}

// Classify documents into historical periods
function getHistoricalPeriod(year) {
  if (!year) return 'Unknown';
  if (year < 1985) return 'Early Buffett Era (1965-1984)';
  if (year < 2000) return 'Capital Allocation Era (1985-1999)';
  if (year < 2010) return 'Mature Berkshire Era (2000-2009)';
  return 'Modern Berkshire Era (2010-Present)';
}

// Improved chunking preserving financial document structure
async function chunkDocument(text, metadata) {
  const sections = text.split('\n\n');
  const chunks = [];
  let currentChunk = [];
  let currentLength = 0;

  for (const section of sections) {
    if (currentLength + section.length <= CHUNK_SIZE) {
      currentChunk.push(section);
      currentLength += section.length;
    } else {
      if (currentChunk.length > 0) {
        chunks.push({
          content: currentChunk.join('\n\n'),
          metadata: {
            ...metadata,
            chunkNumber: chunks.length + 1
          }
        });
        
        // Maintain overlap by keeping last N sections
        const overlapSections = Math.max(1, Math.floor(CHUNK_OVERLAP / 100));
        currentChunk = currentChunk.slice(-overlapSections);
        currentLength = currentChunk.join('\n\n').length;
        currentChunk.push(section);
        currentLength += section.length;
      }
    }
  }

  if (currentChunk.length > 0) {
    chunks.push({
      content: currentChunk.join('\n\n'),
      metadata: {
        ...metadata,
        chunkNumber: chunks.length + 1
      }
    });
  }

  return chunks;
}

async function processPdfFile(filePath) {
  try {
    const parser = new PDFParser({
      textStrategy: 'hybrid',
      preservePageNumbers: true
    });

    const buffer = await readFile(filePath);
    const { content, metadata } = await parser.parseBuffer(buffer);
    
    const year = extractYearFromFilename(path.basename(filePath));
    const period = getHistoricalPeriod(year);

    return {
      content,
      metadata: {
        ...metadata,
        year,
        period,
        source: 'berkshire-letter',
        document: path.basename(filePath)
      }
    };
  } catch (error) {
    console.error(`Error processing ${path.basename(filePath)}:`, error.message);
    return null;
  }
}

async function ingestDocuments() {
  try {
    console.log('[1/4] Scanning PDF directory...');
    const files = (await readdir(PDF_DIR)).filter(f => 
      f.toLowerCase().endsWith('.pdf')
    );

    if (files.length === 0) {
      throw new Error(`No PDF files found in ${PDF_DIR}`);
    }
    console.log(`Found ${files.length} Berkshire letters`);

    console.log('[2/4] Processing PDF files...');
    const processingResults = await Promise.all(
      files.map(file => 
        processPdfFile(path.join(PDF_DIR, file))
      )
    );

    const validDocuments = processingResults.filter(Boolean);
    console.log(`Successfully processed ${validDocuments.length}/${files.length} files`);

    console.log('[3/4] Chunking documents...');
    const chunkingResults = await Promise.all(
      validDocuments.map(doc => chunkDocument(doc.content, doc.metadata))
    );
    const allChunks = chunkingResults.flat();
    console.log(`Created ${allChunks.length} chunks`);

    console.log('[4/4] Storing in vector database...');
    for (let i = 0; i < allChunks.length; i += INSERT_BATCH_SIZE) {
      const batch = allChunks.slice(i, i + INSERT_BATCH_SIZE);
      await vectorStore.addDocuments(batch);
      console.log(`  → Batch ${Math.ceil(i/INSERT_BATCH_SIZE) + 1}: ${Math.min(i + INSERT_BATCH_SIZE, allChunks.length)}/${allChunks.length}`);
    }

    console.log('✅ Ingestion completed successfully!');
    console.log('Summary:');
    console.log(`- Processed ${validDocuments.length} letters`);
    console.log(`- Created ${allChunks.length} chunks`);
    console.log(`- Earliest year: ${Math.min(...validDocuments.map(d => d.metadata.year))}`);
    console.log(`- Latest year: ${Math.max(...validDocuments.map(d => d.metadata.year))}`);

  } catch (error) {
    console.error('❌ Ingestion failed:', error);
    process.exit(1);
  }
}

// Execute with performance monitoring
(async () => {
  const startTime = performance.now();
  await ingestDocuments();
  const endTime = performance.now();
  console.log(`⏱️  Total time: ${((endTime - startTime)/1000).toFixed(2)} seconds`);
})();