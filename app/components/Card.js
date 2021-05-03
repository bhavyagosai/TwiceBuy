import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import { Shadow } from "react-native-shadow-2";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

// *IMPORT COLORS* //
import colors from "../config/colors";
import Firebase from "./Firebase";

function Card({
  image,
  title,
  subtitle,
  items,
  onPress,
  favouriteItems,
  displayFavourite,
}) {
  const [favourite, setFavourite] = useState(false);
  const [notFavourite, setNotFavourite] = useState(true);
  const [originallyFavourite, setOriginallyFavourite] = useState(false);

  useEffect(() => {
    if (favouriteItems) checkIfFavourite();
  }, [favouriteItems]);

  const checkIfFavourite = () => {
    for (var element in favouriteItems) {
      for (var itemID in favouriteItems[element]) {
        if (favouriteItems[element][itemID] === items.id) {
          setNotFavourite(false);
          setOriginallyFavourite(true);
          setFavourite(true);
          break;
        }
      }
    }
  };

  const onPressFavourite = () => {
    if (notFavourite) {
      Alert.alert(
        "Add to favourites",
        "Do you want to add this item to your favourites?",
        [
          {
            text: "Yes",
            onPress: () => {
              addToFavourites();
              setNotFavourite(false);
              setFavourite(true);
              setOriginallyFavourite(true);
            },
          },
          { text: "No" },
        ]
      );
    } else if (favourite) {
      Alert.alert(
        "Remove from favourites",
        "Do you want to remove this item from your favourites?",
        [
          {
            text: "Yes",
            onPress: () => {
              removeFromFavourites();
              setFavourite(false);
              setNotFavourite(true);
              setOriginallyFavourite(false);
            },
          },
          { text: "No" },
        ]
      );
    }
  };

  const addToFavourites = () => {
    try {
      Firebase.addToFavouries(
        items.name,
        items.price,
        items.condition,
        items.description,
        items.address,
        items.imageURL,
        items.id,
        items.userID
      );
    } catch (error) {
      alert("Error!\n" + error.message);
    }
  };

  const removeFromFavourites = () => {
    try {
      Firebase.removeFromFavouries(items.id);
    } catch (error) {
      alert("Error!\n" + error.message);
    }
  };

  // *MAIN CODE* //

  return (
    <View style={{ width: "100%" }}>
      <Shadow
        distance={10}
        startColor={"#00000017"}
        radius={25}
        contentViewStyle={{ marginBottom: 35 }}
      >
        <TouchableNativeFeedback
          onPress={onPress}
          background={TouchableNativeFeedback.Ripple(colors.pressing_bg)}
        >
          <View style={styles.card}>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: image }} />
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
        {displayFavourite && (
          <View style={styles.FavouriteContainer}>
            <TouchableNativeFeedback
              onPress={onPressFavourite}
              background={TouchableNativeFeedback.Ripple(colors.pressing_bg)}
            >
              <View>
                {notFavourite && (
                  <FontAwesome5 name="heart" size={16} color={colors.main_fg} />
                )}
                {favourite && originallyFavourite && (
                  <FontAwesome name="heart" size={16} color={colors.main_fg} />
                )}
              </View>
            </TouchableNativeFeedback>
          </View>
        )}
      </Shadow>
    </View>
  );
}

// *LOCAL STYLES DEFINITIONS* //

const styles = StyleSheet.create({
  card: {
    minHeight: 200,
    width: "100%",
    borderRadius: 20,
    backgroundColor: colors.main_fg,
  },
  imageContainer: {
    height: 166,
    width: "100%",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    overflow: "hidden",
  },
  image: {
    resizeMode: "cover",
    height: "100%",
    width: "100%",
  },
  title: {
    marginTop: 5,
    marginLeft: 15,
    fontFamily: "Montserrat",
    fontSize: RFValue(11.5),
    color: colors.pressing_fg,
    width: "50%",
  },
  subtitle: {
    marginTop: 5,
    marginRight: 15,
    fontFamily: "Montserrat",
    fontSize: RFValue(11.5),
    color: colors.pressing_fg,
  },
  FavouriteContainer: {
    position: "absolute",
    top: 17,
    right: 20,
    height: 35,
    width: 35,
    borderRadius: 17.5,
    backgroundColor: colors.pressing_bg,
    elevation: 16,
    zIndex: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Card;
