import React, { useEffect, useMemo, useRef, useState } from "react";
import { GestureResponderEvent } from "react-native";
import Svg, { Circle, Polygon } from "react-native-svg";
import { useImageManipulation } from "../hooks/useImageManipulation";
import { handleFindCorners, cropViewDims, cropPointsObservable } from "../lib/observables";

export const CropArea: React.FC = () => {
  const { imageData, cropPoints, manipulationStage } = useImageManipulation();
  const [viewDims, _setViewDims] = useState({ width: 1, height: 1 });
  const firstRender = useRef(true);
  const isVisible = manipulationStage === "crop";

  const widthRatio = useMemo(() => {
    if (imageData) {
      return imageData.size.width / viewDims.width;
    }
    return 1;
  }, [imageData, viewDims]);

  const heightRatio = useMemo(() => {
    if (imageData) {
      return imageData.size.height / viewDims.height;
    }
    return 1;
  }, [imageData, viewDims]);

  useEffect(() => {
    if (firstRender.current && imageData.base64) {
      handleFindCorners.next(imageData.base64);
      firstRender.current = false;
    }
  }, [imageData]);

  useEffect(() => {
    const viewDimsSubscription = cropViewDims.asObservable().subscribe(_setViewDims);
    return () => viewDimsSubscription.unsubscribe();
  }, []);

  const handleOnTouch = (pointType: "topLeft" | "topRight" | "bottomRight" | "bottomLeft") => (event: GestureResponderEvent) => {
    const x = event.nativeEvent.locationX;
    const y = event.nativeEvent.locationY;
    cropPointsObservable.next({ ...cropPoints, [pointType]: { x: x * widthRatio, y: y * heightRatio } });
  };

  return (
    <Svg style={{ display: isVisible ? "flex" : "none" }} height={viewDims.height * heightRatio} width={viewDims.width * widthRatio}>
      <Polygon
        points={`
        ${cropPoints.topLeft.x / widthRatio},${cropPoints.topLeft.y / heightRatio} 
        ${cropPoints.topRight.x / widthRatio},${cropPoints.topRight.y / heightRatio} 
        ${cropPoints.bottomRight.x / widthRatio},${cropPoints.bottomRight.y / heightRatio} 
        ${cropPoints.bottomLeft.x / widthRatio},${cropPoints.bottomLeft.y / heightRatio}
        `}
        stroke="lightblue"
        fill="lightblue"
        fillOpacity={0.3}
        strokeWidth="2"
      />
      <Circle
        pointerEvents="box-only"
        cx={cropPoints.topLeft.x / widthRatio}
        cy={cropPoints.topLeft.y / heightRatio}
        r="10"
        fill="lightblue"
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderMove={handleOnTouch("topLeft")}
      />
      <Circle
        cx={cropPoints.topRight.x / widthRatio}
        cy={cropPoints.topRight.y / heightRatio}
        r="10"
        fill="lightblue"
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderMove={handleOnTouch("topRight")}
      />
      <Circle
        cx={cropPoints.bottomRight.x / widthRatio}
        cy={cropPoints.bottomRight.y / heightRatio}
        r="10"
        fill="lightblue"
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderMove={handleOnTouch("bottomRight")}
      />
      <Circle
        cx={cropPoints.bottomLeft.x / widthRatio}
        cy={cropPoints.bottomLeft.y / heightRatio}
        r="10"
        fill="lightblue"
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderMove={handleOnTouch("bottomLeft")}
      />
    </Svg>
  );
};
