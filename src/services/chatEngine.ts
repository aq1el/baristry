import { findAnswer } from './faq';

export type ChatRole = 'user' | 'bot';
export type ChatHistoryItem = { role: ChatRole; text: string };

export const chatEngine = {
  async answer(question: string, history: ChatHistoryItem[]) {
    void history; 
    return findAnswer(question);
  }
};
