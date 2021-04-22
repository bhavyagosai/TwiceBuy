import { StyleSheet } from 'react-native';

import colors from "../config/colors";

// *CIRCLES STYLES DEFINITIONS* //

const CircleStyles = StyleSheet.create({
    circleTopRight: {
        position: "absolute",
        left: 239,
        top: -143,
        width: 362,
        height: 362,
        borderRadius: 362 / 2,
        backgroundColor: colors.main_fg,
        elevation: 100,
      },
      circleTopLeft: {
        position: "absolute",
        left: 71,
        top: -206,
        width: 281,
        height: 281,
        borderRadius: 281 / 2,
        elevation: 99,
        backgroundColor: colors.main_fg,
      },
      circleBottomLeft: {
        position: "absolute",
        left: -61,
        bottom: -25,
        width: 187,
        height: 187,
        borderRadius: 187 / 2,
        elevation: 20,
        backgroundColor: colors.main_fg,
      },
      circleBottomSmall: {
        position: "absolute",
        left: 61,
        bottom: 161,
        width: 56,
        height: 56,
        borderRadius: 56 / 2,
        elevation: 10,
        backgroundColor: colors.main_fg,
      },
})

export default CircleStyles;