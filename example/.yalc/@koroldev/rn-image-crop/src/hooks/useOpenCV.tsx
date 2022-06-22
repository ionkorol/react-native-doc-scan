import React from "react";
import { NativeModules } from "react-native";
import { Coordinates, CropResult } from "../types";

export const useOpenCV = () => {
	const perspectiveCrop = async (
		coords: Coordinates,
		file: string
	): Promise<CropResult> => {
		return await NativeModules.CustomCropManager.crop(coords, file);
	};

	const grayScale = async (file: string): Promise<CropResult> => {
		console.log(NativeModules.CustomCropManager);
		return await NativeModules.CustomCropManager.grayScale(file);
	};

	const blackAndWhite = async (file: string): Promise<string> => {
		return await NativeModules.CustomCropManager.blackAndWhite(file);
	};

	return { perspectiveCrop, grayScale, blackAndWhite };
};
