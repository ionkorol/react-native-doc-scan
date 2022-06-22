import React, { useContext, useState } from "react";
import { Button, Image, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as RNFS from "react-native-fs";
import { useKorolDocScan } from "@koroldev/rn-image-crop";

export const Home: React.FC = () => {
  const { setImage, cropPoints, returnImage } = useKorolDocScan();
  // const [img, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({});
    if (!res.cancelled) {
      console.log(res.height, res.width);
      setImage({ ...res });
    }
  };

  // console.log(img);

  const takePicture = async () => {
    const res = await ImagePicker.launchCameraAsync({ base64: true });
    if (!res.cancelled) {
      try {
        // Crop(
        //   {
        //     topLeft: { x: 10, y: 10 },
        //     topRight: { x: 10, y: 10 },
        //     bottomLeft: { x: 10, y: 10 },
        //     bottomRight: { x: 10, y: 10 },
        //   },
        //   res.uri,
        //   (path) => {
        //     console.log(path);
        //     setImage(`file//${path}`);
        //   }
        // );
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Button title="Pick Image" onPress={pickImage} />
      <View style={{ borderWidth: 1, padding: 50 }}></View>
    </>
  );
};
