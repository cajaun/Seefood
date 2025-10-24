// components/tray/tray-header.tsx
import React from "react";
import { View } from "react-native";
import { PressableScale } from "@/components/ui/utils/pressable-scale";
import { SymbolView } from "expo-symbols";
import { Title2 } from "@/components/ui/utils/typography";

type HistoryTrayHeaderProps = {
  title: string;
  onClose: () => void;
};

export function HistoryTrayHeader({ title, onClose }: HistoryTrayHeaderProps) {
  return (
    <View className="gap-y-4">
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 24,
          marginBottom: 12,
        }}
      >
        <View style={{ width: "80%" }}>
          <Title2
            style={{ color: "#fff", fontFamily: "Sf-black" }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Title2>
        </View>

        <PressableScale
          style={{
            padding: 4,
            aspectRatio: 1,
            width: 32,
            backgroundColor: "#2C2F2E",
            borderRadius: 1000,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={onClose}
        >
          <SymbolView
            name="xmark.circle.fill"
            type="palette"
            size={35}
            colors={["#ffffff", "#2C2F2E"]}
          />
        </PressableScale>
      </View>
    </View>
  );
}
