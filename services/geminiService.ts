
import { GoogleGenAI, GenerateContentResponse, Type, Chat } from "@google/genai";
import { GroundingSource } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const createExpeditionChat = (): Chat => {
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are the "Mission Intelligence Unit" for the Under Human Power expedition. 
      You are an expert on ultra-endurance cycling, gear maintenance, route navigation, and the specific 4,280km journey across the country.
      
      The expedition details are:
      - Stage 1: The Urban Exit (Completed) - Eastern Seaboard navigation.
      - Stage 2: The Great Plains (In Progress) - Mental test against winds and isolation.
      - Stage 3: The Ascent (Pending) - Crossing the Rockies.
      
      Your tone is tactical, precise, and supportive. Use metric units where appropriate. 
      If asked about gear, assume high-end bikepacking setups. 
      If asked about health, emphasize recovery and high-calorie intake. 
      Keep responses concise and formatted with markdown if listing items.`,
    },
  });
};

export const analyzeGear = async (base64Image: string, mimeType: string): Promise<string> => {
  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: mimeType,
            data: base64Image,
          },
        },
        {
          text: "You are an expert bike mechanic and ultra-endurance athlete. Analyze the cycling gear or bicycle shown in this image. Identify the key components, suggest potential maintenance issues for a 4000km trip, and recommend one optimization for reliability.",
        },
      ],
    },
  });
  return response.text || "No analysis available.";
};

export const getRouteIntelligence = async (location: string): Promise<{ text: string, sources: GroundingSource[] }> => {
  const response: GenerateContentResponse = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Search for recent weather, trail conditions, and road closures for cyclists near ${location}. Provide a summary of current conditions and hazards.`,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });

  const sources: GroundingSource[] = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
    title: chunk.web?.title || 'External Source',
    uri: chunk.web?.uri || '#'
  })) || [];

  return {
    text: response.text || "Information currently unavailable.",
    sources: sources
  };
};
