import React from "react";
import { View } from "react-native";
import { SymbolView } from "expo-symbols";
import { Title, Title2, Title3 } from "../../ui/utils/typography";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "@/components/constants";

export const HistoryEmptyState: React.FC = () => (
  <View
    style={{
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      flex: 1,
      backgroundColor: "#151C1B",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    }}
  >
    <SymbolView
      name="photo.on.rectangle.angled"
      size={100}
      tintColor="#818785"
    />

    <View style={{ marginTop: 30, alignItems: "center", gap: 10 }}>
      <Title
        style={{ color: "#fff", textAlign: "center", fontFamily: "Sf-black" }}
      >
        See your previous menus
      </Title>
      <Title3
        style={{
          color: "#818785",
          textAlign: "center",
          fontFamily: "Sf-black",
        }}
      >
        Previous menus scanned will appear here
      </Title3>
    </View>
  </View>
);
