import { StyleSheet, Text, View } from "react-native";
import COLORS from "../constants/color";

export default function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    color: COLORS.text.main,
    fontSize: 24,
    // fontWeight: "700",
    borderWidth: 2,
    borderColor: COLORS.text.light,
    padding: 16,
    fontFamily: "open-sans-bold",
  },
});
