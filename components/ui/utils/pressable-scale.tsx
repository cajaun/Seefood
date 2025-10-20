import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';


export type PressableScaleProps = {
  children: React.ReactNode; 
  onPress?: () => void; 
  style?: StyleProp<ViewStyle>; 
  className?: string;
  disabled?: boolean;
  scale?: number;
};


const PressableScale: React.FC<PressableScaleProps> = ({
  children,
  onPress,
  style,
  className,
  disabled,
  scale = 0.95,
}) => {
  // Create a shared value to track the press state
  const active = useSharedValue(false);

  // Create a tap gesture handler
  const gesture = Gesture.Tap()
  .enabled(!disabled)
    .maxDuration(4000) // Set maximum duration for tap gesture
    .onTouchesDown(() => {
      active.value = true; // Mark as active on touch down
    })
    .onTouchesUp(() => {
      if (onPress != null) runOnJS(onPress)(); // Execute onPress on touch up
    })
    .onFinalize(() => {
      active.value = false; // Reset press state on finalize
    });

  // Create an animated style for scaling effect
  const rAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(active.value ? scale : 1), // Scale down when active, return to normal otherwise
        },
      ],
    };
  }, []);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[style, rAnimatedStyle]} className={className}>{children}</Animated.View>
    </GestureDetector>
  );
};

export { PressableScale };