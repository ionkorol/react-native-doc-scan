import React, { useContext } from "react";
import { Modal } from "react-native";
import { BottomControls, TopControls } from "./components";
import { EditorView } from "./components/EditorView";
import { MainContext } from "./contexts/MainContext";

export const DocScanComponent = () => {
  /* ******************** Hooks ******************** */
  const { modifiedImage } = useContext(MainContext);

  /* ******************** Variables ******************** */
  const isOpen = Boolean(modifiedImage);

  /* ******************** JSX ******************** */
  if (!isOpen) {
    return <></>;
  }
  return (
    <Modal visible={isOpen} style={{ backgroundColor: "gray" }}>
      <TopControls />
      <EditorView />
      <BottomControls />
    </Modal>
  );
};
