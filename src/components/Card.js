import React from "react";
import { StyleSheet, View } from "react-native";
import COLORS from "../constants/color";

export default function Card({ children }) {
  return <View style={styles.root}>{children}</View>;
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    marginTop: 24,
    padding: 16,
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: COLORS.primary[500],
    backgroundColor: COLORS.primary[200],
    // for ios
    shadowColor: "black",
    shadowOffset: { height: 2, width: 0 },
    shadowRadius: 4,
    shadowOpacity: 0.4,
    // for android
    elevation: 4,
  },
});
