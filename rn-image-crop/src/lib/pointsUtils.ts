import { Points } from "../types";

export const adjustPointsByRatios = (
	cropPoints: Points,
	widthRatio: number,
	heightRatio: number
): Points => {
	console.log(
		`Adjusting crop points by ratios height: ${heightRatio} width: ${widthRatio}`
	);
	return {
		topLeft: {
			x: cropPoints.topLeft.x * widthRatio,
			y: cropPoints.topLeft.y * heightRatio,
		},
		topRight: {
			x: cropPoints.topRight.x * widthRatio,
			y: cropPoints.topRight.y * heightRatio,
		},
		bottomRight: {
			x: cropPoints.bottomRight.x * widthRatio,
			y: cropPoints.bottomRight.y * heightRatio,
		},
		bottomLeft: {
			x: cropPoints.bottomLeft.x * widthRatio,
			y: cropPoints.bottomLeft.y * heightRatio,
		},
	};
};
