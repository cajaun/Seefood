import React, { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { useCameraPermissions } from "expo-camera";
import HistoryTab from "@/components/tabs/history";
import MainTab from "@/components/tabs/main";
import { SCREEN_WIDTH } from "@/components/constants";
import { ListModelsResponse } from "@google/genai";


const tabs = [
  { key: "left", component: HistoryTab },
  { key: "camera", component: MainTab },
];

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [outerScrollEnabled, setOuterScrollEnabled] = useState(true);

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

  const renderTab = ({ item }: { item: typeof tabs[0] }) => {
    const Component = item.component;
    if (item.key === "camera") {
      return <Component onScrollToggle={setOuterScrollEnabled} />;
    }
    return <Component onScrollToggle={setOuterScrollEnabled}  />;
  };

  return (
    <FlatList
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
