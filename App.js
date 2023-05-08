import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./navigations/AuthNavigator";
import HomeNavigator from "./navigations/HomeNavigator";
import { auth } from "./config/firebase";
import { onAuthStateChanged } from "@firebase/auth";

export default function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(undefined);
        }
      });
      return unsubscribe;
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <NavigationContainer>
      {user ? <HomeNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
