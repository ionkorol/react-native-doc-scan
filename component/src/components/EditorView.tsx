import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { CropArea } from "./CropArea";
import { LoadingComponent } from "./LoadingComponent";
import { cropViewDims } from "../lib/observables";
import { useImageManipulation } from "../hooks/useImageManipulation";

export const EditorView = () => {
  const { imageData } = useImageManipulation();

  if (!Boolean(imageData.base64)) {
    return <LoadingComponent isLoading={true} />;
  }

  return (
    <ImageBackground
      source={{ uri: imageData.base64 }}
      style={{ flex: 1, marginVertical: 40, marginHorizontal: 20 }}
      onLayout={(e) => {
        const { width, height } = e.nativeEvent.layout;
        cropViewDims.next({ width, height });
      }}
      resizeMode="stretch"
    >
      <CropArea />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    zIndex: 5,
    elevation: 5,
  },
  overlay: {
    position: "relative",
    flex: 1,
    backgroundColor: "black",
    zIndex: 100,
    elevation: 100,
  },
  button: {
    backgroundColor: "transparent",
  },
});
