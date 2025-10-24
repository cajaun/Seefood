import React, { FC } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
  withDelay,
  SharedValue,
} from "react-native-reanimated";



type Props = {
  containerWidth: SharedValue<number>;
};

export const ShimmerComponent: FC<Props> = ({ containerWidth }) => {
  // Track shimmer element width for animation bounds - prevents layout shift during animation
  const shimmerComponentWidth = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    // Hide shimmer until layout measurement completes - prevents flash of unstyled content
    if (shimmerComponentWidth.value === 0) {
      return {
        opacity: 0,
      };
    }

    // Base duration optimized for Discord's button sizes - balanced between smooth and snappy
    const baseDuration = 1100;
    // Reference width for responsive scaling - matches typical Discord button width
    const referenceWidth = 200;
    // Scale duration proportionally to button width - maintains consistent visual speed across sizes
    const duration = baseDuration * (containerWidth.value / referenceWidth);

    return {
      opacity: 1,
      transform: [
        {
          // Horizontal sweep animation across button width
          translateX: withRepeat(
            withSequence(
              // 2s delay creates breathing room between shimmer cycles
              withDelay(2000, withTiming(-shimmerComponentWidth.value * 1.2, { duration: 0 })), // Reset to start position instantly
              // Sweep from left edge to right edge with overshoot for complete coverage
              withTiming(containerWidth.value + shimmerComponentWidth.value, { duration, easing: Easing.in(Easing.ease) })

            ),
            -1, // Infinite repetition for continuous shimmer effect
            false // No reverse - unidirectional sweep maintains consistency
          ),
        },
        { rotate: "30deg" }, // Diagonal angle creates classic shimmer effect - mimics light reflection
      ],
    };
  });

  return (
    <Animated.View
      className="absolute left-0 -top-[200%] -bottom-[200%] flex-row" // Full height coverage with overflow for seamless edge transitions
      style={[animatedStyle]}
      onLayout={(e) => shimmerComponentWidth.set(e.nativeEvent.layout.width)} // Measure shimmer width for animation calculations
    >
      {/* Three-stripe gradient creates realistic light reflection pattern */}
      <View className="w-6 bg-[#C7C8CE]/5" />
      <View className="w-5 bg-[#C7C8CE]/15" />
      <View className="w-6 bg-[#C7C8CE]/5" />
    </Animated.View>
  );
};


