export interface OutboundMessage {
  base64: string;
  points?: Points;
  functionName: FunctionName;
}

export interface Coordinate {
  x: number;
  y: number;
}
export interface InboundMessage {
  loading: boolean;
  base64?: string;
  error?: string;
  points: Points;
  functionName: FunctionName;
}

interface Points {
  topLeft: Coordinate;
  topRight: Coordinate;
  bottomRight: Coordinate;
  bottomLeft: Coordinate;
}

export type FunctionName = "perspectiveCrop" | "grayScale" | "findCorners";

export interface ImageData {
  base64: string | undefined;
  size: { width: number; height: number };
}

export type ManipulationStage = "crop" | "filter";
