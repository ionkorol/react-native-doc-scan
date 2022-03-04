import React from "react";
import { Modal } from "react-native";
import { BottomControls, TopControls } from "./components";
import { EditorView } from "./components/EditorView";
import { useImageManipulation } from "./hooks/useImageManipulation";
import { useObservableLogic } from "./hooks/useObservableLogic";

export const ImageManipulation = () => {
  const { imageData } = useImageManipulation();
  useObservableLogic();

  return (
    <Modal visible={Boolean(imageData.base64)} style={{ backgroundColor: "gray" }}>
      <TopControls />
      <EditorView />
      <BottomControls />
    </Modal>
  );
};
