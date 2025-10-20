import React from "react";
import { View, Text } from "react-native";
import { SCREEN_WIDTH } from "../constants";

export default function HistoryTab() {
  return (
    <View
      style={{
        width: SCREEN_WIDTH,
        flex: 1,
        backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white", fontSize: 24 }}>History</Text>
    </View>
  );
}
