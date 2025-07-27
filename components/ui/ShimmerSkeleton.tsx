/*
2025-07-25 18:06:57
https://www.youtube.com/watch?v=WqZzqKQq-rM&ab_channel=CodeSpring


*/

import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

const ShimmerView = () => {
  const { width } = Dimensions.get("screen");
  const translateX = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: width,
        duration: 1500,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.box} />
        <View style={[styles.box, styles.box2]} />
        <View style={[styles.box, styles.box3]} />
        <Animated.View
          style={[styles.shimmer, { transform: [{ translateX }] }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    margin: 10,
    borderRadius: 8,
  },
  box: {
    height: 80,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginBottom: 6,
  },
  box2: {
    width: "60%",
    height: 20,
  },
  box3: {
    width: "80%",
    height: 40,
    marginBottom: 0,
  },
  shimmer: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    height: "100%",
    width: "100%",
    position: "absolute",
    top: 15,
    left: 10,
  },
});

export default ShimmerView;
