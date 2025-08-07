import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';
// TODO: Implement embedding and vector DB ingestion

const PDF_DIR = './data/letters';
const CHUNK_SIZE = 500;
const CHUNK_OVERLAP = 50;

function extractYearFromFilename(filename) {
  const match = filename.match(/(20\d{2})/);
  return match ? match[1] : 'unknown';
}

async function chunkText(text, chunkSize, overlap) {
  const words = text.split(' ');
  const chunks = [];
  for (let i = 0; i < words.length; i += chunkSize - overlap) {
    const chunk = words.slice(i, i + chunkSize).join(' ');
    if (chunk.length > 0) chunks.push(chunk);
  }
  return chunks;
}

async function ingest() {
  // TODO: Implement embedding and vector DB ingestion
  console.log('Ingestion placeholder.');
}

ingest();
