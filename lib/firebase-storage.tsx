import * as FileSystem from "expo-file-system";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "@/FirebaseConfig";

export async function uploadImageToFirebase(
  uri: string,
  userId: string,
  folder = "menus"
): Promise<string | null> {
  try {

    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, `${folder}/${userId}/${Date.now()}.jpg`);
    await uploadBytes(storageRef, blob);

    return getDownloadURL(storageRef);
  } catch (err) {
    console.error(" Firebase upload failed:", err);
    return null;
  }
}

export async function listUserMenuImages(userId: string, folder = "menus"): Promise<string[]> {
  try {
    const folderRef = ref(storage, `${folder}/${userId}`);
    const res = await listAll(folderRef);

    const urls = await Promise.all(res.items.map(getDownloadURL));
    return urls;
  } catch (err) {
    console.error(" Failed to list menu images for user:", err);
    return [];
  }
}