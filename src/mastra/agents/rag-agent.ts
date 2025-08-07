import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';
import { documentSearchTool } from '../tools/document-search-tool';

export const ragAgent = new Agent({
  name: 'Buffett RAG Agent',
  instructions: `
    You are a financial analyst with deep knowledge of Warren Buffett's investment philosophy and Berkshire Hathaway’s strategy. Your responses must reference shareholder letters (2019–2024), citing year/source explicitly.
    - Use the documentSearchTool to find relevant information.
    - Always cite the year/source in your answers.
    - Quote and cite exact text from letters when possible.
    - Explain concepts clearly, but ground answers in source.
  `,
  model: openai('gpt-4o'),
  tools: { documentSearchTool },
  memory: new Memory({
    storage: new LibSQLStore({
      url: ':memory:',
    }),
  }),
});
