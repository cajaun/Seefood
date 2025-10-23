import React, { useRef, useState } from "react";
import {
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  View,
  StyleSheet,
} from "react-native";
import { SCREEN_HEIGHT } from "@/components/constants";

import ScansTab from "./scans";
import CameraTab from "./camera/camera";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useOCR } from "@/lib/ocr";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { TopTabs } from "./top-tabs";
import { sampleMenuImages } from "@/utils/data";

const mainTabs = [
  { key: "Camera", component: CameraTab },
  { key: "Scans", component: ScansTab },
];

type Props = {
  onScrollToggle: (enabled: boolean) => void;
};

export default function MainTab({ onScrollToggle }: Props) {
  const { top } = useSafeAreaInsets();
  const [menuImages, setMenuImages] = useState<Record<string, string[]>>({});
  // const [menuImages, setMenuImages] = useState(sampleMenuImages);
  const { cameraRef, runOCR, isGenerating } = useOCR((partial) => {
    setMenuImages((prev) => ({ ...prev, ...partial }));
  });

  const handleInnerScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const index = Math.round(event.nativeEvent.contentOffset.y / SCREEN_HEIGHT);
    onScrollToggle(index === 0);
  };
  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const renderMainTab = ({ item }: { item: (typeof mainTabs)[0] }) => {
    if (item.key === "Camera") {
      return (
        <CameraTab
          cameraRef={cameraRef}
          runOCR={runOCR}
          setMenuImages={setMenuImages}
          scrollY={scrollY}
          isGenerating={isGenerating}
        />
      );
    }
    if (item.key === "Scans") {
      return <ScansTab menuImages={menuImages} />;
    }
    return null;
  };

  return (
    <View className="flex-1">
      <TopTabs />

      <Animated.FlatList
        data={mainTabs}
        keyExtractor={(i) => i.key}
        renderItem={renderMainTab}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        bounces={false}
        horizontal={false}
        onMomentumScrollEnd={handleInnerScrollEnd}
        onScroll={onScroll}
        scrollEventThrottle={16}
        className="flex-1"
      />
    </View>
  );
}
