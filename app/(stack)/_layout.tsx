import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import tailwindColors from "@/utils/tailwindColors";
import { useNavigationState } from "@react-navigation/native";
import { useColorScheme } from "nativewind";

const StackLayout = () => {
  const state = useNavigationState((state) => state);

  const currentRouteName =
    state.routes[state.index]?.state?.routes?.[
      state.routes[state.index]?.state?.index || 0
    ]?.name || "";
  console.log(currentRouteName);

  const hideTabBarScreens = ["chats/chat_room"]; // 여기에 숨기고 싶은 화면 이름 추가

  const shouldHideTabBar = hideTabBarScreens.includes(currentRouteName);

  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const backgroundTheme =
    tailwindColors.background[isDark ? "secondaryDark" : "secondary"];
  const foregroundTheme =
    tailwindColors.foreground[isDark ? "secondaryDark" : "secondary"];

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: backgroundTheme,
        },
        headerTitleStyle: {
          color: foregroundTheme,
        },
      }}
    >
      <Stack.Screen name="chats/chat_room" />
    </Stack>
  );
};

export default StackLayout;
