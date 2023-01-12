import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import SplashScreen from "react-native-splash-screen";
import COLORS from "./src/constants/color";
import GameOver from "./src/screens/GameOver";
import GameScreen from "./src/screens/GameScreen";
import StartGameScreen from "./src/screens/StartGameScreen";

export default function App() {
  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  const { height } = useWindowDimensions();

  const [userNumber, setUserNumber] = useState("");
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessedRounds, setGuessedRounds] = useState(0);

  const pickedNumberHandler = (number) => {
    setUserNumber(number);
    setGameIsOver(false);
  };

  const gameOverHandler = (rounds) => {
    setGameIsOver(true);
    setGuessedRounds(rounds);
  };

  const startNewGameHandler = () => {
    setUserNumber("");
    setGuessedRounds(0);
  };

  if (!fontsLoaded) return null;

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = (
      <GameScreen pickedNumber={userNumber} onGameOver={gameOverHandler} />
    );
    if (gameIsOver) {
      screen = (
        <GameOver
          roundsNumber={guessedRounds}
          pickedNumber={userNumber}
          onStartNewGame={startNewGameHandler}
        />
      );
    }
  }

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        style={styles.root}
        colors={[COLORS.primary[500], COLORS.primary[100]]}
      >
        <ImageBackground
          style={styles.root}
          imageStyle={styles.imageBackground}
          resizeMode="cover"
          source={require("./assets/images/background.png")}
        >
          <SafeAreaView
            style={[styles.root, styles.view, { marginTop: height * 0.075 }]}
          >
            {screen}
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  view: {
    marginHorizontal: 16,
  },
  imageBackground: {
    opacity: 0.3,
  },
});
