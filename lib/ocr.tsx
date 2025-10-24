import { useState, useRef } from "react";
import OpenAI from "openai";
import { CameraView } from "expo-camera";
import Constants from "expo-constants";
import * as FileSystem from "expo-file-system"; 
import { generateFoodImage } from "@/lib/image-gen";
import { extractMenuItems } from "@/utils/parse-menu";
import { uploadImageToFirebase } from "./firebase-storage";
import { useAuth } from "@/context/auth-context";
import { addDoc, collection, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "@/FirebaseConfig";
const openai = new OpenAI({ apiKey: Constants.expoConfig?.extra?.OPEN_AI_API_KEY });

export function useOCR(onProgress?: (partialImages: Record<string, string[]>) => void) {
  const cameraRef = useRef<CameraView>(null);
  const { user } = useAuth();
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [numImages, setMenuImages] = useState(0)


  const runOCR = async (photoUri?: string): Promise<Record<string, string[]>> => {
    if (!photoUri && !cameraRef.current) return {};

    setIsGenerating(true);

    try {
      let dataUri: string;

      if (photoUri?.startsWith("file://")) {
        const base64 = await FileSystem.readAsStringAsync(photoUri, { encoding: "base64" });
        dataUri = `data:image/jpeg;base64,${base64}`;
      } else if (photoUri) {
        dataUri = photoUri;
      } else {
        const photo = await cameraRef.current!.takePictureAsync({ base64: true, quality: 0.6 });
        dataUri = `data:image/jpeg;base64,${photo.base64}`;
      }

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
      setMenuImages(items.length);
      if (!items.length) return {};

      console.log(" Extracted items:", items);

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

 
      if (!user) {
        console.warn("No authenticated user found");
        setIsGenerating(false);
        return {};
      }
      
      if (!photoUri) {
        console.warn("No photo URI provided");
        setIsGenerating(false);
        return {};
      }
      

      const originalImageUrl = await uploadImageToFirebase(photoUri, user.uid);
      
      const generatedImageUrls: string[] = [];

      for (const imgs of Object.values(allImages)) {

        const validImgs = imgs.filter((i): i is string => typeof i === "string" && i.length > 0);
      
        for (const img of validImgs) {

          const url = await uploadImageToFirebase(img, user!.uid);
          if (url) generatedImageUrls.push(url);
        }
      }
      
      
      
      const itemsData = await Promise.all(
        Object.entries(allImages).map(async ([name, imgs]) => {
          const uploadedUrls: string[] = [];

          for (const img of imgs) {
            const url = await uploadImageToFirebase(img, user.uid);
            if (url) uploadedUrls.push(url);
          }

          return {
            name,
            generatedImages: uploadedUrls,
          };
        })
      );


      const menusRef = collection(db, "users", user.uid, "menus");
      await addDoc(menusRef, {
        originalImageUrl,
        items: itemsData,
        createdAt: Timestamp.fromDate(new Date()),
      });
 
       console.log("Menu stored in Firestore");
 
       return allImages;
      
    } catch (err) {
      console.error(" OCR error:", err);
      setExtractedText("Error extracting text");
      return {};
    } finally {
      setIsGenerating(false);
    }
  };

  return { cameraRef, extractedText,  isGenerating, runOCR: runOCR as (photoUri?: string) => Promise<Record<string, string[]>>, numImages };
}
