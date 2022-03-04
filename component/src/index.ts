import { doneObservable, onEditImage } from "./lib/observables";
import { ImageData } from "./types/types";

export { DocScanComponent } from "./DocScanComponent";
export const editImage = (data: ImageData): Promise<string> => {
  onEditImage.next(data);
  return new Promise((resolve) => doneObservable.asObservable().subscribe((data) => resolve(data)));
};
