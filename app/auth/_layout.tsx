import { useAuth } from "@clerk/clerk-expo";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("================================================");
    console.log("auth/_layout.tsx isSignedIn", isSignedIn);
    if (isSignedIn) {
      // @ts-ignore
      router.replace("/(app)");
    }
    return () => {
      console.log("====auth/_layout.tsx unmounted======");
    };
  }, [isSignedIn, router]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="signin"
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="signin" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="signout" />
      <Stack.Screen name="signoff" />
    </Stack>
  );
}
