import { useAuth, useUser } from "@clerk/clerk-expo";
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

const ChatsLayout = () => {
  const { user } = useUser();
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady && !isSignedIn) {
      // @ts-ignore
      router.replace("/auth");
    }
  }, [isReady, isSignedIn, router]);

  if (!isReady) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ChatsLayout;
