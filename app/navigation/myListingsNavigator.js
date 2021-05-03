import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ItemScreen from "../screens/ItemScreen";
import myListingsScreen from "../screens/myListingsScreen";

const Stack = createStackNavigator();

const myListingsNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="myListings" component={myListingsScreen} />
    <Stack.Screen name="Item" component={ItemScreen} />
  </Stack.Navigator>
);

export default myListingsNavigator;
