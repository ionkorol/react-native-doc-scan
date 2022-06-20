import * as FileSystem from "expo-file-system";
import { FOLDER_NAME } from "../constants/files";

export const downloadFiles = async () => {
  const htmlLocation = `${FileSystem.documentDirectory}${FOLDER_NAME}/index.html`;
  const jsLocation = `${FileSystem.documentDirectory}${FOLDER_NAME}/bundle.js`;
  const opencvLocation = FileSystem.documentDirectory + "rn-doc-scan/opencv.js";
  const folderLocation = FileSystem.documentDirectory + "rn-doc-scan";

  const folderLocationInfo = await FileSystem.getInfoAsync(folderLocation);
  const htmlLocationInfo = await FileSystem.getInfoAsync(htmlLocation);
  const jsLocationInfo = await FileSystem.getInfoAsync(jsLocation);
  const opencvLocationInfo = await FileSystem.getInfoAsync(opencvLocation);
  try {
    if (!folderLocationInfo.exists) {
      await FileSystem.makeDirectoryAsync(folderLocation);
    }
    console.log("Download Started");
    if (!htmlLocationInfo.exists) {
      const res = await FileSystem.downloadAsync("http://10.13.102.234:5555/index.html", htmlLocation);
      console.log("Downloaded HTML", res);
    }
    if (!jsLocationInfo.exists) {
      const res2 = await FileSystem.downloadAsync("http://10.13.102.234:5555/bundle.js", jsLocation);
      console.log("Downloaded JS", res2);
    }
    if (!opencvLocationInfo.exists) {
      const res1 = await FileSystem.downloadAsync("https://docs.opencv.org/4.5.0/opencv.js", opencvLocation);
    }
    console.log("Download Ended");
  } catch (error) {
    console.log(error);
  }
  return htmlLocation;
};
