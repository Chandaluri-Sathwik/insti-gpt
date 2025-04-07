import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const getBotResponse = async (message, chatHistory = []) => {
  try {
    const chat = model.startChat({
      history: chatHistory,
      generationConfig: { maxOutputTokens: 1000 }
    });
    
    const result = await chat.sendMessage(message);
    return await result.response.text();
  } catch (error) {
    console.error("Gemini API error:", error);
    return "I'm experiencing technical difficulties. Please try again later.";
  }
};
