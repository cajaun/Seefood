import React from "react";
import { Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { PressableScale } from "@/components/ui/utils/pressable-scale";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { easeGradient } from "react-native-easing-gradient";
import { Title, Title2 } from "@/components/ui/utils/typography";

export function HistoryFooter({ onPress }: { onPress?: () => void }) {
  const { bottom } = useSafeAreaInsets();
  const grossHeight = 58 + bottom;

  const { colors, locations } = easeGradient({
    colorStops: {
      0: { color: "rgba(22, 28, 27, 0)" },
      0.5: { color: "rgba(22, 28, 27, 0.7)" },
      1: { color: "rgba(22, 28, 27, 0.7)" },
    },
  }) as { colors: string[]; locations: number[] };


  const gradientColors = colors as [string, string, ...string[]];
  const gradientLocations = locations as [number, number, ...number[]];

  return (
    <>
      <LinearGradient
        colors={gradientColors}
        locations={gradientLocations}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: grossHeight * 1.5,
          zIndex: 5,
        }}
      />

      <PressableScale
        onPress={onPress}
        className="h-[50px] bg-[#2C2F2E] justify-center items-center w-[50%] rounded-full"
        style={{
          position: "absolute",
          bottom: bottom,
          alignSelf: "center",
          zIndex: 10,
        }}
      >
   <Title2
          style={{
            fontFamily: "Sf-black",
            color: "#fff",
          }}
        >
          View all
        </Title2>
      </PressableScale>
    </>
  );
}
