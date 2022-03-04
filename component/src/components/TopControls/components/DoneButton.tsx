import React from "react";
import { useImageManipulation } from "../../../hooks/useImageManipulation";
import { doneObservable, handlePerspectiveCrop } from "../../../lib/observables";
import { Button } from "../../common";

export const DoneButton: React.FC = () => {
  const { manipulationStage, imageData, cropPoints } = useImageManipulation();

  const handleOnPress = () => {
    if (imageData.base64) {
      if (manipulationStage === "crop") {
        handlePerspectiveCrop.next({ base64: imageData.base64, points: cropPoints });
      } else {
        doneObservable.next(imageData.base64);
        doneObservable.complete();
      }
    }
  };

  return (
    <Button onPress={handleOnPress} icon="check">
      {manipulationStage === "crop" ? "Crop" : "Done"}
    </Button>
  );
};
