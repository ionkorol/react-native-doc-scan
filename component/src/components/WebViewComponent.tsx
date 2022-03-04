import React, { useEffect, useRef } from "react";
import WebView from "react-native-webview";
import { InboundMessage, OutboundMessage } from "../types/types";
import * as FileSystem from "expo-file-system";
import { handleFindCorners, handleGrayScale, handlePerspectiveCrop, onFindCorners, onGrayScale, onPerspectiveCrop } from "../lib/observables";

export const WebViewComponent: React.FC = () => {
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

  console.log();

  return (
    <WebView
      ref={webViewRef}
      allowFileAccessFromFileURLs
      allowingReadAccessToURL={FileSystem.documentDirectory || undefined}
      originWhitelist={["*"]}
      containerStyle={{ display: "none", height: 0, width: 0 }}
      style={{ display: "none", height: 0 }}
      javaScriptEnabled
      domStorageEnabled
      allowFileAccess
      source={{
        html: require("../dst.js").htmlString,
      }}
      onMessage={(event) => {
        handleInboundMessage(event.nativeEvent.data);
      }}
    />
  );
};
