import React from "react";
import { FlatList, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { SCREEN_HEIGHT } from "@/components/constants";

import ScansTab from "./scans";
import CameraTab from "./camera";

const mainTabs = [
  { key: "Camera", component: CameraTab },
  { key: "Scans", component: ScansTab },
];

type Props = {
  onScrollToggle: (enabled: boolean) => void;
};

export default function MainTab({ onScrollToggle }: Props) {
  const handleInnerScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.y / SCREEN_HEIGHT);
    onScrollToggle(index === 0);
  };

  const renderMainTab = ({ item }: { item: typeof mainTabs[0] }) => {
    const Component = item.component;
    return <Component />;
  };

  return (
    <FlatList
      data={mainTabs}
      keyExtractor={(i) => i.key}
      renderItem={renderMainTab}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      bounces={false}
      horizontal={false}
      onMomentumScrollEnd={handleInnerScrollEnd}
    />
  );
}
