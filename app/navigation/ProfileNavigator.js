import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../screens/ProfileScreen";
import myListingsNavigator from "./myListingsNavigator";

const Stack = createStackNavigator();

const ProfileNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="myListingsNavigator" component={myListingsNavigator} />
  </Stack.Navigator>
);

export default ProfileNavigator;
