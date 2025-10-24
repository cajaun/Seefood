import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { AnimatedPressable } from "./drawer-button";
import { Text } from "react-native";
import { PressableScale } from "@/components/ui/utils/pressable-scale";

export default function KeyViewButton({
  onPress,
  icon,
  text,
  backgroundColor,
  textColor,
}: {
  onPress: () => void;
  icon?: React.ReactNode;
  text: string;
  backgroundColor: string;
  textColor?: string;
}) {
  const isButtonActive = useSharedValue(false);

  const handlePress = () => {
    onPress();
  };



  const rButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: isButtonActive.value ? 0.96 : 1 }],
  }));

  return (
    < PressableScale
      onPress={handlePress}
      style={[
        {
          flex: 1,
          flexDirection: "row",
          gap: 12,
          paddingVertical: 16,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: backgroundColor,
          borderRadius: 1000,
          borderCurve: "continuous",
        },
        rButtonStyle,
      ]}
    >
      {icon && icon}
      <Text
        style={{  fontSize: 18,
          color: textColor,
          fontFamily: "Sf-black",
          textAlign: "center",}}
      >
        {text}
      </Text>
    </PressableScale>
  );
}
