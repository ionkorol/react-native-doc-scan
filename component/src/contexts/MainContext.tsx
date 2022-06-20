import React, { createContext, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import WebView from "react-native-webview";
import { FunctionName, ManipulationStage } from "../constants/enums";
import { Points, InboundMessage, OutboundMessage, OriginalImage, ModifiedImage } from "../types";
import * as FileSystem from "expo-file-system";
import { convertFromBase64ToUri, convertFromUriToBase64 } from "../lib/fileUtils";
import { StatusBar, useWindowDimensions } from "react-native";
import { CONTROLS_BAR_HEIGHT, EDITOR_VIEW_GAP, INITIAL_CROP_POINTS_GAP } from "../constants/dimensions";
import { adjustPointsByRatios } from "../lib/pointsUtils";
import { BASE64_PREFIX } from "../constants/files";

export interface IMainContext {
  setImage: (imgInfo: OriginalImage) => void;
  _clearState: () => void;
  _handlePerspectiveCrop: () => void;
  _handleGrayScale: () => void;
  _handleDoneCommand: () => void;
  _setCropPoints: React.Dispatch<React.SetStateAction<Points | null>>;
  _setManipulationStage: React.Dispatch<React.SetStateAction<ManipulationStage>>;
  returnImage: string | null;
  modifiedImage: ModifiedImage | null;
  cropPoints: Points | null;
  manipulationStage: ManipulationStage;
  cropViewDims: {
    width: number;
    height: number;
  };
  isLoading: boolean;
}

export const MainContext = createContext<IMainContext>({
  setImage: () => console.log("not implemented"),
  _clearState: () => console.log("not implemented"),
  _handleDoneCommand: () => console.log("not implemented"),
  _handlePerspectiveCrop: () => console.log("not implemented"),
  _handleGrayScale: () => console.log("not implemented"),
  _setCropPoints: () => console.log("not implemented"),
  _setManipulationStage: () => console.log("not implemented"),
  returnImage: null,
  modifiedImage: null,
  cropPoints: null,
  manipulationStage: ManipulationStage.CROP,
  cropViewDims: {
    width: 1,
    height: 1,
  },
  isLoading: false,
});

export const MainProvider: React.FC = ({ children }) => {
  /* ******************** Hooks ******************** */
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const [returnImage, _setReturnImage] = useState<string | null>(null);
  const [modifiedImage, _setModifiedImage] = useState<ModifiedImage | null>(null);
  const [cropPoints, _setCropPoints] = useState<Points | null>(null);
  const [manipulationStage, _setManipulationStage] = useState<ManipulationStage>(ManipulationStage.VIEW);
  const [cropViewDims, _setCropViewDims] = useState({ width: 0, height: 0 });
  const [isLoading, _setIsLoading] = useState(false);

  const webViewRef = useRef<WebView>(null);

  /* ******************** Variables ******************** */
  const cropViewWidthRatio = useMemo(() => {
    if (modifiedImage) {
      return modifiedImage.width / cropViewDims.width;
    }
    return 1;
  }, [modifiedImage?.width, cropViewDims]);

  const cropViewHeightRatio = useMemo(() => {
    if (modifiedImage) {
      return modifiedImage.height / cropViewDims.height;
    }
    return 1;
  }, [modifiedImage?.height, cropViewDims]);

  /* ******************** Public Functions ******************** */
  const setImage = async (imgInfo: OriginalImage) => {
    const originalImageBase64 = await convertFromUriToBase64(imgInfo.uri);
    _setModifiedImage({ base64: `${BASE64_PREFIX}${originalImageBase64}`, width: imgInfo.width, height: imgInfo.height });
    console.info(`Modified Image was set to ${imgInfo.uri}`);
  };

  /* ******************** WebView Functions ******************** */
  const _sendWebViewMessage = useCallback(
    (message: OutboundMessage): void => {
      if (webViewRef.current) {
        console.log("sending", message.functionName, message.points);
        webViewRef.current.postMessage(JSON.stringify(message));
      } else {
        console.log("WebView ref not available");
      }
    },
    [webViewRef.current]
  );

  const _handleInboundWebViewMessage = (data: string): void => {
    try {
      const { loading, base64, points, functionName, error } = JSON.parse(data) as InboundMessage;
      console.info("Receiving something");
      if (loading) {
        console.info(`Receiving loading message from: ${functionName}`);
        _setIsLoading(true);
      }

      if (!loading && !error && base64) {
        console.info(`Receiving data message from: ${functionName}`);

        _handleModifyImage(base64);
        _setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* ******************** Internal Functions ******************** */
  const _handleModifyImage = (base64: string) => {
    _setModifiedImage((prevState) => (prevState ? { ...prevState, base64 } : prevState));
  };

  const _handlePerspectiveCrop = () => {
    if (modifiedImage && cropPoints) {
      _sendWebViewMessage({
        base64: modifiedImage.base64,
        points: adjustPointsByRatios(cropPoints, cropViewWidthRatio, cropViewHeightRatio),
        functionName: FunctionName.perspectiveCrop,
      });
    }
  };

  const _handleGrayScale = () => {
    if (modifiedImage) {
      _sendWebViewMessage({ base64: modifiedImage.base64, functionName: FunctionName.grayScale });
    }
  };

  const _clearState = () => {
    _setCropPoints(null);
    _setManipulationStage(ManipulationStage.VIEW);
    _setIsLoading(false);
    _setModifiedImage(null);
  };

  const _handleDoneCommand = async () => {
    if (modifiedImage) {
      const imgUri = await convertFromBase64ToUri(modifiedImage.base64);
      _setReturnImage(imgUri);
      _clearState();
    }
  };

  /* ******************** Effects ******************** */
  useEffect(() => {
    if (modifiedImage) {
      _setCropPoints({
        topLeft: { x: INITIAL_CROP_POINTS_GAP, y: INITIAL_CROP_POINTS_GAP },
        topRight: { x: cropViewDims.width - INITIAL_CROP_POINTS_GAP, y: INITIAL_CROP_POINTS_GAP },
        bottomRight: { x: cropViewDims.width - INITIAL_CROP_POINTS_GAP, y: cropViewDims.height - INITIAL_CROP_POINTS_GAP - CONTROLS_BAR_HEIGHT },
        bottomLeft: { x: INITIAL_CROP_POINTS_GAP, y: cropViewDims.height - INITIAL_CROP_POINTS_GAP - CONTROLS_BAR_HEIGHT },
      });
      console.info(`Crop points were initialized to`, {});
      StatusBar.setHidden(true);
    } else {
      StatusBar.setHidden(false);
    }
  }, [modifiedImage]);

  useLayoutEffect(() => {
    _setCropViewDims({
      width: windowWidth - EDITOR_VIEW_GAP * 2,
      height: windowHeight - CONTROLS_BAR_HEIGHT * 2 - EDITOR_VIEW_GAP * 2,
    });
  }, [windowHeight, windowWidth]);

  /* ******************** JSX ******************** */
  return (
    <MainContext.Provider
      value={{
        setImage,
        cropPoints,
        returnImage,
        manipulationStage,
        _clearState,
        modifiedImage,
        _handleGrayScale,
        _handlePerspectiveCrop,
        _setCropPoints,
        _setManipulationStage,
        _handleDoneCommand,
        cropViewDims,
        isLoading,
      }}
    >
      <WebView
        ref={webViewRef}
        allowFileAccessFromFileURLs
        allowingReadAccessToURL={FileSystem.documentDirectory || undefined}
        allowUniversalAccessFromFileURLs
        originWhitelist={["*"]}
        containerStyle={{ display: "none", height: 0, width: 0 }}
        style={{ display: "none", height: 0 }}
        javaScriptEnabled
        domStorageEnabled
        allowFileAccess
        cacheEnabled={false}
        onLoad={() => console.log("WebView Loaded")}
        source={{
          html: require("../dst.js").htmlString,
        }}
        onMessage={(event) => {
          _handleInboundWebViewMessage(event.nativeEvent.data);
        }}
      />
      {children}
    </MainContext.Provider>
  );
};
