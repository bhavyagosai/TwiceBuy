import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import FeedNavigator from "./FeedNavigator";
import ChatScreen from "../screens/ChatScreen";
import FavouritesScreen from "../screens/FavouritesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PostNavigator from "./PostNavigator";
import PostScreenModal from "../components/PostScreenModal";
import colors from "../config/colors";
import AddPostButton from "./AddPostButton";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      showLabel: false,
      style: { backgroundColor: colors.pressing_bg },
    }}
  >
    <Tab.Screen
      name="FeedNavigator"
      component={FeedNavigator}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" size={34} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Chats"
      component={ChatScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="comment" size={34} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="PostNav"
      component={PostNavigator}
      options={({ navigation }) => ({
        tabBarButton: () => (
          <AddPostButton onPress={() => navigation.navigate("PostNav")} />
        ),
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="plus" size={34} color={color} />
        ),
      })}
    />
    <Tab.Screen
      name="Favourite"
      component={FavouritesScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="heart" size={34} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" size={34} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
