import React, { useContext } from "react";
import { Modal, View } from "react-native";
import { BottomControls, TopControls } from "./components";
import { EditorView } from "./components/EditorView";
import { MainContext } from "./contexts/MainContext";

export const DocScanComponent = () => {
  /* ******************** Hooks ******************** */
  const { originalImage } = useContext(MainContext);

  /* ******************** Variables ******************** */
  const isOpen = Boolean(originalImage);

  /* ******************** JSX ******************** */
  if (isOpen) {
    return (
      <View style={{ position: "absolute", bottom: 0, left: 0, height: "100%", width: "100%", backgroundColor: "gray", zIndex: 99, elevation: 99 }}>
        <TopControls />
        <EditorView />
        <BottomControls />
      </View>
    );
  }
  return <></>;
};
