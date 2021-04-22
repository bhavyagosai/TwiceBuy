import React, { useEffect } from "react";

import {
  View,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { Shadow } from "react-native-shadow-2";
import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

// *IMPORT COLORS* //
import colors from "../config/colors";

function ImagePickerCard({
  imageURI,
  renderType,
  onChangeImage,
  setImageArray,
  setImagePicker,
}) {
  useEffect(() => {
    requestPermission();
  });
  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted)
      alert("You need to enable permissions to access the Library!");
  };

  const handlePress = () => {
    if (!imageURI) {
      selectImage();
    } else
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        { text: "Yes", onPress: () => onChangeImage(null) },
        { text: "No" },
      ]);
  };

  const selectImage = async () => {
    try {
      const selected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!selected.cancelled) onChangeImage(selected.uri);
    } catch (error) {
      console.log("Error reading the image!", error);
    }
  };

  // *MAIN CODE* //
  if (imageURI == null) {
    if (renderType == "small") {
      // *SMALL IMAGE PICKER* //
      return (
        <View style={styles.container}>
          <Shadow distance={10} startColor={"#00000017"} radius={25}>
            <TouchableNativeFeedback
              onPress={handlePress}
              background={TouchableNativeFeedback.Ripple(colors.pressing_bg)}
            >
              <View
                style={[
                  styles.smallCard,
                  { backgroundColor: colors.placeholder },
                ]}
              >
                <FontAwesome5 name="camera" size={36} color={colors.main_fg} />
              </View>
            </TouchableNativeFeedback>
          </Shadow>
        </View>
      );
    } else {
      // *ORIGINAL IMAGE PICKER* //
      return (
        <View style={{ width: "100%", marginBottom: 20 }}>
          <Shadow distance={10} startColor={"#00000017"} radius={25}>
            <TouchableNativeFeedback
              onPress={() => {
                handlePress();
                setImageArray(true);
                setImagePicker(false);
              }}
              background={TouchableNativeFeedback.Ripple(colors.pressing_bg)}
            >
              <View style={styles.pickerCard}>
                <FontAwesome5 name="camera" size={36} color={colors.main_fg} />
              </View>
            </TouchableNativeFeedback>
          </Shadow>
        </View>
      );
    }
  } else {
    // *IMAGE CONTAINER* //
    return (
      <View style={styles.container}>
        <Shadow distance={10} startColor={"#00000017"} radius={20}>
          <TouchableWithoutFeedback onPress={handlePress}>
            <View style={styles.smallCard}>
              <View style={styles.imageContainer}>
                {imageURI && (
                  <Image style={styles.image} source={{ uri: imageURI }} />
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Shadow>
      </View>
    );
  }
}

// *LOCAL STYLES DEFINITIONS* //

const styles = StyleSheet.create({
  container: {
    width: 150,
    marginBottom: 20,
    marginRight: 20,
  },
  pickerCard: {
    height: 200,
    width: "100%",
    borderRadius: 20,
    backgroundColor: colors.placeholder,
    justifyContent: "center",
    alignItems: "center",
  },
  smallCard: {
    height: 200,
    width: "100%",
    borderRadius: 10,
    backgroundColor: colors.main_fg,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: "92.5%",
    height: "92.5%",
    overflow: "hidden",
  },
  image: {
    resizeMode: "cover",
    height: "100%",
    width: "100%",
  },
});

export default ImagePickerCard;
