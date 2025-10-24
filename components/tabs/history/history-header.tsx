import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SymbolView } from "expo-symbols";
import { PressableScale } from "@/components/ui/utils/pressable-scale";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { easeGradient } from "react-native-easing-gradient";
import { Title, Title2 } from "../../ui/utils/typography";

export function HistoryHeader({ onPress }: { onPress?: () => void }) {
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
        style={[
          StyleSheet.absoluteFill,
          { height: grossHeight * 1.2,},
        ]}
      />

      <View
        className="flex-row justify-between items-center"
        style={{ paddingTop: top }}
      >
        <Title
          style={{
            fontFamily: "Sf-black",
            color: "#fff",
          }}
        >
          History
        </Title>

        <PressableScale
          onPress={onPress}
          className="p-3 rounded-full bg-[#2C2F2E]"
        >
          <SymbolView name="chevron.right" tintColor="white" weight="semibold" />
        </PressableScale>
      </View>
    </View>
  );
}
