#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const envPath = path.join(projectRoot, '.env');

async function updateApiKey() {
  console.log('🔑 API Key Update Helper\n');
  
  try {
    // Read current .env file
    let envContent = '';
    try {
      envContent = await fs.readFile(envPath, 'utf-8');
      console.log('✅ Found existing .env file');
    } catch {
      console.log('⚠️  No .env file found, will create one');
    }
    
    console.log('\n📝 Current .env content:');
    console.log('─'.repeat(50));
    console.log(envContent || '(empty file)');
    console.log('─'.repeat(50));
    
    console.log('\n🔧 To update your API key:');
    console.log('   1. Open the .env file in your editor');
    console.log('   2. Find the line: OPENAI_API_KEY=your_openai_api_key_here');
    console.log('   3. Replace "your_openai_api_key_here" with your new API key');
    console.log('   4. Save the file');
    console.log('\n📋 Example:');
    console.log('   OPENAI_API_KEY=sk-1234567890abcdef...');
    console.log('\n⚠️  Important:');
    console.log('   - Make sure your API key starts with "sk-" (not "sk-proj-")');
    console.log('   - Don\'t include quotes around the API key');
    console.log('   - Don\'t add spaces around the = sign');
    
    console.log('\n🎯 After updating, run: npm run test-openai');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

updateApiKey();
