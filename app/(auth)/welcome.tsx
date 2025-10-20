import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  useWindowDimensions,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedReaction,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colorKit } from "reanimated-color-picker";
import { StaggeredText } from "@/components/ui/stagged-text";
import { FeatureItem } from "@/components/ui/feature-item";
import ShimmerText from "@/components/ui/shimmer";
import { PressableScale } from "@/components/ui/utils/pressable-scale";
import { SymbolView } from "expo-symbols";
import { AppleAuthButton } from "@/services/apple-auth";

const HEADER_HEIGHT = 50;
const GRADIENT_HEIGHT = 50;

type OnboardingItem = {
  title: string;
  description: string;
  renderPlaceholder: () => React.ReactNode;
};

const data: OnboardingItem[] = [
  {
    title: "Scan Any Menu Instantly",
    description:
      "Instantly capture menus with your camera and see all the dishes clearly laid out.",
    renderPlaceholder: () => (
      <View className="flex-1 justify-center p-4 ">
        <View className="flex-row justify-between space-x-2 mb-8">
          <View
            className=" p-12 w-[48%] items-center h-48 bg-purple-200 rounded-3xl"
            style={{
              transform: [{ rotate: "-5deg" }, { translateX: -15 }],
            }}
          ></View>

          <View
            className="rounded-3xl p-8 w-[50%] items-center justify-center h-44 bg-blue-200"
            style={{
              transform: [
                { rotate: "3deg" },
                { translateX: 30 },
                { translateY: -15 },
              ],
            }}
          >
            <View className="items-center justify-center">
              <Text className="text-2xl font-sfBold mt-4 text-gray-800"></Text>
            </View>
          </View>
        </View>

        <View className="items-center">
          <View
            className=" rounded-3xl p-8 w-[60%]  h-60 bg-green-200"
            style={{ transform: [{ rotate: "1.5deg" }] }}
          >
            <Text className="text-2xl font-sfBold mt-4 text-gray-800 text-center"></Text>
          </View>
        </View>
      </View>
    ),
  },
  {
    title: "See Every Dish Come to Life",
    description:
      "Get lifelike images of every item in seconds to easily imagine what your meal will look like.",
    renderPlaceholder: () => (
      <View className="flex-1 justify-center p-4 gap-y-8">
        <View className="items-center">
          <View
            className=" rounded-3xl p-8 w-[60%]  h-60 bg-green-200"
            style={{ transform: [{ rotate: "1.5deg" }] }}
          ></View>
        </View>

        <View className="flex-row justify-between space-x-4 mb-8">
          <View
            className=" p-12 w-[48%] items-center h-48 bg-purple-200 rounded-3xl"
            style={{
              transform: [{ rotate: "-5deg" }, { translateX: -30 }],
            }}
          ></View>

          <View
            className="rounded-3xl p-8 w-[48%] items-center justify-center h-60 bg-blue-200 "
            style={{
              transform: [{ rotate: "3deg" }, { translateX: 30 }],
            }}
          ></View>
        </View>
      </View>
    ),
  },
  {
    title: "Choose with Confidence",
    description:
      "Explore, compare, and pick your perfect meal so you can enjoy exactly what you want.",
    renderPlaceholder: () => (
      <View className="flex-1 justify-center p-4 ">
        <View className="flex-row justify-between space-x-4 mb-8">
          <View
            className=" p-12 w-[48%] items-center h-48 bg-purple-200 rounded-3xl"
            style={{
              transform: [{ rotate: "-5deg" }, { translateX: -30 }],
            }}
          ></View>

          <View
            className="rounded-3xl p-8 w-[48%] items-center justify-center h-60 bg-blue-200 "
            style={{
              transform: [{ rotate: "3deg" }, { translateX: 30 }],
            }}
          ></View>
        </View>

        <View className="items-center">
          <View
            className=" rounded-3xl p-8 w-[55%]  h-40 bg-green-200"
            style={{
              transform: [{ rotate: "1.5deg" }, { translateX: -30 }],
            }}
          ></View>
        </View>
      </View>
    ),
  },
];

const Onboarding = () => {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  // Shared values for scroll + index tracking
  const prevOffsetY = useSharedValue(0);
  const scrollDirection = useSharedValue<"to-up" | "to-down" | "idle">("idle");
  const activeIndex = useSharedValue(0);
  const prevIndex = useSharedValue(0);

  // Animated scroll logic
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const offsetY = event.contentOffset.y;
      const positiveOffsetY = Math.max(offsetY, 0);
      const positivePrevOffsetY = Math.max(prevOffsetY.get(), 0);

      activeIndex.set(Math.floor(offsetY / height + 0.5));

      if (
        positivePrevOffsetY - positiveOffsetY < 0 &&
        (scrollDirection.get() === "idle" || scrollDirection.get() === "to-up")
      ) {
        scrollDirection.set("to-down");
      }

      if (
        positivePrevOffsetY - positiveOffsetY > 0 &&
        (scrollDirection.get() === "idle" ||
          scrollDirection.get() === "to-down")
      ) {
        scrollDirection.set("to-up");
      }

      prevOffsetY.set(offsetY);
    },
  });

  useAnimatedReaction(
    () => activeIndex.value,
    (_newIndex, oldIndex) => {
      if (oldIndex !== null && oldIndex !== undefined) {
        prevIndex.value = oldIndex;
      }
    }
  );

  const textStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      activeIndex.value,
      [data.length - 2, data.length - 1],
      [1, 0],
      Extrapolation.CLAMP
    );

    const translateY = interpolate(
      activeIndex.value,
      [data.length - 2, data.length - 1],
      [0, 20],
      Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  return (
    <View style={{ flex: 1 }}>
      <Animated.FlatList
        data={data}
        keyExtractor={(_, i) => i.toString()}
        pagingEnabled
        bounces={false}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => (
          <View
            className="flex-1 bg-[#212121] justify-between  pt-6"
            style={{
              paddingTop: insets.top + HEADER_HEIGHT,
              paddingBottom: insets.bottom + 16,
              height,
            }}
          >
            {index === 0 && (
              <View className="w-full items-center justify-center px-4 gap-y-4">
                <Text className="text-center  text-xl font-sfSemiBold text-white/60 ">
                  Welcome to Seefood{" "}
                </Text>
              </View>
            )}

            <View className="items-center mb-10 mt-4 ">
              <View className="mb-3 items-center justify-center h-8 ">
                <StaggeredText
                  text={item.title}
                  activeIndex={activeIndex}
                  showIndex={[index]}
                />
              </View>

              <View className="h-14 w-full mb-8 items-center justify-center">
                <FeatureItem
                  label={item.description}
                  itemIndex={index}
                  activeIndex={activeIndex}
                  prevIndex={prevIndex}
                />
              </View>
            </View>

            <View className="flex-1 items-center justify-center">
              {item.renderPlaceholder()}
            </View>

            {index === data.length - 1 && (
              <View className="items-center mt-6 px-4 ">
                  <AppleAuthButton/>
              </View>
            )}
          </View>
        )}
      />
      <View
        style={{
          position: "absolute",
          bottom: insets.bottom,
          alignSelf: "center",
        }}
      >
        <Animated.View style={textStyle}>
          <ShimmerText
            style={{
              fontFamily: "Sf-bold",
              fontSize: 18,
              color: "#525252",
              width: 180,
              height: 20,
              textAlign: "center",
            }}
          >
            Swipe up to continue
          </ShimmerText>
        </Animated.View>
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  borderCurve: {
    borderCurve: "continuous",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: GRADIENT_HEIGHT,
  },
});
