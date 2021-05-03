import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import FavouritesScreen from "../screens/FavouritesScreen";
import ItemScreen from "../screens/ItemScreen";

const Stack = createStackNavigator();

const FavouritesNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Favourites" component={FavouritesScreen} />
    <Stack.Screen name="Item" component={ItemScreen} />
  </Stack.Navigator>
);

export default FavouritesNavigator;
