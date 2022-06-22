import { FunctionName } from "./constants/enums";

export interface CropResult {
	path: string;
}

export interface Coordinates {
	bottomLeft: ValueXY;
	bottomRight: ValueXY;
	topLeft: ValueXY;
	topRight: ValueXY;
}

export interface ValueXY {
	x: number;
	y: number;
}

export interface OutboundMessage {
	base64: string;
	points?: Points;
	functionName: FunctionName;
}

export interface InboundMessage {
	loading: boolean;
	base64?: string;
	error?: string;
	points: Points;
	functionName: FunctionName;
}

export interface Coordinate {
	x: number;
	y: number;
}

export interface Points {
	topLeft: Coordinate;
	topRight: Coordinate;
	bottomRight: Coordinate;
	bottomLeft: Coordinate;
}

export interface OriginalImage {
	uri: string;
	width: number;
	height: number;
}

export interface ModifiedImage {
	base64: string;
	width: number;
	height: number;
}
