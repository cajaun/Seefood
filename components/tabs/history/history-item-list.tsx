import React from "react";
import { FlatList, View } from "react-native";
import { chunkArray } from "@/utils/chunk-array";
import DrawerButton from "@/components/action-tray/content/drawer-button";
import { Menu, MenuItem } from "@/types/menu";

type HistoryItemListProps = {
  items: MenuItem[];
  onItemPress: (item: MenuItem) => void;
};

export function HistoryItemList({ items, onItemPress }: HistoryItemListProps) {
  return (
    <FlatList
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      data={chunkArray(items, 3)}
      keyExtractor={(_, index) => String(index)}
      renderItem={({ item }) => (
        <View style={{ flexDirection: "column", gap: 12, marginHorizontal: 16 }}>
          {item.map((menuItem, idx) => (
            <DrawerButton
              key={idx}
              onPress={() => onItemPress(menuItem)}
              backgroundColor="#2C2F2E"
              label={menuItem.name}
              textColor="#fff"
            />
          ))}
        </View>
      )}
    />
  );
}
