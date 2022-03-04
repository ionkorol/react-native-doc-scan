import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useImageManipulation } from "../../../hooks/useImageManipulation";
import { handleGrayScale } from "../../../lib/observables";
import { Button } from "../../common";

export const FilterList = () => {
  const { imageData, manipulationStage } = useImageManipulation();

  const handleGrayScalePress = () => {
    if (imageData.base64) {
      handleGrayScale.next(imageData.base64);
    }
  };

  const handleBlackWhitePress = () => {
    if (imageData.base64) {
      handleGrayScale.next(imageData.base64);
    }
  };

  return (
    <View style={[styles.container, { display: manipulationStage === "crop" ? "none" : "flex" }]}>
      <Button icon="invert-colors-off" onPress={handleGrayScalePress}>
        Gray Scale
      </Button>
      <Button icon="invert-colors-off" onPress={handleBlackWhitePress}>
        Black White
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: "#302e3b",
  },
});
