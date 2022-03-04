import { base64ToMat, matToBase64, sendMessage, sortPoints } from "./utils";
import { InboundMessage } from "./types";

export const perspectiveCorrection = async (data: InboundMessage) => {
  sendMessage({ loading: true, functionName: "perspectiveCrop" });
  try {
    const originalImageMat = await base64ToMat(data.base64);

    const transformedImageMat = new cv.Mat();
    const fromPointsMat = cv.matFromArray(4, 1, cv.CV_32FC2, [
      data.points.topLeft.x,
      data.points.topLeft.y,
      data.points.topRight.x,
      data.points.topRight.y,
      data.points.bottomRight.x,
      data.points.bottomRight.y,
      data.points.bottomLeft.x,
      data.points.bottomLeft.y,
    ]);
    const { rows, cols } = originalImageMat;
    const dsize = new cv.Size(cols, rows);
    const toPoints = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, cols, 0, cols, rows, 0, rows]);

    const M = cv.getPerspectiveTransform(fromPointsMat, toPoints);
    cv.warpPerspective(originalImageMat, transformedImageMat, M, dsize);

    const base64Data = matToBase64(transformedImageMat);

    sendMessage({
      loading: false,
      base64: base64Data,
      functionName: "perspectiveCrop",
    });
    fromPointsMat.delete();
    toPoints.delete();
    originalImageMat.delete();
    transformedImageMat.delete();
  } catch (error) {
    sendMessage({
      loading: false,
      error: JSON.stringify(error),
      functionName: "perspectiveCrop",
    });
  }
};

export const grayScale = async (data: InboundMessage) => {
  sendMessage({ loading: true, functionName: "grayScale" });
  try {
    const originalImageMat = await base64ToMat(data.base64);
    const transformedImageMat = new cv.Mat();
    cv.cvtColor(originalImageMat, transformedImageMat, cv.COLOR_BGR2GRAY);

    const base64Data = matToBase64(transformedImageMat);
    sendMessage({
      loading: false,
      base64: base64Data,
      functionName: "grayScale",
    });
    originalImageMat.delete();
    transformedImageMat.delete();
  } catch (error) {
    console.log(error);
    sendMessage({ loading: false, error, functionName: "grayScale" });
  }
};

export const findCorners = async (data: InboundMessage) => {
  sendMessage({ loading: true, functionName: "findCorners" });
  try {
    const originalImageMat = await base64ToMat(data.base64);

    cv.cvtColor(originalImageMat, originalImageMat, cv.COLOR_BGR2GRAY, 0);

    cv.GaussianBlur(originalImageMat, originalImageMat, new cv.Size(5, 5), 0, 0, cv.BORDER_DEFAULT);

    cv.Canny(originalImageMat, originalImageMat, 75, 200);

    var contours = new cv.MatVector();
    var hierarchy = new cv.Mat();
    cv.findContours(originalImageMat, contours, hierarchy, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE);

    const points: [number, number][] = [];

    for (let row = 0; row < originalImageMat.rows; row++) {
      for (let column = 0; column < originalImageMat.cols; column++) {
        const value = originalImageMat.ucharPtr(row, column)[0];
        if (value > 200) {
          points.push([column, row]);
        }
      }
    }
    const cornerPoints = sortPoints(points);

    sendMessage({
      loading: false,
      points: cornerPoints,
      functionName: "findCorners",
    });

    // Clear Mats
    originalImageMat.delete();
    contours.delete();
    hierarchy.delete();
  } catch (error) {
    sendMessage({
      loading: false,
      error,
      functionName: "findCorners",
    });
  }
};
