import React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Card, Text, Button, Paragraph } from "react-native-paper";
import { COLORS } from "../constants";

const VaccineCard = ({ item }) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <Card mode="outlined" style={styles.vaccineContainer} title={item.vaccName}>
      <Card.Title
        titleStyle={{ fontWeight: "bold", color: COLORS.primary }}
        title={item.vaccName}
        subtitle={item.manufacturer}
        subtitleStyle={{ fontStyle: "italic", color: COLORS.primary }}
      />
      <Card.Content>
        <Text style={styles.purpose} variant="bodyMedium">
          {item.purpose}
        </Text>
        <Paragraph numberOfLines={showMore ? 0 : 2}>
          {item.usage} {"\n"}
          <Text style={styles.effects}>
            Common side effects: {item.effects}
          </Text>
          {"\n"}
          <Text>Storage: {item.storage}</Text>
          {"\n"}
          <Text>Duration: {item.duration}</Text>
        </Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button
          style={styles.button}
          mode="text"
          onPress={() => setShowMore(!showMore)}
          textColor={COLORS.primary}
        >
          {showMore ? "Show Less" : "Show More"}{" "}
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default VaccineCard;

const styles = StyleSheet.create({
  vaccineContainer: {
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: COLORS.white,
  },
  purpose: {
    fontWeight: "bold",
    color: COLORS.spearmint,
  },
});
