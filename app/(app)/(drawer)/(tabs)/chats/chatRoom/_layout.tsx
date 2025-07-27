import { ChatRoomPresenceProvider } from "@/contexts/ChatRoomPresenceContext";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";

const ChatRoomLayout = () => {
  const { id } = useLocalSearchParams();

  return (
    <ChatRoomPresenceProvider roomId={id as string}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </ChatRoomPresenceProvider>
  );
};

export default ChatRoomLayout;
