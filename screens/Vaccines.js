import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { database } from "../config/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import VaccineCard from "../components/VaccineCard";
import { COLORS } from "../constants";

function Vaccines() {
  const [vaccines, setVaccines] = useState([]);

  useEffect(() => {
    const collectionRef = collection(database, "vaccines");
    const q = query(collectionRef, orderBy("name"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setVaccines(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          duration: doc.data().duration,
          effects: doc.data().effects,
          manufacturer: doc.data().manufacturer,
          vaccName: doc.data().name,
          purpose: doc.data().purpose,
          storage: doc.data().storage,
          usage: doc.data().usage,
        }))
      );
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.vaccineContainer}>
      <FlatList
        data={vaccines}
        renderItem={({ item }) => <VaccineCard item={item} />}
      />
    </View>
  );
}

export default Vaccines;

const styles = StyleSheet.create({
  vaccineContainer: {
    flex: 1,
    backgroundColor: COLORS.lightSpearmint,
  },
  purpose: {
    fontStyle: "italic",
  },
  title: {
    fontStyle: "italic",
  },
});
