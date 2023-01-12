import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import COLORS from "../constants/color";

export default function Button({
  style = {},
  variant = "primary",
  children,
  onPress,
  rounded,
}) {
  return (
    <View style={[styles.button, style, rounded ? styles.rounded : {}]}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) =>
          pressed ? [styles[variant], styles.pressedButton] : styles[variant]
        }
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    margin: 4,
    overflow: "hidden",
  },
  primary: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary[500],
    borderRadius: 24,
    padding: 12,
    elevation: 4,
  },
  secondary: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary[100],
    borderRadius: 8,
    elevation: 4,
  },
  pressedButton: {
    opacity: 0.75,
  },
  buttonText: {
    color: COLORS.text.main,
    fontWeight: "500",
  },
  rounded: {
    borderRadius: 20,
    height: 40,
    width: 40,
  },
});
