import { useState } from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Button from "../components/Button";
import COLORS from "../constants/color";
import Title from "../components/Title";
import Card from "../components/Card";

const StartGameScreen = ({ onPickNumber }) => {
  const [enteredNumber, setEnteredNumber] = useState("");

  const resetHandler = () => {
    setEnteredNumber("");
  };

  return (
    <ScrollView styles={styles.view}>
      <KeyboardAvoidingView style={styles.view} behavior="position">
        <View style={styles.container}>
          <Title>Guess My Number!</Title>
          <Card>
            <Text style={styles.instructionText}>Let's Get Started...</Text>
            <Text style={styles.instructionText}>(Pick a number)</Text>
            <TextInput
              style={styles.input}
              maxLength={2}
              keyboardType="number-pad"
              value={enteredNumber}
              onChangeText={(number) => setEnteredNumber(number)}
            />
            <View style={styles.buttons}>
              <Button style={styles.button} onPress={resetHandler}>
                Reset
              </Button>
              <Button
                style={styles.button}
                onPress={() => {
                  const chosenNumber = parseInt(enteredNumber, 10);
                  if (
                    isNaN(chosenNumber) ||
                    chosenNumber <= 0 ||
                    chosenNumber > 99
                  ) {
                    Alert.alert(
                      "Invalid Number",
                      "Please enter a number between 1 & 99",
                      [
                        {
                          text: "OK",
                          style: "destructive",
                          onPress: resetHandler,
                        },
                      ]
                    );
                    return;
                  }
                  onPickNumber(chosenNumber);
                  //
                }}
              >
                Confirm
              </Button>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
  view: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  input: {
    width: "25%",
    padding: 8,
    color: COLORS.text.light,
    fontSize: 32,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.text.light,
    textAlign: "center",
    marginBottom: 16,
  },
  buttons: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
  },
  instructionText: {
    fontSize: 24,
    fontWeight: "500",
    color: COLORS.accent[500],
    textAlign: "center",
    fontFamily: "open-sans",
  },
});

export default StartGameScreen;
