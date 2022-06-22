import React, { useContext } from "react";
import { ImageBackground } from "react-native";
import { EDITOR_VIEW_GAP } from "../constants/dimensions";
import { MainContext } from "../contexts/MainContext";
import { CropArea } from "./CropArea";
import { LoadingComponent } from "./LoadingComponent";

export const EditorView = () => {
	/* ******************** Hooks ******************** */
	const { modifiedImage, isLoading } = useContext(MainContext);

	/* ******************** JSX ******************** */
	if (!modifiedImage) {
		return <LoadingComponent isLoading={true} />;
	}

	return (
		<ImageBackground
			source={{ uri: modifiedImage.base64.trim() }}
			style={{ flex: 1, margin: EDITOR_VIEW_GAP, borderWidth: 1 }}
			resizeMode="stretch"
		>
			<CropArea />
			<LoadingComponent isLoading={isLoading} />
		</ImageBackground>
	);
};
