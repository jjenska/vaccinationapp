import React, { useState, useEffect } from "react";
import { Button } from "react-native-paper";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants";
import { auth } from "../config/firebase";
import { database } from "../config/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

/***
 * THIS COMPONENTS IS NOT IN USE
 * ***/

function Details() {
  const [notes, setNotes] = useState([]);
  const navigation = useNavigation();
  const user = auth.currentUser;

  useEffect(() => {
    const collectionRef = collection(database, "notes");
    const q = query(collectionRef, orderBy("date"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setNotes(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          vaccine: doc.data().vaccine,
          date: doc.data().date,
        }))
      );
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text>{user?.displayName}</Text>
      <View style={styles.buttonContainer}>
        <Button
          textColor={COLORS.primary}
          mode="text"
          onPress={() => navigation.navigate("VaccineForm")}
        >
          Add
        </Button>
        <View style={styles.vaccineContainer}>
          <FlatList
            data={notes}
            renderItem={({ item }) => (
              <Text>
                {item.vaccine} {item.date}
              </Text>
            )}
          />
        </View>
      </View>
    </View>
  );
}

export default Details;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 20,
  },
});
