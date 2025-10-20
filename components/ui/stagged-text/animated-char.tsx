import { FC } from "react";
import { Text } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";



type Props = {
  char: string; 
  index: number; 
  totalCount: number; 
  progress: SharedValue<number>; 
};

export const AnimatedChar: FC<Props> = ({ index, char, progress, totalCount }) => {
  
  const charProgress = useDerivedValue(() => {
    const delayMs = index * 10; 

    return withDelay(
      delayMs,
      withSpring(progress.value, {
        damping: 100, // Low damping for bouncy, playful character entrance
        stiffness: 1400, // High stiffness for quick, snappy animation
      })
    );
  }, []);

  // Combine multiple animation properties for rich character entrance
  const rContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: charProgress.get(), // Fade in from 0 to 1
      transform: [
        {
          // Subtle horizontal slide for natural text flow
          translateX: interpolate(charProgress.get(), [0, 1], [-1, 0]),
        },
        {
          // Dynamic vertical movement - earlier characters start higher
          translateY: interpolate(
            charProgress.get(),
            [0, 1],
            [16 - index * (8 / Math.max(totalCount - 1, 1)), 0] // Range: 16px to 8px based on position
          ),
        },
        {
          // Scale animation for bouncy entrance effect
          scale: interpolate(charProgress.get(), [0, 1], [0.8, 1]),
        },
      ],
    };
  });

  return (
    <Animated.View style={rContainerStyle}>
      <Text className="text-4xl font-semibold text-white text-center" style={{fontFamily: "Sf-bold"}} >
        {char}
      </Text>
    </Animated.View>
  );
};


