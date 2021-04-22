import React from "react";
import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";
import ImageInputList from "./ImageInputList";

function FormImagePicker({ name }) {
  const { setFieldValue, values, errors, touched } = useFormikContext();
  const imageURIs = values[name];
  const handleAdd = (uri) => {
    setFieldValue(name, [...imageURIs, uri]);
  };

  const handleRemove = (uri) => {
    setFieldValue(
      name,
      imageURIs.filter((imageURI) => imageURI != uri)
    );
  };

  return (
    <>
      <ImageInputList
        imageURIs={imageURIs}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormImagePicker;
