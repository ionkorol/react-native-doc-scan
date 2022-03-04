import React from "react";
import { StyleSheet, View } from "react-native";
import { CloseButton, DoneButton } from "./components";

export const TopControls: React.FC = () => {
  return (
    <View style={styles.container}>
      <CloseButton />
      <DoneButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: "#302e3b",
  },
  actionControls: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
