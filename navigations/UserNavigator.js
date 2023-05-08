import { createStackNavigator } from "@react-navigation/stack";
import Chat from "../screens/Chat";

const UserStack = createStackNavigator();

function UserNavigator() {
  return (
    <UserStack.Navigator>
      <UserStack.Screen
        options={{ headerShown: false }}
        name="Chat"
        component={Chat}
      />
    </UserStack.Navigator>
  );
}

export default UserNavigator;
