import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Home from "../screens/Home";
import Vaccines from "../screens/Vaccines";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "../constants";
import UserNavigator from "./UserNavigator";

const Tab = createBottomTabNavigator();

function HomeNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarInactiveTintColor: COLORS.primary,
        tabBarActiveTintColor: COLORS.primary,
        tabBarIcon: ({ focused, color }) => {
          let icon;
          if (route.name === "Home") {
            icon = focused ? "home-sharp" : "home-outline";
          } else if (route.name === "Vaccines") {
            icon = focused ? "medkit-sharp" : "medkit-outline";
          } else if (route.name === "Discuss") {
            icon = focused ? "chatbubbles-sharp" : "chatbubbles-outline";
          }
          return <Icon name={icon} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen
        options={{ headerTintColor: COLORS.primary }}
        name="Home"
        component={Home}
      ></Tab.Screen>
      <Tab.Screen
        options={{ headerTintColor: COLORS.primary }}
        name="Vaccines"
        component={Vaccines}
      ></Tab.Screen>
      <Tab.Screen
        name="Discuss"
        component={UserNavigator}
        options={{ headerShown: false }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}

export default HomeNavigator;
