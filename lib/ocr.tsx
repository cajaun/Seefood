import { useState, useRef } from "react";
import OpenAI from "openai";
import { CameraView } from "expo-camera";
import Constants from "expo-constants";
import { generateFoodImage } from "@/lib/image-gen";
import { extractMenuItems } from "@/utils/parse-menu";

const openai = new OpenAI({ apiKey: Constants.expoConfig?.extra?.OPEN_AI_API_KEY });

export function useOCR(onProgress?: (partialImages: Record<string, string[]>) => void) {
  const cameraRef = useRef<CameraView>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);

  const runOCR = async (): Promise<Record<string, string[]>> => {
    if (!cameraRef.current) return {};
    try {
  
      const photo = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.6,
      });

      const dataUri = `data:image/jpeg;base64,${photo.base64}`;


      const result = await openai.responses.create({
        model: "gpt-4o-mini",
        input: [
          {
            role: "user",
            content: [
              { type: "input_text", text: "Extract all visible text from this image. Return plain text only." },
              { type: "input_image", image_url: dataUri, detail: "auto" },
            ],
          },
        ],
      });

      const text = result.output_text ?? "No text found";
      setExtractedText(text);

      const items = extractMenuItems(text);
      if (!items.length) return {};

      console.log("🧾 Extracted items:", items);


      const allImages: Record<string, string[]> = {};
      const batchSize = 5;

      for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);

        await Promise.all(
          batch.map(async (item) => {
            const imgs = await generateFoodImage(item, 1);
            if (imgs.length > 0) {
              allImages[item] = imgs;
              onProgress?.({ [item]: imgs });
            }
          })
        );
      }

      console.log("✅ Finished all image generations");
      // console.log(allImages)
      return allImages;
    } catch (err) {
      console.error("❌ OCR error:", err);
      setExtractedText("Error extracting text");
      return {};
    }
  };

  return { cameraRef, extractedText, runOCR };
}