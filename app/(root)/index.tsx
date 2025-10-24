import React, { useEffect, useRef, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { useCameraPermissions } from "expo-camera";
import HistoryTab from "@/components/tabs/history/history";
import MainTab from "@/components/tabs/main";
import { SCREEN_WIDTH } from "@/components/constants";
import { useAuth } from "@/context/auth-context";

const tabs = [
  { key: "history", component: HistoryTab },
  { key: "camera", component: MainTab },
];

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [outerScrollEnabled, setOuterScrollEnabled] = useState(true);
  const flatListRef = useRef<FlatList>(null);
  const { recentMenus } = useAuth();

  const tabIndexMap = tabs.reduce((acc, tab, idx) => {
    acc[tab.key] = idx;
    return acc;
  }, {} as Record<string, number>);

  const scrollToTab = (key: string) => {
    const index = tabIndexMap[key];
    if (index !== undefined) {
      flatListRef.current?.scrollToIndex({ index, animated: true });
    }
  };

  if (!permission) return <View style={{ flex: 1 }} />;
  if (!permission.granted)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ marginBottom: 10 }}>Camera permission required</Text>
        <Pressable onPress={requestPermission}>
          <Text style={{ color: "blue" }}>Grant Permission</Text>
        </Pressable>
      </View>
    );

  const renderTab = ({ item }: { item: (typeof tabs)[0] }) => {
    const Component = item.component;


    return (
      <Component
        onScrollToggle={setOuterScrollEnabled}
        scrollToTab={scrollToTab}
        recentMenus={recentMenus}
      />
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={tabs}
      keyExtractor={(item) => item.key}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      initialScrollIndex={1}
      getItemLayout={(_, index) => ({
        length: SCREEN_WIDTH,
        offset: SCREEN_WIDTH * index,
        index,
      })}
      renderItem={renderTab}
      bounces={false}
    />
  );
}
