import { React, useState, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { COLORS } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function LogIn() {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const navigation = useNavigation();

  /*
  Handling firebase auth errors, all codes found at: 
  https://firebase.google.com/docs/reference/js/auth#autherrorcodes 
  */
  const authCodeToMsg = (authCode) => {
    switch (authCode) {
      case "auth/invalid-email":
        return "Please check your email.";
      case "auth/missing-password":
        return "Please insert your password.";
      case "auth/wrong-password":
        return "Inserted password was incorrect.";
      case "auth/user-not-found":
        return "User not found.";
      default:
        return "";
    }
  };

  const handleLogIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error) {
      setErrorMsg(authCodeToMsg(error.code));
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/LOGO.png")} />
      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
      <View style={styles.input}>
        <TextInput
          label="Email"
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
          mode="outlined"
        />
        <TextInput
          label="Password"
          value={value.password}
          onChangeText={(text) => setValue({ ...value, password: text })}
          mode="outlined"
          secureTextEntry={true}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          textColor={COLORS.primary}
          style={styles.button}
          mode="text"
          onPress={handleLogIn}
        >
          Login
        </Button>
        <Text>Don't have an account?</Text>
        <Button
          textColor={COLORS.primary}
          style={styles.button}
          mode="text"
          onPress={() => navigation.navigate("Register")}
        >
          Register
        </Button>
      </View>
    </View>
  );
}
export default LogIn;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    alignItems: "center",
  },
  logo: {
    height: 230,
    width: 200,
    marginRight: 20,
    marginTop: 60,
  },
  error: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
  input: {
    width: 350,
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
