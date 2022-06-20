import React, { useContext } from "react";
import { Button } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useKorolDocScan } from "@korol/rn-doc-scan";

export const Home: React.FC = () => {
  const { setImage } = useKorolDocScan();

  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      quality: 0.5,
    });
    if (!res.cancelled) {
      console.log("test1", res);
      setImage({ uri: res.uri, width: res.width, height: res.height });
      console.log("test2");
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

  return <Button title="Pick Image" onPress={pickImage} />;
};
