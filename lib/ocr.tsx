import { useState, useRef } from "react";
import OpenAI from "openai";
import { CameraView } from "expo-camera";
import Constants from "expo-constants";

const openai = new OpenAI({ apiKey: Constants.expoConfig?.extra?.OPEN_AI_API_KEY });

export function useOCR() {
  const cameraRef = useRef<CameraView>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);

  const runOCR = async () => {
    if (!cameraRef.current) return;
    try {
      const photo = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.6,
      });

      if (!photo?.base64) return;

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

      console.log(result)
      setExtractedText(result.output_text ?? "No text found");
    } catch (e) {
      console.error(e);
      setExtractedText("Error extracting text");
    }
  };

  return { cameraRef, extractedText, runOCR };
}
