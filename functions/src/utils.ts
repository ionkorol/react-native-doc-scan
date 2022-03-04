import { Mat } from "mirada";
import { Coordinate, OutboundMessage } from "./types";

export const base64ToMat = (base64: string): Promise<Mat> => {
  return new Promise((resolve) => {
    const originalImage = new Image();
    originalImage.onload = () => resolve(cv.imread(originalImage));
    originalImage.src = base64;
  });
};

export const matToBase64 = (mat: Mat) => {
  const outputCanvas = document.createElement("canvas");
  cv.imshow(outputCanvas, mat);
  const base64 = outputCanvas.toDataURL();
  return base64;
};

export const sortPoints = (points: [number, number][]) => {
  let topLeftPoint: Coordinate | undefined;
  let topRightPoint: Coordinate | undefined;
  let bottomRightPoint: Coordinate | undefined;
  let bottomLeftPoint: Coordinate | undefined;

  for (const point of points) {
    const currentPointSum = point.reduce((a, b) => a + b);
    const currentPointDifference = point.reduce((a, b) => a - b);

    // Top Left
    // Lowest sum
    if (!topLeftPoint) {
      topLeftPoint = { x: point[0], y: point[1] };
    } else {
      const topLeftPointSum = topLeftPoint.x + topLeftPoint.y;
      if (topLeftPointSum > currentPointSum) {
        topLeftPoint = { x: point[0], y: point[1] };
      }
    }

    // Top Right
    // Highest difference in x - y
    if (!topRightPoint) {
      topRightPoint = { x: point[0], y: point[1] };
    } else {
      const topRightPointDifference = topRightPoint.x - topRightPoint.y;
      if (topRightPointDifference < currentPointDifference) {
        topRightPoint = { x: point[0], y: point[1] };
      }
    }

    // Bottom Right
    // Highest sum
    if (!bottomRightPoint) {
      bottomRightPoint = { x: point[0], y: point[1] };
    } else {
      const bottomRightPointSum = bottomRightPoint.x + bottomRightPoint.y;
      if (bottomRightPointSum < currentPointSum) {
        bottomRightPoint = { x: point[0], y: point[1] };
      }
    }
    // Bottom Left
    // Lowest difference in x - y
    if (!bottomLeftPoint) {
      bottomLeftPoint = { x: point[0], y: point[1] };
    } else {
      const blPointDifference = bottomLeftPoint.x - bottomLeftPoint.y;
      if (blPointDifference > currentPointDifference) {
        bottomLeftPoint = { x: point[0], y: point[1] };
      }
    }
  }

  const cornerPoints = {
    topLeft: topLeftPoint,
    topRight: topRightPoint,
    bottomRight: bottomRightPoint,
    bottomLeft: bottomLeftPoint,
  };
  return cornerPoints;
};

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const sendMessage = (message: OutboundMessage) => {
  if ("ReactNativeWebView" in window) {
    // Prod Mode
    //@ts-expect-error
    window["ReactNativeWebView"].postMessage(JSON.stringify(message));
  } else {
    // Dev Mode
    window.postMessage(JSON.stringify({ ...message, local: true }));
  }
};
