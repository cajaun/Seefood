import React from "react";
import { StyleSheet, View } from "react-native";
import { SCREEN_WIDTH } from "../constants";
import { SymbolView } from "expo-symbols";
import { PressableScale } from "../ui/utils/pressable-scale";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { easeGradient } from "react-native-easing-gradient";
import { LinearGradient } from "expo-linear-gradient";
import * as Form from "@/components/ui/utils/forms";
import { HeaderOverlay } from "../overlay";

export default function HistoryTab() {
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{
        width: SCREEN_WIDTH,
        flex: 1,
        backgroundColor: "#151C1B",
      }}
    >
      <HeaderOverlay
        onPress={() => {
          /* handle navigation */
        }}
      />
    </View>
  );
}
