import { Button, SafeAreaView, StyleSheet, StatusBar, View } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import { ImageManipulation } from "./src/rnDocScan";
import { onEditImage } from "./src/rnDocScan/lib/observables";
import { WebViewComponent } from "./src/rnDocScan/components";

export default function App() {
  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      quality: 0.5,
    });
    if (!res.cancelled) {
      onEditImage.next({ base64: "data:image/jpeg;base64," + res.base64, size: { width: res.width, height: res.height } });
    }
  };

  const takePicture = async () => {
    const res = await ImagePicker.launchCameraAsync({ base64: true });
    if (!res.cancelled) {
      try {
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "pink", position: "relative" }}>
      <StatusBar backgroundColor="pink" />
      <ImageManipulation />
      <Button title="Pick Image" onPress={pickImage} />
      {/* <Button title="Take Pic" onPress={takePicture} /> */}
      <WebViewComponent />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    zIndex: 99,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
