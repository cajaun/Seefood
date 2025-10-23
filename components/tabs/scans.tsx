import React from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../constants";
import { SymbolView } from "expo-symbols";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LargeTitle, Title2 } from "../ui/utils/typography";

type ScansTabProps = {
  menuImages?: Record<string, string[]>;
};

type FlatItem = {
  name: string;
  uri: string;
};


export default function ScansTab({ menuImages }: ScansTabProps) {
  const items = Object.entries(menuImages || {});
  const { top, bottom } = useSafeAreaInsets();

  if (items.length === 0) {
    return (
      <View
        style={{
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          backgroundColor: "#151C1B",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <SymbolView name="menucard.fill" size={120} tintColor="#818785" />
        <View style={{ marginTop: 30, alignItems: "center", gap: 10 }}>
          <LargeTitle className="  text-white text-center" style={{color: "#fff", fontFamily: "Sf-black"}}>
            Scan your first menu
          </LargeTitle>
          <Title2 className="  text-white text-center" style={{color: "#818785", fontFamily: "Sf-black"}}>
            Menus scanned will appear here
          </Title2>
          
        </View>
      </View>
    );
  }

  const flatData: FlatItem[] = [];
  items.forEach(([name, uris]) => {
    uris.forEach((uri) => flatData.push({ name, uri }));
  });

  const columns = 2;
  const imageSize = (SCREEN_WIDTH - 20 * 2 - 10 * (columns - 1)) / columns;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#151C1B" }}
      contentContainerStyle={{
        paddingTop: top,
        paddingBottom: bottom,
        paddingHorizontal: 12,
      }}
      showsVerticalScrollIndicator={false}
    >
      <FlatList
        data={flatData}
        keyExtractor={(item) => `${item.name}-${item.uri}`}
        numColumns={columns}
        scrollEnabled={false} 
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <View style={{ width: imageSize, marginBottom: 20 }}>
            <Image
              source={{ uri: item.uri }}
              style={{ width: imageSize, height: imageSize, borderRadius: 16 }}
            />
            <Text className="font-sfBold text-lg text-white mb-2">
              {item.name}
            </Text>
          </View>
        )}
      />
    </ScrollView>
  );
}
