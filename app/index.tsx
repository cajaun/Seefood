import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/context/auth-context";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const Index = () => {
  const { user, loading } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepareApp = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsReady(true);
    };

    prepareApp();
  }, []);

  useEffect(() => {
    console.log("Initialization status:", { isReady, loading });
    const handleRedirect = async () => {
      if (isReady && !loading) {
        console.log("Hiding splash screen and redirecting...");
        await SplashScreen.hideAsync();
        router.replace(user ? "/(root)" : "/(auth)/welcome");
      }
    };

    handleRedirect();
  }, [isReady, loading, user]);

  if (!isReady || loading) {
    return null;
  }

  return null;
};

export default Index;
