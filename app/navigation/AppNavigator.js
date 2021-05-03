import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import FeedNavigator from "./FeedNavigator";
import ChatScreen from "../screens/ChatScreen";
import PostScreenModal from "../components/PostScreenModal";
import colors from "../config/colors";
import AddPostButton from "./AddPostButton";
import FavouritesNavigator from "./FavouritesNavigator";
import ProfileNavigator from "./ProfileNavigator";

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
        tabBarIcon: ({ focused }) => {
          let icon;
          icon = focused ? "home" : "home-outline";
          let color;
          color = focused ? colors.main_fg : colors.main_fg;
          return <MaterialCommunityIcons name={icon} size={34} color={color} />;
        },
      }}
    />
    <Tab.Screen
      name="Chats"
      component={ChatScreen}
      options={{
        tabBarIcon: ({ focused }) => {
          let icon;
          icon = focused ? "comment" : "comment-outline";
          let color;
          color = focused ? colors.main_fg : colors.main_fg;
          return <MaterialCommunityIcons name={icon} size={34} color={color} />;
        },
      }}
    />
    <Tab.Screen
      name="Post"
      component={PostScreenModal}
      options={({ navigation }) => ({
        tabBarButton: () => {
          return (
            <AddPostButton
              onPress={() => navigation.navigate("Post")}
              icon={"plus"}
            />
          );
        },

        tabBarIcon: ({ focused }) => {
          let iconName;
          iconName = focused ? "check" : "plus";
          return (
            <MaterialCommunityIcons name={iconName} size={34} color={color} />
          );
        },
      })}
    />
    <Tab.Screen
      name="FavouritesNavigator"
      component={FavouritesNavigator}
      options={{
        tabBarIcon: ({ focused }) => {
          let icon;
          icon = focused ? "heart" : "heart-outline";
          let color;
          color = focused ? colors.main_fg : colors.main_fg;
          return <MaterialCommunityIcons name={icon} size={34} color={color} />;
        },
      }}
    />
    <Tab.Screen
      name="ProfileNavigator"
      component={ProfileNavigator}
      options={{
        tabBarIcon: ({ focused }) => {
          let icon;
          icon = focused ? "account" : "account-outline";
          let color;
          color = focused ? colors.main_fg : colors.main_fg;
          return <MaterialCommunityIcons name={icon} size={34} color={color} />;
        },
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
