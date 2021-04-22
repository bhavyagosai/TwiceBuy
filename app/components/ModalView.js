import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  FlatList,
  TouchableNativeFeedback,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import colors from "../config/colors";
import ItemPickerBox from "./ItemPickerBox";

function ModalView({
  // items,
  // showModal,
  // selectedItemAction,
  // selectedIconAction,
  route
}) {
  const navigation = useNavigation();
  const {items, selectedItemAction, selectedIconAction} = route.params;
  return (
    // <Modal {...otherProps} animationType={"slide"}>
      <View style={styles.Main}>
        <View style={{ width: "100%" }}>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <TouchableNativeFeedback
              onPress={() => {
                // showModal(false);
                navigation.goBack();
              }}
              background={TouchableNativeFeedback.Ripple(colors.pressing_bg)}
            >
              <View style={styles.Button}>
                <Text style={styles.buttonText}>Close</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
          <FlatList
            data={items}
            keyExtractor={(item) => item.value.toString()}
            numColumns={2}
            renderItem={({ item }) => (
              <ItemPickerBox
                item={item}
                title={item.label}
                onPressEvent={() => {
                  // showModal(false);
                  selectedItemAction(item);
                  selectedIconAction(item);
                  navigation.goBack();
                }}
              />
            )}
            showsVerticalScrollIndicator={false}
            fadingEdgeLength={5}
            decelerationRate={"normal"}
            keyboardShouldPersistTaps={"never"}
          />
        </View>
      </View>
    // </Modal>
  );
}

const styles = StyleSheet.create({
  Main: {
    flex: 1,
    backgroundColor: colors.main_bg,
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  Button: {
    marginVertical: 20,
    height: 50,
    width: 120,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.main_fg,
  },
  buttonText: {
    fontFamily: "Montserrat",
    fontSize: RFValue(11.5),
    color: colors.pressing_fg,
  },
  text: {
    textAlign: "center",
    fontFamily: "Montserrat",
    fontSize: RFValue(10),
    color: colors.main_fg,
    paddingBottom: 10,
  },
  textInput: {
    backgroundColor: colors.pressing_fg,
    width: "100%",
    height: 50,
    borderRadius: 17.5,
    paddingHorizontal: 20,
    justifyContent: "center",
    fontFamily: "Montserrat",
    fontSize: RFValue(10),
    color: colors.secondary_text,
  },
});

export default ModalView;
