import React, { useState, useRef } from "react";
import { View, Image, StyleSheet, Pressable, Text } from "react-native";
import { CameraView } from "expo-camera";
import { SymbolView } from "expo-symbols";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
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
import ShimmerText from "../ui/shimmer";
import Animated, {
  Extrapolation,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Body, Headline, Title2, Title3 } from "../ui/utils/typography";

type CameraTabProps = {
  cameraRef: React.RefObject<CameraView>;
  runOCR: () => Promise<Record<string, string[]>>;
  setMenuImages?: React.Dispatch<
    React.SetStateAction<Record<string, string[]>>
  >;
  scrollY?: SharedValue<number>;
};

export default function CameraTab({
  cameraRef,
  runOCR,
  setMenuImages,
  scrollY,
}: CameraTabProps) {
  const [flash, setFlash] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const { bottom } = useSafeAreaInsets();
  const [cameraReady, setCameraReady] = useState(false);

  const handleCapture = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.6,
      });
      if (!photo?.uri) return;

      setPhotoUri(photo.uri);

      const generatedImages = await runOCR();

      if (setMenuImages) setMenuImages(generatedImages);

      setPhotoUri(null);
      // scrollToScans?.();
    } catch (e) {
      console.error(e);
    }
  };

  const retake = () => setPhotoUri(null);

  const { top } = useSafeAreaInsets();
  // const bgStyle = useAnimatedStyle(() => ({
  //   backgroundColor: interpolateColor(
  //     scrollY?.value ?? 0,
  //     [0, SCREEN_HEIGHT / 2, SCREEN_HEIGHT],
  //     ["#000000", "#222123", "#222123"], // keep last color for second half
  //     "RGB"
  //   )
  // }));

  return (
    <Animated.View
      style={[
        {
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          paddingTop: top,
          backgroundColor: "#151C1B",
        },
      ]}
    >
      <View
        style={{
          position: "absolute",
          top: FRAME_TOP,
          left: HORIZONTAL_PADDING,
          width: FRAME_WIDTH,
          height: FRAME_HEIGHT,
          borderRadius: 28,
          overflow: "hidden",
          backgroundColor: "#2C2F2E",
        }}
      >
        <CameraView
          ref={cameraRef}
          style={{ flex: 1 }}
          facing="back"
          enableTorch={flash}
          animateShutter={false}
          onCameraReady={() => setCameraReady(true)}
        />

        {!cameraReady && (
          <View
            style={[
              StyleSheet.absoluteFillObject,
              {
                backgroundColor: "#2C2F2E",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 20,
              },
            ]}
          />
        )}

        {photoUri && (
          <Animated.Image
            source={{ uri: photoUri }}
            style={[StyleSheet.absoluteFillObject, {}]}
            resizeMode="cover"
          />
        )}

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
          <SymbolView
            name={flash ? "bolt.fill" : "bolt.slash.fill"}
            size={25}
            tintColor="white"
          />
        </Pressable>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: bottom + 130,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 40,
        }}
      >
        <PressableScale
          scale={0.75}
          onPress={() => {
            if (photoUri) retake();
          }}
        >
          <SymbolView
            name={photoUri ? "xmark" : "photo.on.rectangle.angled"}
            size={40}
            tintColor="white"
          />
        </PressableScale>

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
          <PressableScale
            scale={0.75}
            onPress={async () => {
              if (photoUri) {
                await runOCR();
                setPhotoUri(null);
              } else {
                handleCapture();
              }
            }}
          >
            <View
              style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                backgroundColor: photoUri ? "#2D2F2E" : "white",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {photoUri && (
                <SymbolView name="checkmark" size={30} tintColor="white" />
              )}
            </View>
          </PressableScale>
        </View>

        <PressableScale scale={0.75}>
          <SymbolView
            name={
              photoUri
                ? "arrow.down.circle"
                : "arrow.trianglehead.2.clockwise.rotate.90"
            }
            size={40}
            tintColor="white"
          />
        </PressableScale>
      </View>

      <PressableScale
        style={{
          position: "absolute",
          bottom: bottom ,
          alignSelf: "center",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 15,
            padding: 12,
          }}
        >
          <View className="p-1.5 rounded-xl bg-[#2C2F2E]">
            <SymbolView name="menucard" size={30} tintColor="white" />
          </View>

          <Title2
            className="   text-center"
            style={{ color: "#ffffff", fontFamily: "Sf-black" }}
          >
            View menu
          </Title2>
        </View>

        <SymbolView
          name="chevron.compact.down"
          size={35}
          tintColor="white"
          weight="semibold"
        />
      </PressableScale>
    </Animated.View>
  );
}
