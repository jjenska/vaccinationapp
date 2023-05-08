import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { COLORS } from "../constants";

function Home() {
  const user = auth.currentUser;
  return (
    <View style={styles.container}>
      <View style={styles.textbox}>
        <Text style={styles.text}>Welcome to shotCheck</Text>
        <Text style={styles.text}>{user?.displayName}</Text>
        <Text style={styles.text}>{user?.email}</Text>
      </View>
      <View style={styles.textbox}>
        <Text style={styles.text}>
          In shotCheck you can find information about vaccines and chat with
          other users.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          textColor={COLORS.primary}
          mode="text"
          onPress={() => signOut(auth)}
        >
          Log Out
        </Button>
      </View>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
  },
  textbox: {
    marginTop: 20,
    width: "80%",
    height: "20%",
    backgroundColor: COLORS.lightSpearmint,
    alignItems: "center",
    justifyContent: "center",
    borderBottomStartRadius: 6,
    borderBottomEndRadius: 6,
    borderTopEndRadius: 6,
    borderTopStartRadius: 6,
  },
  text: {
    color: COLORS.primary,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
