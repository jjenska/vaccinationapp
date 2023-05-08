import { createStackNavigator } from "@react-navigation/stack";
import LogIn from "../screens/LogIn";
import SignUp from "../screens/SignUp";
import HomeNavigator from "./HomeNavigator";
import { COLORS } from "../constants";

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LogIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        options={{ headerTintColor: COLORS.primary }}
        name="Welcome"
        component={HomeNavigator}
      />
      <Stack.Screen
        options={{ headerTintColor: COLORS.primary }}
        name="Register"
        component={SignUp}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
