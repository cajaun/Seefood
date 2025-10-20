import {
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Stack } from "expo-router";
import "./global.css";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { AuthProvider } from "@/context/auth-context";

export default function RootLayout() {

  const [loaded] = useFonts({
    "Sf-black": require("../assets/fonts/SF-Pro-Rounded-Black.otf"),
    "Sf-bold": require("../assets/fonts/SF-Pro-Rounded-Bold.otf"),
    "Sf-semibold": require("../assets/fonts/SF-Pro-Rounded-Semibold.otf"),
    "Sf-medium": require("../assets/fonts/SF-Pro-Rounded-Medium.otf"),
    "Sf-regular": require("../assets/fonts/SF-Pro-Rounded-Regular.otf"),
    "Sf-light": require("../assets/fonts/SF-Pro-Rounded-Light.otf"),
    "Sf-thin": require("../assets/fonts/SF-Pro-Rounded-Thin.otf"),
  });
  
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
