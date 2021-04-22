import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";

import { View, StyleSheet, Text, TouchableNativeFeedback } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Shadow } from "react-native-shadow-2";

// *IMPORT COLORS* //
import colors from "../config/colors";
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

  const navigation = useNavigation();
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
              // setModal(true);
              navigation.navigate("Modal", {
                items: items,
                selectedItemAction: (item) => onSelectedItem(item),
                selectedIconAction: (icon) => onSelectedIcon(icon),
              });
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
});

export default SpecialInputBox;
