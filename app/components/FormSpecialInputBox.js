import { useFormikContext } from "formik";
import React from "react";
import SpecialInputBox from "./SpecialInputBox";

function FormSpecialInputBox({
  name,
  icon,
  items,
  selectedItem,
  selectedIcon,
  onSelectedItem,
  onSelectedIcon,
  text,
  height,
}) {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  return (
    <>
      <SpecialInputBox
        selectedItem={values[name]}
        selectedIcon={selectedIcon}
        onSelectedItem={(item) => setFieldValue(name, item)}
        onSelectedIcon={(icon) => onSelectedIcon(icon)}
        items={items}
        icon={icon}
        height={height}
        text={text}
      />
    </>
  );
}

export default FormSpecialInputBox;
