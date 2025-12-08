import { GoogleGenAI, Chat } from "@google/genai";
import { PORTFOLIO_DATA_EN } from "../constants";
import { PortfolioData } from "../types";

// Initialize the client
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

let currentData: PortfolioData = PORTFOLIO_DATA_EN;
let currentLang: string = 'en';
let chatSession: Chat | null = null;

const generateSystemInstruction = (data: PortfolioData, lang: string) => `
You are an AI assistant for a portfolio website belonging to ${data.name}.
Your goal is to answer questions from visitors about ${data.name}'s skills, experience, and projects.
The user is currently browsing the site in ${lang === 'pt' ? 'Portuguese' : 'English'}.
Please answer in ${lang === 'pt' ? 'Portuguese' : 'English'}.

Here is the data you have access to:
${JSON.stringify(data, null, 2)}

Rules:
1. Be polite, professional, and concise.
2. Only answer questions related to the portfolio owner. If asked about general topics (like "Why is the sky blue?"), politely steer the conversation back to the portfolio owner's qualifications.
3. If you don't know an answer based on the provided data, admit it and suggest they contact the owner via email.
4. Keep responses relatively short (under 100 words) unless asked for details.
`;

// Function to update the AI's context when data changes
export const resetSession = (newData?: PortfolioData, lang: string = 'en') => {
  if (newData) {
    currentData = newData;
  }
  currentLang = lang;
  chatSession = null; // Force recreation of session next time it's requested
};

export const getChatSession = (): Chat => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: generateSystemInstruction(currentData, currentLang),
        thinkingConfig: { thinkingBudget: 0 }, // low latency
      },
    });
  }
  return chatSession;
};

export const sendMessageStream = async function* (message: string) {
  if (!apiKey) {
    yield "Error: API Key not found. Please configure process.env.API_KEY.";
    return;
  }

  try {
    const chat = getChatSession();
    const result = await chat.sendMessageStream({ message });

    for await (const chunk of result) {
      const text = chunk.text;
      if (text) {
        yield text;
      }
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    chatSession = null; // Reset session on error
    yield "I'm currently having trouble connecting to the AI service. Please try again later.";
  }
};