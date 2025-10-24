import { BlurView } from "expo-blur";
import React, { FC } from "react";
import { Text, StyleSheet, View, Platform } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withDelay,
  useAnimatedProps,
} from "react-native-reanimated";


const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);


const INITIAL_OPACITY = 0;
const ACTIVE_OPACITY = 1;
const TRANSLATE_DISTANCE = 40;
const ACTIVE_TRANSLATE_DISTANCE = 0;
const INITIAL_SCALE = 0.8;
const ACTIVE_SCALE = 1;
const INITIAL_BLUR_INTENSITY = 40;
const ACTIVE_BLUR_INTENSITY = 0;

const SPRING_CONFIG_ON_ENTER = {
  damping: 110,
  stiffness: 800,
};

const SPRING_CONFIG_ON_EXIT = {
  damping: 110,
  stiffness: 800,
};

type Props = {
  label: string;
  itemIndex: number;
  activeIndex: SharedValue<number>;
  prevIndex: SharedValue<number>;
};

export const FeatureItem: FC<Props> = ({
  label,
  itemIndex,
  activeIndex,
  prevIndex,
}) => {
  const opacity = useSharedValue(INITIAL_OPACITY);
  const translateY = useSharedValue(-TRANSLATE_DISTANCE);
  const scale = useSharedValue(INITIAL_SCALE);
  const blurIntensity = useSharedValue(INITIAL_BLUR_INTENSITY);

  const initEnter = (isAscending: boolean) => {
    "worklet";
    opacity.value = INITIAL_OPACITY;
    translateY.value = isAscending ? -TRANSLATE_DISTANCE : TRANSLATE_DISTANCE;
    scale.value = INITIAL_SCALE;
    blurIntensity.value = INITIAL_BLUR_INTENSITY;
  };

  const onEnterDelayed = () => {
    "worklet";
    opacity.value = withDelay(
      150,
      withSpring(ACTIVE_OPACITY, SPRING_CONFIG_ON_ENTER)
    );
    translateY.value = withDelay(
      150,
      withSpring(ACTIVE_TRANSLATE_DISTANCE, SPRING_CONFIG_ON_ENTER)
    );
    scale.value = withDelay(
      150,
      withSpring(ACTIVE_SCALE, SPRING_CONFIG_ON_ENTER)
    );
    blurIntensity.value = withDelay(
      150,
      withSpring(ACTIVE_BLUR_INTENSITY, SPRING_CONFIG_ON_ENTER)
    );
  };

  const onExit = (isAscending: boolean) => {
    "worklet";
    opacity.value = withSpring(INITIAL_OPACITY, SPRING_CONFIG_ON_EXIT);
    translateY.value = withSpring(
      isAscending ? TRANSLATE_DISTANCE : -TRANSLATE_DISTANCE,
      SPRING_CONFIG_ON_EXIT
    );
    scale.value = withSpring(INITIAL_SCALE, SPRING_CONFIG_ON_EXIT);
    blurIntensity.value = withSpring(INITIAL_BLUR_INTENSITY, SPRING_CONFIG_ON_EXIT);
  };

  useAnimatedReaction(
    () => ({ activeIndex: activeIndex.value, prevIndex: prevIndex.value }),
    ({ activeIndex, prevIndex }) => {
      const isAscending = activeIndex > prevIndex;
      const isDescending = activeIndex < prevIndex;

      if (activeIndex === itemIndex) {
        if (isAscending) {
          initEnter(true);
          onEnterDelayed();
        } else if (isDescending) {
          initEnter(false);
          onEnterDelayed();
        } else {
          // initial render
          opacity.value = ACTIVE_OPACITY;
          translateY.value = ACTIVE_TRANSLATE_DISTANCE;
          scale.value = ACTIVE_SCALE;
          blurIntensity.value = ACTIVE_BLUR_INTENSITY;
        }
      } else if (prevIndex === itemIndex) {
        if (isAscending) onExit(true);
        else if (isDescending) onExit(false);
      } else {
        initEnter(true);
      }
    }
  );

  const rContainerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const backdropAnimatedProps = useAnimatedProps(() => {
    return {
      intensity: blurIntensity.get(), 
    };
  });

  return (
    <Animated.View style={[rContainerStyle, { position: "absolute", padding: 16 }]}>
      
      <View style={[styles.container, { paddingHorizontal: 12, paddingVertical: 8 }]}>
        <Text  className = "text-white/60 text-xl font-sfSemiBold text-center">{label}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderCurve: "continuous",
    // backgroundColor: "#2C2F2E",
    // shadowColor: "#1c1917",
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.05,
    // shadowRadius: 10,
    borderRadius: 14,
  },
});
