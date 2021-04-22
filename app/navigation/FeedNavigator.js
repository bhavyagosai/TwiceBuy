import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import FeedScreen from "../screens/FeedScreen";
import ItemScreen from "../screens/ItemScreen";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Feed" component={FeedScreen} />
    <Stack.Screen name="Item" component={ItemScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;
