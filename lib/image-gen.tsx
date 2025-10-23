import OpenAI from "openai";
import Constants from "expo-constants";

const openai = new OpenAI({ apiKey: Constants.expoConfig?.extra?.OPEN_AI_API_KEY });

function cleanPrompt(item: string) {
  return item.replace(/[&()"]/g, "").replace(/\s+/g, " ").trim();
}


export async function generateFoodImage(prompt: string, count = 1): Promise<string[]> {
  const cleanText = cleanPrompt(prompt);
  const model = "gpt-image-1";
  const images: string[] = [];

  try {
    const results = await openai.images.generate({
      model,
      prompt: `Generate a realistic, appetizing photo of ${cleanText} in a restaurant setting.`,
      size: "1024x1024", 
      quality: "low",
    });

    const data = results.data ?? [];
    for (const img of data) {
      if (img.url) images.push(img.url);
      else if (img.b64_json) images.push(`data:image/png;base64,${img.b64_json}`);
    }

    return images;
  } catch (err) {
    console.error(`❌ Failed to generate image for "${prompt}":`, err);
    return [];
  }
}