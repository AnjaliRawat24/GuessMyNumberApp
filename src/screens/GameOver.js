import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import Button from "../components/Button";
import Title from "../components/Title";
import COLORS from "../constants/color";

// const deviceWidth = Dimensions.get("window").width;

export default function GameOver({
  roundsNumber,
  pickedNumber,
  onStartNewGame,
}) {
  const { width, height } = useWindowDimensions();
  const imageWidth = width > height ? height / 3 : width;

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.root}>
        <Title>GAME OVER!!!</Title>
        <View
          style={[
            styles.imageContainer,
            {
              borderRadius: imageWidth / 3,
              width: imageWidth / 1.5,
              height: imageWidth / 1.5,
            },
          ]}
        >
          <Image
            style={styles.image}
            source={require("../../assets/images/success.png")}
          />
        </View>
        <Text style={styles.subtitle}>
          Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{" "}
          rounds to guess number{" "}
          <Text style={styles.highlight}>{pickedNumber}</Text>
        </Text>
        <Button onPress={onStartNewGame}>Start New Game!</Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    borderColor: COLORS.text.light,
    borderWidth: 1,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  subtitle: {
    color: COLORS.text.light,
    fontFamily: "open-sans",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 16,
  },
  highlight: {
    color: COLORS.accent[500],
    // color: COLORS.primary[400],
    fontFamily: "open-sans-bold",
  },
});
