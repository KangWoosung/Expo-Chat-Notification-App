import { useFocusEffect } from "@react-navigation/native";
import { Image } from "expo-image";
import * as Notifications from "expo-notifications";
import React, { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
// import { useNotification } from "@/hooks/useNotification";
// import { usePushTokenSyncSupabase } from "@/hooks/usePushTokenSyncSupabase";

export default function HomeScreen() {
  // 푸시 토큰 동기화 훅 사용
  // usePushTokenSyncSupabase();

  // const { expoPushToken, notification, error, isLoading, isCachedToken } =
  //   useNotification();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [isCachedToken, setIsCachedToken] = useState(false);
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);

  // 각 텍스트를 위한 독립적인 shared values
  const firstOpacity = useSharedValue(0);
  const firstScale = useSharedValue(0.5);
  const firstTranslateY = useSharedValue(50);

  const secondOpacity = useSharedValue(0);
  const secondScale = useSharedValue(0.5);
  const secondTranslateY = useSharedValue(50);

  const thirdOpacity = useSharedValue(0);
  const thirdScale = useSharedValue(0.5);
  const thirdTranslateY = useSharedValue(50);

  // 첫 번째 텍스트 애니메이션 스타일
  const firstTextAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: firstOpacity.value,
      transform: [
        { scale: firstScale.value },
        { translateY: firstTranslateY.value },
      ],
    };
  });

  // 두 번째 텍스트 애니메이션 스타일
  const secondTextAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: secondOpacity.value,
      transform: [
        { scale: secondScale.value },
        { translateY: secondTranslateY.value },
      ],
    };
  });

  // 세 번째 텍스트 애니메이션 스타일
  const thirdTextAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: thirdOpacity.value,
      transform: [
        { scale: thirdScale.value },
        { translateY: thirdTranslateY.value },
      ],
    };
  });

  // 애니메이션 시작 함수
  const startAnimation = () => {
    // 초기 상태로 리셋
    firstOpacity.value = 0;
    firstScale.value = 0.5;
    firstTranslateY.value = 50;

    secondOpacity.value = 0;
    secondScale.value = 0.5;
    secondTranslateY.value = 50;

    thirdOpacity.value = 0;
    thirdScale.value = 0.5;
    thirdTranslateY.value = 50;

    // 첫 번째 텍스트 애니메이션 (즉시 시작)
    firstOpacity.value = withTiming(1, { duration: 800 });
    firstScale.value = withSpring(1, { damping: 10, stiffness: 100 });
    firstTranslateY.value = withSpring(0, { damping: 10, stiffness: 100 });

    // 두 번째 텍스트 애니메이션 (0.3초 지연)
    setTimeout(() => {
      secondOpacity.value = withTiming(1, { duration: 800 });
      secondScale.value = withSpring(1, { damping: 10, stiffness: 100 });
      secondTranslateY.value = withSpring(0, { damping: 10, stiffness: 100 });
    }, 300);

    // 세 번째 텍스트 애니메이션 (0.6초 지연)
    setTimeout(() => {
      thirdOpacity.value = withTiming(1, { duration: 800 });
      thirdScale.value = withSpring(1, { damping: 10, stiffness: 100 });
      thirdTranslateY.value = withSpring(0, { damping: 10, stiffness: 100 });
    }, 600);
  };

  // 화면이 포커스될 때마다 애니메이션 시작
  useFocusEffect(
    React.useCallback(() => {
      startAnimation();
    }, [])
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>

      {/* 푸시 토큰 정보 표시 */}
      <ThemedView style={styles.tokenContainer}>
        <ThemedText type="subtitle">Push Token Status</ThemedText>
        {isLoading ? (
          <ThemedText>Loading...</ThemedText>
        ) : error ? (
          <ThemedText>Error: {error.message}</ThemedText>
        ) : (
          <>
            <ThemedText>Token: {expoPushToken?.substring(0, 20)}...</ThemedText>
            <ThemedText>
              Cache Status: {isCachedToken ? "Cached" : "Fresh"}
            </ThemedText>
            {notification && (
              <ThemedText>
                Latest: {notification.request.content.title}
              </ThemedText>
            )}
          </>
        )}
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
          to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: "cmd + d",
              android: "cmd + m",
              web: "F12",
            })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <View className="bg-red-500 p-4 rounded-lg gap-4">
        <Animated.Text
          className="text-white text-lg font-bold"
          style={firstTextAnimatedStyle}
        >
          Hello 이모네!
        </Animated.Text>
        <Animated.Text
          className="text-gray-500 text-lg font-bold"
          style={secondTextAnimatedStyle}
        >
          Hello 삼모네!
        </Animated.Text>
        <Animated.Text
          className="text-gray-800 text-lg font-bold"
          style={thirdTextAnimatedStyle}
        >
          Hello 사모네!
        </Animated.Text>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    width: 300,
    height: 300,
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  tokenContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 20,
    borderRadius: 8,
    padding: 16,
  },
  stepContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
