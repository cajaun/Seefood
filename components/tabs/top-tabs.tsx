import React from "react";
import { View, StyleSheet } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { SymbolView } from "expo-symbols";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PressableScale } from "../ui/utils/pressable-scale";
import { router } from "expo-router";
import { easeGradient } from "react-native-easing-gradient";

export function TopTabs() {
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
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        zIndex: 10,
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
    >
     <LinearGradient
        colors={colors}
        locations={locations}
        style={[StyleSheet.absoluteFill, { height: grossHeight * 1.2 }]}
      />

      <View
        className="flex-row justify-between items-center"
        style={{ paddingTop: top }}
      >
        <View className="p-3 rounded-full bg-[#2C2F2E]">
          <SymbolView
            name="clock.arrow.trianglehead.counterclockwise.rotate.90"
            tintColor="white"
            weight="semibold"
          />
        </View>

        <PressableScale
          onPress={() => router.push("/(modal)/settings")}
          className="p-3 rounded-full bg-[#2C2F2E]"
        >
          <SymbolView name="gear" tintColor="white" weight="semibold" />
        </PressableScale>
      </View>
    </View>
  );
}
