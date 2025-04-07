import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const getBotResponse = async (message) => {
  try {
    const result = await model.generateContent(message);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    throw error;
  }
};
