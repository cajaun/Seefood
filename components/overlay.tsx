import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SymbolView } from "expo-symbols";
import { PressableScale } from "@/components/ui/utils/pressable-scale";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { easeGradient } from "react-native-easing-gradient";

export function HeaderOverlay({ onPress }: { onPress?: () => void }) {
  const { top } = useSafeAreaInsets();
  const grossHeight = top + 58;

  const { colors, locations } = easeGradient({
    colorStops: {
      0: { color: "rgba(22, 28, 27, 1)" },
      0.5: { color: "rgba(22, 28, 27, 0.9)" },
      1: { color: "rgba(22, 28, 27, 0)" }, 
    },
  }) as {
    colors: [string, string, ...string[]];
    locations: [number, number, ...number[]];
  };

  return (
    <>
      <LinearGradient
        colors={colors}
        locations={locations}
        style={[StyleSheet.absoluteFill, { height: grossHeight * 1.2, zIndex: 5 }]}
      />

      <View
        className="px-4 py-3"
        style={{
          position: "absolute",
          top,
          right: 0,
          zIndex: 10,
          backgroundColor: "transparent",
        }}
      >
        <PressableScale
          onPress={onPress}
          className="p-3 rounded-full bg-[#2C2F2E]"
        >
          <SymbolView name="chevron.right" tintColor="white" weight="bold" />
        </PressableScale>
      </View>
    </>
  );
}
