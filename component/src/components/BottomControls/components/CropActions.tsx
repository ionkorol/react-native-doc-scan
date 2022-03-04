import React from "react";
import { View, StyleSheet } from "react-native";
import { useImageManipulation } from "../../../hooks/useImageManipulation";
import { Button } from "../../common";
import { CropButton } from "./CropActions/CropButton";

export const CropActions = () => {
  const { manipulationStage } = useImageManipulation();

  const handleFlipHorizontalPress = () => {
    console.log("Flip horizontal");
  };
  const handleFlipVerticalPress = () => {
    console.log("Flip vertical");
  };
  return (
    <View style={[styles.container, { display: manipulationStage === "filter" ? "none" : "flex" }]}>
      <CropButton />
      <Button icon="flip-horizontal" onPress={handleFlipHorizontalPress} />
      <Button icon="flip-vertical" onPress={handleFlipVerticalPress} />
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
  actionControls: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
