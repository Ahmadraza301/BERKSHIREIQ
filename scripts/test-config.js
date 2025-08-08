#!/usr/bin/env node

import { validateConfig, getValidatedConfig } from '../src/config/api.js';

console.log('🧪 Testing API key configuration...\n');

try {
  // Test validation
  if (validateConfig()) {
    console.log('✅ Configuration validation passed');
    
    // Test getting validated config
    const config = getValidatedConfig();
    console.log('✅ Configuration loaded successfully');
    
    // Show config summary (without exposing sensitive data)
    console.log('\n📋 Configuration Summary:');
    console.log(`- OpenAI API Key: ${config.openai.apiKey ? '✅ Set' : '❌ Missing'}`);
    console.log(`- Database URL: ${config.database.url ? '✅ Set' : '❌ Missing'}`);
    console.log(`- Log Level: ${config.logging.level}`);
    
    console.log('\n🎉 All tests passed! Your API key configuration is working correctly.');
  } else {
    console.log('❌ Configuration validation failed');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Test failed:', error.message);
  process.exit(1);
}
