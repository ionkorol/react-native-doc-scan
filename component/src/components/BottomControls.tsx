import React, { useContext, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { CONTROLS_BAR_HEIGHT } from "../constants/dimensions";
import { ManipulationStage } from "../constants/enums";
import { MainContext } from "../contexts/MainContext";
import { Button } from "./common";

export const BottomControls: React.FC = () => {
  /* ******************** Hooks ******************** */
  const { _handleGrayScale, _handlePerspectiveCrop, manipulationStage, _setManipulationStage } = useContext(MainContext);

  /* ******************** Variables ******************** */
  const containerJustifyContent = useMemo((): "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly" => {
    if (manipulationStage === ManipulationStage.CROP) {
      return "center";
    }
    return "space-around";
  }, []);

  /* ******************** Functions ******************** */
  const handleFiltersPress = () => {
    _setManipulationStage(ManipulationStage.FILTER);
  };

  const handleCropPress = () => {
    _setManipulationStage(ManipulationStage.CROP);
  };

  /* ******************** JSX ******************** */
  return (
    <View style={[styles.container, { justifyContent: containerJustifyContent }]}>
      {manipulationStage === ManipulationStage.VIEW && (
        <>
          <Button onPress={handleCropPress} icon="crop">
            Smart Crop
          </Button>
          <Button onPress={handleFiltersPress} icon="format-color-fill">
            Filters
          </Button>
        </>
      )}

      {manipulationStage === ManipulationStage.CROP && (
        <Button onPress={_handlePerspectiveCrop} icon="crop">
          Crop
        </Button>
      )}

      {manipulationStage === ManipulationStage.FILTER && (
        <>
          <Button icon="invert-colors-off" onPress={_handleGrayScale}>
            Gray Scale
          </Button>
          <Button icon="invert-colors-off" onPress={_handleGrayScale}>
            Black & White
          </Button>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: CONTROLS_BAR_HEIGHT,
    backgroundColor: "#302e3b",
    flexDirection: "row",
    alignItems: "center",
  },
});
