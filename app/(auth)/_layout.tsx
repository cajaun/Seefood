import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false, animation: "none" }} />
    </Stack>
  );
};

export default Layout;