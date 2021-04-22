import React, { useRef, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ImagePickerCard from "./ImagePickerCard";

function ImageInputList({ imageURIs = [], onRemoveImage, onAddImage }) {
  const [imageArray, setImageArray] = useState(false);
  const [imagePicker, setImagePicker] = useState(true);

  const scrollView = useRef();

  return (
    <View>
      {imagePicker && (
        <ImagePickerCard
          setImageArray={(state) => setImageArray(state)}
          setImagePicker={(state) => setImagePicker(state)}
          onChangeImage={(uri) => onAddImage(uri)}
        />
      )}
      <ScrollView
        ref={scrollView}
        horizontal
        showsHorizontalScrollIndicator={false}
        fadingEdgeLength={50}
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        {imageArray && (
          <View style={{ flexDirection: "row" }}>
            {imageURIs.map((uri) => (
              <ImagePickerCard
                imageURI={uri}
                key={uri}
                onChangeImage={() => onRemoveImage(uri)}
              />
            ))}
            <ImagePickerCard
              renderType={"small"}
              onChangeImage={(uri) => onAddImage(uri)}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export default ImageInputList;
