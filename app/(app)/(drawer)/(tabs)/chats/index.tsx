import { View, Text, Button } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import tailwindColors from "@/utils/tailwindColors";

const ChatsIndex = () => {
  return (
    <View
      className="flex-1 items-center justify-center 
    bg-background dark:bg-background-dark"
    >
      <View className="gap-4">
        <Text className="text-foreground dark:text-foreground-dark">
          ChatsIndex
        </Text>
        {/* @ts-ignore */}
        <Button
          title="ChatRoom"
          onPress={() => router.push("/(stack)/chat_room")}
          color={tailwindColors.primary.DEFAULT}
        />
      </View>
    </View>
  );
};

export default ChatsIndex;
