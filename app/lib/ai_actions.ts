"use server";

import { getTransactionsJSON } from "./data";
import { TransactionFormat } from "./definitions";

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export async function run(): Promise<string> {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
//   console.log(process.env.API_KEY);

  // Get transactions from the database

  const transactions:TransactionFormat[] = await getTransactionsJSON();

  const prompt = "here is a list of my transactions: " + JSON.stringify(transactions) + " what is my summary?";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}
