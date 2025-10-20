import React from "react";
import { View, Text } from "react-native";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants";

export default function ScansTab() {
  return (
    <View
      style={{
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: "#222",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white", fontSize: 24 }}>
        Scans
      </Text>
    </View>
  );
}
