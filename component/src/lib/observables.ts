import { Points, ImageData, ManipulationStage } from "../types/types";
import { AsyncSubject, BehaviorSubject, Subject } from "rxjs";

export const onFindCorners = new Subject<Points>();
export const onPerspectiveCrop = new Subject<string>();
export const onGrayScale = new Subject<string>();

export const handleFindCorners = new Subject<string>();
export const handlePerspectiveCrop = new Subject<{ base64: string; points: Points }>();
export const handleGrayScale = new Subject<string>();

export const onEditImage = new BehaviorSubject<ImageData>({ base64: undefined, size: { width: 1, height: 1 } });
export const cropPointsObservable = new BehaviorSubject<Points>({
  topLeft: { x: 1, y: 1 },
  topRight: { x: 1, y: 1 },
  bottomLeft: { x: 1, y: 1 },
  bottomRight: { x: 1, y: 1 },
});
export const cropViewDims = new BehaviorSubject<{ width: number; height: number }>({ width: 1, height: 1 });
export const manipulationStageObservable = new BehaviorSubject<ManipulationStage>("crop");
export const doneObservable = new Subject<string>();
