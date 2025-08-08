import { testConnection } from '../src/config/vectorStore.js';

(async () => {
  const isConnected = await testConnection();
  process.exit(isConnected ? 0 : 1);  // Exit code 0 = success
})();