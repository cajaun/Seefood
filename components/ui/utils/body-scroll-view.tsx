import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { forwardRef } from "react";
import { ScrollView, ScrollViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export function useBottomTabOverflow() {
  let tabHeight = 0;
  try {
    tabHeight = useBottomTabBarHeight();
  } catch {}
  const { bottom } = useSafeAreaInsets();
  return tabHeight - bottom;
}

export function useTopTabOverflow() {
  let tabHeight = 0;
  try {
    tabHeight = useBottomTabBarHeight();
  } catch {}
  const { top} = useSafeAreaInsets();
  return tabHeight + top;
}

export const BodyScrollView = forwardRef<any, ScrollViewProps>((props, ref) => {
  const paddingBottom = useBottomTabOverflow();
  return (
    <ScrollView
      automaticallyAdjustsScrollIndicatorInsets
      contentInsetAdjustmentBehavior="automatic"
      contentInset={{ bottom: paddingBottom }}
      scrollIndicatorInsets={{ bottom: paddingBottom }}
      {...props}
      ref={ref}
    />
  );
});

