import React from "react";
import ErrorMessage from "./ErrorMessage";
import PrimaryInputBox from "./PrimaryInputBox";

import { useFormikContext } from "formik";

function AppFormField({ name, ...otherProps }) {
  const { handleChange, errors, setFieldTouched, touched } = useFormikContext();
  return (
    <>
      <PrimaryInputBox
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        {...otherProps} 
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormField;
