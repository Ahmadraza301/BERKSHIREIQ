#!/usr/bin/env node

import 'dotenv/config';

async function testOpenAI() {
  console.log('🧪 Testing OpenAI API key...\n');
  console.log(OPENAI_API_KEY);
  
  try {
    // Test with a simple fetch request to OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: 'Hello! Please respond with "API key is working correctly" if you can see this message.'
          }
        ],
        max_tokens: 50
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `HTTP ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ OpenAI API key is working correctly!');
    console.log('📝 Response:', data.choices[0]?.message?.content);
    console.log('\n🎉 Your API key is valid and ready to use.');
    
  } catch (error) {
    console.error('❌ OpenAI API test failed:');
    
    if (error.message.includes('Incorrect API key') || error.message.includes('invalid_api_key')) {
      console.error('   - Your API key is invalid or expired');
      console.error('   - Please get a new API key from: https://platform.openai.com/account/api-keys');
      console.error('   - Make sure it starts with "sk-" (not "sk-proj-")');
    } else if (error.message.includes('insufficient_quota')) {
      console.error('   - Your OpenAI account has insufficient credits');
      console.error('   - Please add credits to your account');
    } else {
      console.error('   - Error:', error.message);
    }
    
    console.log('\n📝 To fix this:');
    console.log('   1. Go to https://platform.openai.com/account/api-keys');
    console.log('   2. Create a new API key');
    console.log('   3. Update your .env file with the new key');
    console.log('   4. Run this test again');
    
    process.exit(1);
  }
}

testOpenAI();
