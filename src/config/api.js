import 'dotenv/config';
console.log(process.env.OPENAI_API_KEY);
// API Configuration
export const apiConfig = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    // Add other OpenAI-specific config here if needed
  },
  database: {
    url: process.env.DATABASE_URL || 'postgresql://postgres:421302@localhost:5432/421302',
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  }
};

// Validation function
export function validateConfig() {
  const errors = [];
  
  if (!apiConfig.openai.apiKey) {
    errors.push('OPENAI_API_KEY is required');
  } else if (!apiConfig.openai.apiKey.startsWith('sk-')) {
    errors.push('OPENAI_API_KEY should start with "sk-"');
  }
  
  if (errors.length > 0) {
    console.error('❌ Configuration errors:');
    errors.forEach(error => console.error(`   - ${error}`));
    console.error('\nPlease check your .env file and ensure all required variables are set.');
    return false;
  }
  
  return true;
}

// Export validated config
export function getValidatedConfig() {
  if (!validateConfig()) {
    process.exit(1);
  }
  return apiConfig;
}
