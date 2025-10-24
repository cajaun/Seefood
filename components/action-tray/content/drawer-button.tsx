import { PressableScale } from "@/components/ui/utils/pressable-scale";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import * as Haptic from "expo-haptics";

export const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function DrawerButton({
  onPress,
  backgroundColor,
  icon,
  label,
  textColor = "#000",
  customStyles,
}: {
  onPress: () => void;
  backgroundColor: string;
  icon?: React.ReactNode;
  label: string;
  textColor?: string;
  customStyles?: object;
}) {
  const isButtonActive = useSharedValue(false);

  const handlePress = () => {
    Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Light);
    onPress();
  };

  const rButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: isButtonActive.value ? 0.96 : 1 }],
  }));

  return (
    <PressableScale
    style={[
      {
        backgroundColor,
        width: SCREEN_WIDTH - 58, 
      },
      styles.buttonContainer,
      rButtonStyle,
      customStyles,
    ]}
    onPress={handlePress}
  >
      {icon}
      <View>
        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            fontSize: 18,
            color: textColor,
            fontFamily: "Sf-black",
            textAlign: "center",
          }}
        >
          {label}
        </Text>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderCurve: "continuous",
    alignItems: "center",
    textAlign: "center",
  },
});
