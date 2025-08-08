#!/usr/bin/env node

import 'dotenv/config';

async function debugOpenAI() {
  console.log('🔍 Debugging OpenAI API key...\n');
  
  // Check if API key exists
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('❌ No API key found in .env file');
    return;
  }
  
  console.log(`📝 API Key format check:`);
  console.log(`   - Length: ${apiKey.length} characters`);
  console.log(`   - Starts with "sk-": ${apiKey.startsWith('sk-')}`);
  console.log(`   - First 10 chars: ${apiKey.substring(0, 10)}...`);
  
  try {
    console.log('\n🧪 Testing API call...');
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: 'Hello'
          }
        ],
        max_tokens: 10
      })
    });
    
    console.log(`📊 Response status: ${response.status}`);
    console.log(`📊 Response headers:`, Object.fromEntries(response.headers.entries()));
    
    const responseText = await response.text();
    console.log(`📊 Response body:`, responseText);
    
    if (!response.ok) {
      const errorData = JSON.parse(responseText);
      console.error('\n❌ API Error Details:');
      console.error(`   - Error Type: ${errorData.error?.type}`);
      console.error(`   - Error Code: ${errorData.error?.code}`);
      console.error(`   - Error Message: ${errorData.error?.message}`);
      console.error(`   - Error Param: ${errorData.error?.param}`);
    } else {
      console.log('\n✅ API call successful!');
    }
    
  } catch (error) {
    console.error('\n❌ Network Error:', error.message);
  }
}

debugOpenAI();
