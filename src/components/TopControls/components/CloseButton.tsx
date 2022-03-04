import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { useImageManipulation } from "../../../hooks/useImageManipulation";
import { manipulationStageObservable, onEditImage } from "../../../lib/observables";
import { Button } from "../../common";

export const CloseButton: React.FC = () => {
  const { manipulationStage } = useImageManipulation();

  const handleOnPress = () => {
    if (manipulationStage === "crop") {
      onEditImage.next({ base64: undefined, size: { width: 1, height: 1 } });
    } else {
      manipulationStageObservable.next("crop");
    }
  };

  return <Button icon="arrow-left" onPress={handleOnPress} />;
};
