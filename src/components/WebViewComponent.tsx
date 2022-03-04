import React, { useEffect, useRef, useState } from "react";
import WebView from "react-native-webview";
import { InboundMessage, OutboundMessage, Points } from "../types/types";
import * as FileSystem from "expo-file-system";
import { handleFindCorners, handleGrayScale, handlePerspectiveCrop, onFindCorners, onGrayScale, onPerspectiveCrop } from "../lib/observables";
import { downloadFiles } from "../lib/DownloadFiles";

export const WebViewComponent: React.FC = () => {
  const [isWebViewReady, _setIsWebViewReady] = useState(false);
  const [isFunctionLoading, _setIsFunctionLoading] = useState(false);
  const [uri, _setUri] = useState<string | undefined>(undefined);
  const webViewRef = useRef<WebView>(null);

  const sendMessage = (message: OutboundMessage): void => {
    console.log("sending", message.functionName, message.points);
    webViewRef.current?.postMessage(JSON.stringify(message));
  };

  const handleInboundMessage = (data: string): void => {
    const { loading, base64, points, functionName, error } = JSON.parse(data) as InboundMessage;
    console.log("receiving", loading, error, functionName);

    if (!Boolean(loading) && !Boolean(error)) {
      if (functionName === "findCorners") {
        onFindCorners.next(points);
      } else if (functionName === "perspectiveCrop") {
        if (base64) {
          onPerspectiveCrop.next(base64);
        } else {
          console.log("perspectiveCrop error");
        }
      } else if (functionName === "grayScale") {
        if (base64) {
          onGrayScale.next(base64);
        } else {
          console.log("grayScale error");
        }
      }
    }
  };

  useEffect(() => {
    const findCornersSubscription = handleFindCorners.asObservable().subscribe((base64) => {
      sendMessage({ base64, functionName: "findCorners" });
    });

    const perspectiveCropSubscription = handlePerspectiveCrop.asObservable().subscribe(({ base64, points }) => {
      sendMessage({
        base64,
        points,
        functionName: "perspectiveCrop",
      });
    });

    const grayScaleSubscription = handleGrayScale.asObservable().subscribe((base64) => {
      sendMessage({
        base64,
        functionName: "grayScale",
      });
    });

    return () => {
      findCornersSubscription.unsubscribe();
      perspectiveCropSubscription.unsubscribe();
      grayScaleSubscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    downloadFiles().then(_setUri);
  }, []);

  return (
    <WebView
      ref={webViewRef}
      onLoadEnd={() => _setIsWebViewReady(true)}
      allowFileAccessFromFileURLs
      allowingReadAccessToURL={FileSystem.documentDirectory || undefined}
      originWhitelist={["*"]}
      containerStyle={{ display: "none", height: 0, width: 0 }}
      style={{ display: "none", height: 0 }}
      javaScriptEnabled
      domStorageEnabled
      allowFileAccess
      source={{
        uri: uri || "",
      }}
      onMessage={(event) => {
        handleInboundMessage(event.nativeEvent.data);
      }}
    />
  );
};
