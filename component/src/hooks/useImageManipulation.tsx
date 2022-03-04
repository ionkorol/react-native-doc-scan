import { useEffect, useState } from "react";
import { cropPointsObservable, manipulationStageObservable, onEditImage, onFindCorners, onGrayScale, onPerspectiveCrop } from "../lib/observables";
import { ImageData, ManipulationStage, Points } from "../types/types";

export const useImageManipulation = () => {
  const [imageData, _setImageData] = useState<ImageData>(onEditImage.value);
  const [cropPoints, _setCropPoints] = useState<Points>({
    topLeft: { x: 1, y: 1 },
    topRight: { x: 1, y: 1 },
    bottomLeft: { x: 1, y: 1 },
    bottomRight: { x: 1, y: 1 },
  });
  const [manipulationStage, _setManipulationStage] = useState<ManipulationStage>(manipulationStageObservable.value);

  useEffect(() => {
    const editImageSubscription = onEditImage.asObservable().subscribe(_setImageData);
    const findCornersSubscription = onFindCorners.asObservable().subscribe(_setCropPoints);
    const grayScaleSubscription = onGrayScale.asObservable().subscribe((data) => _setImageData((prevState) => ({ ...prevState, base64: data })));
    const cropPointsSubscription = cropPointsObservable.asObservable().subscribe(_setCropPoints);

    const perspectiveCropSubscription = onPerspectiveCrop
      .asObservable()
      .subscribe((data) => _setImageData((prevState) => ({ ...prevState, base64: data })));

    const manipulationStageSubscription = manipulationStageObservable.asObservable().subscribe(_setManipulationStage);

    return () => {
      editImageSubscription.unsubscribe();
      findCornersSubscription.unsubscribe();
      cropPointsSubscription.unsubscribe();
      perspectiveCropSubscription.unsubscribe();
      grayScaleSubscription.unsubscribe();
      manipulationStageSubscription.unsubscribe();
    };
  }, []);

  return { imageData, cropPoints, manipulationStage };
};
