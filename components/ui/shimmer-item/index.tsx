import React, { FC, PropsWithChildren } from "react";
import { StyleSheet, Pressable, View, PressableProps } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ShimmerComponent } from "./shimmer-components";



const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// Consistent timing for press animations
const DURATION = 200;

type Props = Omit<PressableProps, "onPressIn" | "onPressOut"> & {
  withShimmer?: boolean;
  onPressIn?: () => void;
  onPressOut?: () => void;
  size?: number;
};

export const CustomButton: FC<PropsWithChildren<Props>> = ({
  children,
  withShimmer,
  onPressIn,
  onPressOut,
  size,
  ...props
}) => {
  // Track button width for shimmer animation calculations - passed to shimmer component
  const containerWidth = useSharedValue(0);
  // Controls button scale during press - creates tactile feedback
  const scale = useSharedValue(1);

  // Apply scale transform for press feedback - smooth transition between normal/pressed states
  const rContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.get() }], // Direct scale transformation for immediate response
    };
  });

  return (
    <AnimatedPressable
      className="bg-[#2C2F2E]"
      style={[
        styles.container,
        rContainerStyle,
        {
          height: size,
          width: size,
          borderRadius: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 4,
          overflow: "hidden", 
        },
      ]}
      onLayout={(e) => containerWidth.set(e.nativeEvent.layout.width)}
      onPressIn={() => {
        scale.set(withTiming(0.95, { duration: DURATION }));
        onPressIn?.();
      }}
      onPressOut={() => {
        scale.set(withTiming(1, { duration: DURATION }));
        onPressOut?.();
      }}
      {...props}
    >
      {withShimmer && <ShimmerComponent containerWidth={containerWidth} />}

      <View className="flex-row items-center justify-center gap-1 py-3.5 px-6">
        {children}
      </View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  container: {},
});


