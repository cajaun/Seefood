import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack, useRouter } from "expo-router";
import "./global.css";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "@/context/auth-context";
import { Text } from "react-native";
import { ActionTrayProvider } from "@/context/action-tray-context";

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

  if (!loaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      <AuthProvider>
      <ActionTrayProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="(auth)"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(root)"
            options={{ headerShown: false, animation: "none" }}
          />
          <Stack.Screen
            name="(modal)/settings"
            options={{
              sheetCornerRadius: 32,
              headerShadowVisible: false,
              presentation: "modal",
              gestureDirection: "vertical",
              animation: "slide_from_bottom",
 
              sheetGrabberVisible: true,
             
              title: "Settings",
              headerTitle: () => (
                <Text
                  style={{
                    fontFamily: "Sf-black",
                    fontSize: 22,
                    paddingTop: 10,

                    color: "#fff",
                  }}
                >
                  Settings
                </Text>
              ),
              headerStyle: {
                backgroundColor: "#161C1B",
              },

              contentStyle: {
                backgroundColor: "#212121",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            }}
          />
        </Stack>
        </ActionTrayProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
