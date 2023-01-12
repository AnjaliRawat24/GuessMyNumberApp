import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import Title from "../components/Title";
import { useEffect, useState } from "react";
import COLORS from "../constants/color";
import Button from "../components/Button";
import Card from "../components/Card";
import { Ionicons } from "@expo/vector-icons";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

export default function GameScreen({ pickedNumber, onGameOver }) {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, pickedNumber)
  );

  const { width, height } = useWindowDimensions();
  const [guessedRounds, setGuessedRounds] = useState([]);

  const guessNewNumber = (direction) => {
    if (
      (direction === "lower" && currentGuess < pickedNumber) ||
      (direction === "greater" && currentGuess > pickedNumber)
    ) {
      Alert.alert("Don't Lie!", "You know that this is wrong!", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newGuess = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );

    setCurrentGuess(newGuess);
    setGuessedRounds((prev) => [currentGuess, ...prev]);
  };

  useEffect(() => {
    if (currentGuess === pickedNumber) {
      onGameOver(guessedRounds.length);
    }
  }, [currentGuess]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  return (
    <View style={styles.root}>
      <Title>Opponent's Guess</Title>
      <View style={{ flexDirection: "row" }}>
        {width > height && (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Button
              variant="secondary"
              rounded
              onPress={() => guessNewNumber("lower")}
            >
              <Ionicons name="md-remove" size={24} color={COLORS.text.main} />
            </Button>
          </View>
        )}
        <View style={styles.guessedNumber}>
          <Text style={styles.guessedNumberText}>{currentGuess}</Text>
        </View>
        {width > height && (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Button
              variant="secondary"
              rounded
              onPress={() => guessNewNumber("greater")}
            >
              <Ionicons name="md-add" size={24} color={COLORS.text.main} />
            </Button>
          </View>
        )}
      </View>
      {width < height && (
        <Card>
          <Text style={styles.instructionText}>Higher or Lower?</Text>
          <View style={styles.buttons}>
            <Button
              variant="secondary"
              rounded
              onPress={() => guessNewNumber("lower")}
            >
              <Ionicons name="md-remove" size={24} color={COLORS.text.main} />
            </Button>
            <Button
              variant="secondary"
              rounded
              onPress={() => guessNewNumber("greater")}
            >
              <Ionicons name="md-add" size={24} color={COLORS.text.main} />
            </Button>
          </View>
        </Card>
      )}
      <FlatList
        style={styles.roundsContainer}
        data={guessedRounds}
        renderItem={({ item, index }) => (
          <View style={styles.roundContainer}>
            <Text style={styles.roundsText}>
              Round #{guessedRounds.length - index}
            </Text>
            <Text style={styles.roundText}>
              Opponent Guessed: <Text style={styles.whiteText}>{item}</Text>
            </Text>
          </View>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 16,
    flex: 1,
  },
  guessedNumber: {
    borderWidth: 4,
    borderColor: COLORS.text.light,
    padding: 24,
    borderRadius: 8,
    margin: 24,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  guessedNumberText: {
    color: COLORS.accent[500],
    fontWeight: "bold",
    fontSize: 48,
  },
  buttons: {
    flexDirection: "row",
    marginTop: 16,
  },
  instructionText: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text.light,
    textAlign: "center",
    fontFamily: "open-sans",
  },
  roundsContainer: {
    flex: 1,
  },
  roundContainer: {
    padding: 16,
    backgroundColor: COLORS.primary[100],
    borderWidth: 0.5,
    marginTop: 16,
    borderColor: COLORS.primary[500],
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  roundsText: {
    color: COLORS.primary[400],
    fontFamily: "open-sans-bold",
  },
  roundText: {
    color: COLORS.primary[400],
    fontFamily: "open-sans",
  },
  whiteText: {
    color: COLORS.text.main,
    fontFamily: "open-sans-bold",
  },
});
