import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { CONTROLS_BAR_HEIGHT } from "../constants/dimensions";
import { ManipulationStage } from "../constants/enums";
import { MainContext } from "../contexts/MainContext";
import { Button } from "./common";

export const TopControls: React.FC = () => {
  /* ******************** Hooks ******************** */
  const { _handleDoneCommand, manipulationStage, _setManipulationStage, _clearState } = useContext(MainContext);

  /* ******************** Functions ******************** */
  const handleOnPressClose = () => {
    _clearState();
  };
  const handleOnPressBack = () => {
    _setManipulationStage(ManipulationStage.VIEW);
  };

  /* ******************** JSX ******************** */
  return (
    <View style={styles.container}>
      {manipulationStage !== ManipulationStage.VIEW && (
        <Button icon="arrow-left" onPress={handleOnPressBack}>
          Back
        </Button>
      )}

      {manipulationStage === ManipulationStage.VIEW && (
        <Button icon="arrow-left" onPress={handleOnPressClose}>
          Close
        </Button>
      )}

      {manipulationStage === ManipulationStage.VIEW && (
        <Button onPress={_handleDoneCommand} icon="check">
          Done
        </Button>
      )}

      {/* {manipulationStage !== ManipulationStage.VIEW && (
        <Button onPress={_handleDoneCommand} icon="check">
          Apply
        </Button>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#302e3b",
    height: CONTROLS_BAR_HEIGHT,
  },
});
