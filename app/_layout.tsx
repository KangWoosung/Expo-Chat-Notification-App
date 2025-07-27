import "@/styles/global.css";
import { resourceCache } from "@clerk/clerk-expo/resource-cache";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import { PushTokenProvider } from "@/contexts/PushTokenProvider";
import SupabaseProvider from "@/contexts/SupabaseProvider";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      __experimental_resourceCache={resourceCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || ""}
    >
      <ClerkLoaded>
        <SupabaseProvider>
          <PushTokenProvider>
            <GestureHandlerRootView>
              <SafeAreaProvider>
                {/* <SafeAreaView> */}
                <ThemeProvider
                  value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
                >
                  <Stack
                    initialRouteName="auth"
                    screenOptions={{
                      headerShown: false,
                    }}
                  >
                    <Stack.Screen name="(app)" />
                    <Stack.Screen name="auth" />
                    <Stack.Screen name="+not-found" />
                  </Stack>
                  <StatusBar style="auto" />
                </ThemeProvider>
              </SafeAreaProvider>
            </GestureHandlerRootView>
          </PushTokenProvider>
        </SupabaseProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
