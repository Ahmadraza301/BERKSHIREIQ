
import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { ragWorkflow } from './workflows/rag-workflow';
import { ragAgent } from './agents/rag-agent';

export const mastra = new Mastra({
  workflows: { ragWorkflow },
  agents: { ragAgent },
  storage: new LibSQLStore({
    url: ':memory:',
  }),
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
