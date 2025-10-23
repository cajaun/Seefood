import React, { useState } from "react";
import { StyleSheet, Text, View, TextProps } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  withSequence,
  EasingFunction,
  EasingFunctionFactory,
} from "react-native-reanimated";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { colorKit } from "reanimated-color-picker";

type ShimmerTextProps = TextProps & {
  children: React.ReactNode;
  speed?: number;
  easing?: EasingFunction | EasingFunctionFactory;
  highlightColor?: string;
  shimmer?: boolean;
};

const ShimmerText = ({
  children,
  speed = 0.6,
  easing = Easing.in(Easing.ease),
  highlightColor = "#ffffff",
  shimmer = true,
  ...textProps
}: ShimmerTextProps) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const translateX = useSharedValue(-width);

  // Convert speed (shimmers per second) to duration in milliseconds per shimmer
  const duration = 1500 / speed;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  React.useEffect(() => {
    if (shimmer && width > 0) {
      translateX.set(
        withRepeat(
          withSequence(
            withTiming(-width, { duration: 0 }),
            withTiming(width, { duration, easing })
          ),
          -1,
          false
        )
      );
    } else {
      translateX.value = 0; // reset when shimmer is off
    }
  }, [duration, easing, translateX, width, shimmer]);

  const highlightColorTransparent = colorKit.setAlpha(highlightColor, 0).hex();

  return (
    <View>
      {/* We need to keep the text with absolute position to have it under mask element so when the gradient moves it will be visible */}
      {/* We also use it to get the text width and height of the component as it's not possible to make dynamically inside the mask */}
      {!shimmer ? (
        <Text {...textProps}>{children}</Text>
      ) : (
        <>
          <Text
            style={textProps.style}
            className="absolute top-0 left-0 self-start pointer-events-none"
            onLayout={(event) => {
              const { width, height } = event.nativeEvent.layout;
              setWidth(width);
              setHeight(height);
            }}
          >
            {children}
          </Text>
          <MaskedView
            style={{
              width,
              height,
            }}
            maskElement={
              <View
                // Transparent background because mask is based off alpha channel.
                className="bg-transparent"
              >
                <Text style={textProps.style}>{children}</Text>
              </View>
            }
          >
            <Animated.View style={[{ width, height }, animatedStyle]}>
              <LinearGradient
                colors={[
                  highlightColorTransparent,
                  colorKit.setAlpha(highlightColor, 0.7).hex(), // softer highlight
                  colorKit.setAlpha(highlightColor, 0.7).hex(),
                  highlightColorTransparent,
                ]}
                locations={[0, 0.4, 0.6, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFill}
              />
            </Animated.View>
          </MaskedView>
        </>
      )}
    </View>
  );
};

export default ShimmerText;
