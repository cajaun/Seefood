import React, { useState, useRef } from "react";
import { View, Image, StyleSheet, Animated, Pressable } from "react-native";
import { CameraView } from "expo-camera";
import { SymbolView } from "expo-symbols";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PressableScale } from "@/components/ui/utils/pressable-scale";
import { useOCR } from "@/lib/ocr";
import {
  FRAME_HEIGHT,
  FRAME_TOP,
  FRAME_WIDTH,
  HORIZONTAL_PADDING,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "@/components/constants";

export default function CameraTab() {
  const { cameraRef, runOCR } = useOCR();
  const [flash, setFlash] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { bottom } = useSafeAreaInsets();

  const handleCapture = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.6,
      });
      if (!photo?.uri) return;

      // Immediately overlay the captured photo
      setPhotoUri(photo.uri);
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();

      // Run OCR in the background
      runOCR();
    } catch (e) {
      console.error(e);
    }
  };

  const retake = () => setPhotoUri(null);

  return (
    <View style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT, backgroundColor: "black" }}>
      {/* Camera Frame */}
      <View
        style={{
          position: "absolute",
          top: FRAME_TOP,
          left: HORIZONTAL_PADDING,
          width: FRAME_WIDTH,
          height: FRAME_HEIGHT,
          borderRadius: 28,
          overflow: "hidden",
          backgroundColor: "black",
        }}
      >
        {/* Always keep camera mounted */}
        <CameraView ref={cameraRef} style={{ flex: 1 }} facing="back" enableTorch={flash} />

        {/* Fade-in captured photo overlay */}
        {photoUri && (
          <Animated.Image
            source={{ uri: photoUri }}
            style={[StyleSheet.absoluteFillObject, { opacity: fadeAnim }]}
            resizeMode="cover"
          />
        )}

        {/* Flash toggle */}
        <Pressable
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 10,
            backgroundColor: "rgba(0,0,0,0.3)",
            borderRadius: 20,
            padding: 5,
          }}
          onPress={() => setFlash(!flash)}
        >
          <SymbolView name={flash ? "bolt.fill" : "bolt.slash.fill"} size={25} tintColor="white" />
        </Pressable>
      </View>

      {/* Bottom controls */}
      <View
        style={{
          position: "absolute",
          bottom: bottom + 120,
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 30,
        }}
      >
        {/* Retake button */}
        {photoUri && (
          <PressableScale scale={0.75} onPress={retake}>
            <SymbolView name="arrow.counterclockwise.circle.fill" size={50} tintColor="white" />
          </PressableScale>
        )}

        {/* Capture Button */}
        <View
          style={{
            width: 85,
            height: 85,
            borderRadius: 42.5,
            borderWidth: 4,
            borderColor: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PressableScale scale={0.75} onPress={handleCapture}>
            <View
              style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                backgroundColor: "white",
              }}
            />
          </PressableScale>
        </View>
      </View>
    </View>
  );
}
