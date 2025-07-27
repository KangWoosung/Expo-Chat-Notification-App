import React from "react";
import { StyleSheet, Text, View } from "react-native";

type DividerProps = {
  text: string;
};

const Divider = ({ text }: DividerProps) => {
  return (
    <View style={styles.dividerContainer}>
      <View style={styles.line} />
      <Text style={styles.dividerText}>{text}</Text>
      <View style={styles.line} />
    </View>
  );
};

export default Divider;

const styles = StyleSheet.create({
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
    paddingHorizontal: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB", // gray-200
  },
  dividerText: {
    marginHorizontal: 12,
    color: "#6B7280", // gray-500
    fontSize: 14,
  },
});
