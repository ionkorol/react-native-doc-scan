import React, { useState } from "react";
import { useImageManipulation } from "../../../../hooks/useImageManipulation";
import { cropPointsObservable, handleFindCorners } from "../../../../lib/observables";
import { Button } from "../../../common";

export const CropButton: React.FC = () => {
  const { imageData } = useImageManipulation();
  const [cropFree, _setCropFree] = useState(false);

  const handleOnPress = () => {
    if (cropFree) {
      if (imageData.base64) {
        handleFindCorners.next(imageData.base64);
      }
    } else {
      cropPointsObservable.next({
        topLeft: { x: 0, y: 0 },
        topRight: { x: imageData.size.width, y: 0 },
        bottomRight: { x: imageData.size.width, y: imageData.size.height },
        bottomLeft: { x: 0, y: imageData.size.height },
      });
    }
    _setCropFree((prevState) => !prevState);
  };

  return <Button icon={cropFree ? "crop-free" : "crop"} onPress={handleOnPress} />;
};
