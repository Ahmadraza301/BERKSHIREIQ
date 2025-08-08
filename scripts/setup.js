#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

async function setup() {
  console.log('🚀 Setting up BerkshireIQ...\n');

  try {
    // Check if .env file exists
    const envPath = path.join(projectRoot, '.env');
    const envExamplePath = path.join(projectRoot, 'env.example');
    
    let envExists = false;
    try {
      await fs.access(envPath);
      envExists = true;
      console.log('✅ .env file found');
    } catch {
      console.log('⚠️  .env file not found');
    }

    // If .env doesn't exist, create it from example
    if (!envExists) {
      try {
        const envExample = await fs.readFile(envExamplePath, 'utf-8');
        await fs.writeFile(envPath, envExample);
        console.log('✅ Created .env file from template');
        console.log('📝 Please edit .env file and add your OpenAI API key');
      } catch (error) {
        console.error('❌ Failed to create .env file:', error.message);
        console.log('📝 Please manually create a .env file with the following content:');
        console.log('OPENAI_API_KEY=your_openai_api_key_here');
        console.log('DATABASE_URL=postgresql://postgres:421302@localhost:5432/421302');
        console.log('LOG_LEVEL=info');
      }
    }

    // Validate configuration
    console.log('\n🔍 Validating configuration...');
    
    // Import and test the configuration
    const { validateConfig } = await import('../src/config/api.js');
    
    if (validateConfig()) {
      console.log('✅ Configuration is valid');
      console.log('🎉 Setup complete! You can now run the application.');
    } else {
      console.log('❌ Configuration validation failed');
      console.log('Please check your .env file and ensure all required variables are set.');
      process.exit(1);
    }

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

setup();
