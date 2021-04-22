import { DefaultTheme } from "@react-navigation/native";
import colors from "../config/colors";

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.main_fg,
    background: colors.main_bg,
  },
};

export { lightTheme };
