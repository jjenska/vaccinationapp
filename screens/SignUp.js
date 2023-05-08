import { React, useState } from "react";
import { Image, StyleSheet, View, ScrollView } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { COLORS } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { auth, database } from "../config/firebase";
import { setDoc, doc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

function SignUp() {
  const [value, setValue] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const navigation = useNavigation();

  // handling firebase auth errors
  const authCodeToMsg = (authCode) => {
    switch (authCode) {
      case "auth/invalid-email":
        return "Please check you email";
      case "auth/weak-password":
        return "Password must be at least six characters";
      case "auth/email-already-exists":
        return "Inserted email already exists!";
      default:
        return "";
    }
  };

  const createUser = () => {
    if (value.password !== value.confirmPassword) {
      return setErrorMsg("The inserted passwords do not match.");
    }
    createUserWithEmailAndPassword(
      auth,
      value.email,
      value.password,
      value.confirmPassword
    )
      .then((userCredentials) => {
        const user = userCredentials._tokenResponse.email;
        const uid = auth.currentUser.uid;
        // creating & adding a registered user to collection "users"
        setDoc(doc(database, "users", `${uid}`), {
          email: user,
          username: value.username,
        });
        updateProfile(auth.currentUser, {
          displayName: value.username,
        });
        signOut(auth);
        navigation.navigate("Login");
      })
      .catch((error) => {
        setErrorMsg(authCodeToMsg(error.code));
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image style={styles.logo} source={require("../assets/LOGO.png")} />
        {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
        <View style={styles.input}>
          <TextInput
            label="Insert a username"
            value={value.username}
            onChangeText={(text) => setValue({ ...value, username: text })}
            mode="outlined"
          />
          <TextInput
            label="Insert your email"
            value={value.email}
            onChangeText={(text) => setValue({ ...value, email: text })}
            mode="outlined"
          />
          <TextInput
            label="Insert password"
            value={value.password}
            onChangeText={(text) => setValue({ ...value, password: text })}
            mode="outlined"
            secureTextEntry={true}
          />
          <TextInput
            label="Confirm password"
            value={value.confirmPassword}
            onChangeText={(text) =>
              setValue({ ...value, confirmPassword: text })
            }
            mode="outlined"
            secureTextEntry={true}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            textColor={COLORS.primary}
            style={styles.button}
            mode="text"
            disabled={
              !value.username ||
              !value.email ||
              !value.password ||
              !value.confirmPassword
            }
            onPress={createUser}
          >
            Sign up
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

export default SignUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
  },
  logo: {
    height: 230,
    width: 200,
    marginLeft: 60,
  },
  error: {
    color: COLORS.primary,
  },
  input: {
    width: 350,
    marginTop: 10,
  },

  buttonContainer: {
    marginTop: 20,
  },
});
