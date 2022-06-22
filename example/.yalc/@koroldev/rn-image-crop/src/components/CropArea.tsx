//@ts-nocheck
import React, { useContext } from "react";
import { GestureResponderEvent } from "react-native";
import Svg, { Circle, Polygon } from "react-native-svg";
import { CONTROLS_BAR_HEIGHT, EDITOR_VIEW_GAP } from "../constants/dimensions";
import { ManipulationStage } from "../constants/enums";
import { MainContext } from "../contexts/MainContext";

export const CropArea: React.FC = () => {
	/* ******************** Hooks ******************** */
	const { cropPoints, manipulationStage, _setCropPoints, cropViewDims } =
		useContext(MainContext);

	/* ******************** Variables ******************** */
	const isVisible = manipulationStage === ManipulationStage.CROP;

	/* ******************** Functions ******************** */
	const handleOnTouch =
		(pointType: "topLeft" | "topRight" | "bottomRight" | "bottomLeft") =>
		(event: GestureResponderEvent) => {
			const x = event.nativeEvent.locationX;
			const y = event.nativeEvent.locationY;
			const { pageX, pageY } = event.nativeEvent;

			if (
				pageX <= EDITOR_VIEW_GAP ||
				pageX >= cropViewDims.width + EDITOR_VIEW_GAP ||
				pageY <= EDITOR_VIEW_GAP + CONTROLS_BAR_HEIGHT ||
				pageY >= cropViewDims.height + EDITOR_VIEW_GAP
			) {
				return;
			}
			_setCropPoints((prevState) =>
				prevState ? { ...prevState, [pointType]: { x, y } } : prevState
			);
		};

	/* ******************** JSX ******************** */
	if (!cropPoints) {
		return <></>;
	}

	return (
		<Svg
			style={{ display: isVisible ? "flex" : "none" }}
			height={cropViewDims.height}
			width={cropViewDims.width}
		>
			<Polygon
				points={`
        ${cropPoints.topLeft.x},${cropPoints.topLeft.y} 
        ${cropPoints.topRight.x},${cropPoints.topRight.y} 
        ${cropPoints.bottomRight.x},${cropPoints.bottomRight.y} 
        ${cropPoints.bottomLeft.x},${cropPoints.bottomLeft.y}
        `}
				stroke="lightblue"
				fill="lightblue"
				fillOpacity={0.3}
				strokeWidth="2"
			/>
			<Circle
				pointerEvents="box-only"
				cx={cropPoints.topLeft.x}
				cy={cropPoints.topLeft.y}
				r="10"
				fill="lightblue"
				onStartShouldSetResponder={() => true}
				onMoveShouldSetResponder={() => true}
				onResponderMove={handleOnTouch("topLeft")}
			/>
			<Circle
				cx={cropPoints.topRight.x}
				cy={cropPoints.topRight.y}
				r="10"
				fill="lightblue"
				onStartShouldSetResponder={() => true}
				onMoveShouldSetResponder={() => true}
				onResponderMove={handleOnTouch("topRight")}
			/>
			<Circle
				cx={cropPoints.bottomRight.x}
				cy={cropPoints.bottomRight.y}
				r="10"
				fill="lightblue"
				onStartShouldSetResponder={() => true}
				onMoveShouldSetResponder={() => true}
				onResponderMove={handleOnTouch("bottomRight")}
			/>
			<Circle
				cx={cropPoints.bottomLeft.x}
				cy={cropPoints.bottomLeft.y}
				r="10"
				fill="lightblue"
				onStartShouldSetResponder={() => true}
				onMoveShouldSetResponder={() => true}
				onResponderMove={handleOnTouch("bottomLeft")}
			/>
		</Svg>
	);
};
