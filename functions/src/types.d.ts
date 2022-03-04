// type cv = typeof import("mirada");
// type Mat = import("mirada").Mat;

export interface OutboundMessage {
  loading: boolean;
  base64?: string;
  error?: string;
  points?: Points;
  functionName: FunctionName;
  local?: boolean;
}
export interface InboundMessage {
  points?: Points;
  loading: boolean;
  base64?: string;
  error?: string;
  functionName: FunctionName;
  local?: boolean;
}
export interface Coordinate {
  x: number;
  y: number;
}
interface Points {
  topLeft: Coordinate;
  topRight: Coordinate;
  bottomRight: Coordinate;
  bottomLeft: Coordinate;
}
export type FunctionName = "perspectiveCrop" | "grayScale" | "findCorners";
