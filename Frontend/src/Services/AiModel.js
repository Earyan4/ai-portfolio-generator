import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "../config/config";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// ✅ Use model from .env
const modelName = import.meta.env.VITE_GEMINI_MODEL || "models/gemini-2.5-flash";

const model = genAI.getGenerativeModel({ model: modelName });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const AIChatSession = model.startChat({
  generationConfig,
  history: [],
});
