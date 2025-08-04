import { View, Text } from "react-native";
import React from "react";

const ChatRoom = () => {
  return (
    <View
      className="flex-1 items-center justify-center 
    bg-background dark:bg-background-dark"
    >
      <Text className="text-foreground dark:text-foreground-dark">
        ChatRoom
      </Text>
    </View>
  );
};

export default ChatRoom;
