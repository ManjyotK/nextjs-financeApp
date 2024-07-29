"use server";

import { getTransactionsJSON } from "./data";
import { TransactionFormat } from "./definitions";


const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export async function run(): Promise<string> {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  // Get transactions from the database

  const transactions:TransactionFormat[] = await getTransactionsJSON();

  const prompt = "Here is a list of my transactions: " + JSON.stringify(transactions) + 
  ". Do not give me a summary. Tell me how and where I can save money. Go into details on specific transactions. Keep it consise and only highlight 5 areas.";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}
