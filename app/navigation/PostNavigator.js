import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PostScreenModal from "../components/PostScreenModal";
import PostScreenNavBar from "../components/PostScreenNavBar";
import ModalSubmitButton from "../components/ModalSubmitButton";
import ModalView from "../components/ModalView";
import ImagePickerCard from "../components/ImagePickerCard";

const Stack = createStackNavigator();

const PostNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} mode="card">
    <Stack.Screen name="Post" component={PostScreenModal} />
    <Stack.Screen name="Modal" component={ModalView} />
  </Stack.Navigator>
);

export default PostNavigator;
