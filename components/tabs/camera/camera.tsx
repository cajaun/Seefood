import React, { useState } from "react";
import { CameraView } from "expo-camera";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { SharedValue } from "react-native-reanimated";
import {

  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "@/components/constants";
import CameraFrame from "./camera-frame";
import CaptureControls from "./capture-controls";
import ViewInfo from "./view-info";
import * as ImagePicker from "expo-image-picker";

type CameraTabProps = {
  cameraRef: React.RefObject<CameraView>;
  runOCR: (photoUri?: string) => Promise<Record<string, string[]>>;
  setMenuImages?: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
  isGenerating: boolean;
  scrollY?: SharedValue<number>;
  scrollToTab?: (key: string) => void 
};

export default function CameraTab({
  cameraRef,
  runOCR,
  setMenuImages,
  isGenerating,
  scrollToTab,
}: CameraTabProps) {
  const [flash, setFlash] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [facing, setFacing] = useState<"front" | "back">("back");
  const { top, bottom } = useSafeAreaInsets();
  

  const handleCapture = async () => {
    if (!cameraRef.current) return;
    try {
      const photo = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.6,
      });
      if (!photo?.uri) return;

      setPhotoUri(photo.uri);
    } catch (e) {
      console.error(e);
    }
  };

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      base64: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setPhotoUri(uri);
    }
  };
  
  const handleConfirm = async () => {
    if (!photoUri) return;
    try {
      const generatedImages = await runOCR(photoUri);
      setMenuImages?.(generatedImages);
    } catch (err) {
      console.error(err);
    } finally {
      setPhotoUri(null);
    }
  };

  const handleToggleCamera = () => setFacing(prev => (prev === "back" ? "front" : "back"));

  return (
    <Animated.View style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT, paddingTop: top, backgroundColor: "#151C1B" }}>
      <CameraFrame
        cameraRef={cameraRef}
        photoUri={photoUri}
        flash={flash}
        facing={facing}
        cameraReady={cameraReady}
        setCameraReady={setCameraReady}
        setFlash={setFlash}
      />

      <CaptureControls
        photoUri={photoUri}
        bottomInset={bottom}
        handleCapture={handleCapture}
        handleConfirm={handleConfirm}
        handleToggleCamera={handleToggleCamera}
        handlePickImage={handlePickImage}
        setPhotoUri={setPhotoUri}
      />

      <ViewInfo bottomInset={bottom} isGenerating={isGenerating} scrollToTab={scrollToTab} />
    </Animated.View>
  );
}