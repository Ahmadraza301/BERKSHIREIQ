import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { ragWorkflow } from './workflows/rag-workflow';
import { ragAgent } from './agents/rag-agent';
import { getValidatedConfig } from '../config/api.js';

console.log(process.env.OPENAI_API_KEY);
// Validate configuration
const config = getValidatedConfig();
console.log('✅ Configuration validated successfully');

export const mastra = new Mastra({
  workflows: { ragWorkflow },
  agents: { ragAgent },
  storage: new LibSQLStore({
    url: ':memory:',
  }),
  logger: new PinoLogger({
    name: 'Mastra',
    level: config.logging.level as 'info' | 'debug' | 'warn' | 'error',
  }),
});
