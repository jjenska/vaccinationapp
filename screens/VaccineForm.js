import React from "react";
import { View, StyleSheet, Pressable, Platform } from "react-native";
import { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { COLORS } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { database } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";

/***
 * THIS COMPONENTS IS NOT IN USE
 * ***/

function VaccineForm() {
  const [vaccine, setVaccine] = useState("");
  const [shotDate, setShotDate] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedVaccine, setSelectedVaccine] = useState("");
  const navigation = useNavigation();

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatePicker();
        setShotDate(currentDate.toLocaleDateString());
      }
    } else {
      toggleDatePicker();
    }
  };

  const addNote = async () => {
    await addDoc(collection(database, "notes"), {
      vaccine: vaccine,
      date: shotDate,
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <Picker
          selectedValue={selectedVaccine}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedVaccine(itemValue)
          }
        >
          <Picker.Item label="Havrix" value="havrix" />
          <Picker.Item label="Twinrix" value="twinrix" />
        </Picker>
        {showPicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={date}
            onChange={onChange}
            locale="fi"
          ></DateTimePicker>
        )}
        <TextInput
          label="Vaccine"
          onChangeText={(vaccine) => setVaccine(vaccine)}
          mode="outlined"
          placeholder="Insert a vaccine"
        />
        {!showPicker && (
          <Pressable onPress={toggleDatePicker}>
            <TextInput
              label="Date"
              value={shotDate}
              onChangeText={setShotDate}
              mode="outlined"
              placeholder="Pick a date"
              editable={false}
            />
          </Pressable>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          textColor={COLORS.primary}
          style={styles.button}
          mode="text"
          onPress={() => navigation.goBack()}
        >
          Cancel
        </Button>
        <Button
          textColor={COLORS.primary}
          style={styles.button}
          mode="text"
          onPress={addNote}
        >
          Add
        </Button>
      </View>
    </View>
  );
}

export default VaccineForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
  },
  input: {
    width: 350,
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
