import { Timestamp } from "firebase/firestore";

export interface MenuItem {
  name: string;
  generatedImages: string[];
}

export interface Menu {
  id: string;
  originalImageUrl: string;
  items: MenuItem[];
  createdAt: Timestamp;
}