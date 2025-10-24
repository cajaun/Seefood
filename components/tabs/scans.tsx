import React from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants";
import { SymbolView } from "expo-symbols";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LargeTitle, Title, Title2, Title3 } from "../ui/utils/typography";
import { CustomButton } from "../ui/shimmer-item";

type ScansTabProps = {
  menuImages?: Record<string, string[]>;
  numImages: number;
};

type FlatItem = {
  name: string;
  uri: string;
};

export default function ScansTab({ menuImages, numImages }: ScansTabProps) {
  const items = Object.entries(menuImages || {});
  const { top, bottom } = useSafeAreaInsets();
  const columns = 2;
  const imageSize = (SCREEN_WIDTH - 20 * 2 - 10 * (columns - 1)) / columns;

 
  const flatData: FlatItem[] = [];
  items.forEach(([name, uris]) => {
    uris.forEach((uri) => flatData.push({ name, uri }));
  });


  const placeholdersNeeded = Math.max(numImages - flatData.length, 0);
  const placeholderData: FlatItem[] = Array.from({ length: placeholdersNeeded }, (_, i) => ({
    name: "",
    uri: `placeholder-${i}`,
  }));

  const dataToRender = [...flatData, ...placeholderData];


  const rows: JSX.Element[] = [];
  for (let i = 0; i < dataToRender.length; i += columns) {
    rows.push(
      <View
        key={`row-${i}`}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        {dataToRender.slice(i, i + columns).map((item) => (
          <View
            key={item.uri}
            style={{
              width: imageSize,
              height: imageSize + 20,
              borderRadius: 16,
              backgroundColor: item.uri.startsWith("placeholder-") ? "#2C3231" : "transparent",
            }}
          >
            {item.uri.startsWith("placeholder-") ? null : (
              <>
                <Image
                  source={{ uri: item.uri }}
                  style={{ width: imageSize, height: imageSize, borderRadius: 16 }}
                  transition={250}
                />
                <Text style={{ color: "white", fontFamily: "Sf-bold", marginTop: 4 }}>
                  {item.name}
                </Text>
              </>
            )}
          </View>
        ))}
      </View>
    );
  }


  if (numImages === 0 && flatData.length === 0) {
    return (
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
        <SymbolView name="camera.viewfinder" size={100} tintColor="#818785" />
        <View style={{ marginTop: 30, alignItems: "center", gap: 10 }}>
          <Title style={{ color: "#fff", fontFamily: "Sf-black" }}>
            Scan your first menu
          </Title>
          <Title3 style={{ color: "#818785", fontFamily: "Sf-black" }}>
            Menus scanned will appear here
          </Title3>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        minHeight: SCREEN_HEIGHT - top - bottom,
        paddingTop: top,
        paddingBottom: bottom,
        paddingHorizontal: 12,
        backgroundColor: "#151C1B",
      }}
    >
      {rows}
    </View>
  );
}
