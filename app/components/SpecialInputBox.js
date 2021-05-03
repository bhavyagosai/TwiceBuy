import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";

import {
  View,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  FlatList,
  Modal,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Shadow } from "react-native-shadow-2";

// *IMPORT COLORS* //
import colors from "../config/colors";
import ItemPickerBox from "./ItemPickerBox";
import ModalView from "./ModalView";

function SpecialInputBox({
  icon,
  items,
  selectedItem,
  selectedIcon,
  onSelectedItem,
  onSelectedIcon,
  text,
  height = "50",
}) {
  const [modal, setModal] = useState(false);
  // *MAIN CODE* //
  return (
    <>
      <View style={{ width: "45%" }}>
        <Shadow
          distance={10}
          startColor={"#00000007"}
          radius={17.5}
          containerViewStyle={{ marginTop: 5, marginBottom: 10 }}
        >
          <TouchableNativeFeedback
            onPress={() => {
              setModal(true);
              // alert("Feature in progress! Will be implemented soon!");
            }}
            background={TouchableNativeFeedback.Ripple(colors.pressing_bg)}
          >
            <View style={[SpecialInputBoxStyle.InputBox, { height }]}>
              <View style={SpecialInputBoxStyle.Icon}>
                {selectedIcon ? selectedIcon.defaultIcon : icon}
              </View>

              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={SpecialInputBoxStyle.textInput}>
                  {selectedItem ? selectedItem.label : text}
                </Text>
              </View>
            </View>
          </TouchableNativeFeedback>
        </Shadow>
      </View>
      {/* {modal && (
        <ModalView
          items={items}
          // visible={modal}
          onPress={() => {
            setModal(false);
            navigation.goBack();
          }}
          // showModal={(set) => setModal(set)}
          selectedItemAction={(item) => onSelectedItem(item)}
          selectedIconAction={(icon) => onSelectedIcon(icon)}
        />
      )} */}

      {modal && (
        <Modal animationType={"slide"}>
          <View style={SpecialInputBoxStyle.Main}>
            <View style={{ width: "100%" }}>
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <TouchableNativeFeedback
                  onPress={() => {
                    setModal(false);
                  }}
                  background={TouchableNativeFeedback.Ripple(
                    colors.pressing_bg
                  )}
                >
                  <View style={SpecialInputBoxStyle.Button}>
                    <Text style={SpecialInputBoxStyle.buttonText}>Close</Text>
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
                      setModal(false);
                      onSelectedItem(item);
                      onSelectedIcon(item);
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
        </Modal>
      )}
    </>
  );
}

// *LOCAL STYLES DEFINITIONS* //

const SpecialInputBoxStyle = StyleSheet.create({
  InputBox: {
    flexDirection: "row",
    width: "100%",
    borderRadius: 25,
    backgroundColor: colors.pressing_fg,
    overflow: "hidden",
  },
  Icon: {
    marginVertical: 15.5,
    marginHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    fontFamily: "Montserrat",
    fontSize: RFValue(10),
    color: colors.secondary_text,
  },
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
});

export default SpecialInputBox;
