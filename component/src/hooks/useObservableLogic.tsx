import { useEffect } from "react";
import { doneObservable, manipulationStageObservable, onEditImage, onPerspectiveCrop } from "../lib/observables";

export const useObservableLogic = () => {
  useEffect(() => {
    const onPerspectiveCropSubscription = onPerspectiveCrop.asObservable().subscribe(() => {
      manipulationStageObservable.next("filter");
    });
    const doneSubscription = doneObservable.asObservable().subscribe(() => {
      onEditImage.next({ base64: undefined, size: { width: 1, height: 1 } });
      manipulationStageObservable.next("crop");
    });
    return () => {
      onPerspectiveCropSubscription.unsubscribe();
      doneSubscription.unsubscribe();
    };
  }, []);
};
