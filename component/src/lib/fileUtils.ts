import * as FileSystem from "expo-file-system";
import { BASE64_PREFIX, FOLDER_NAME } from "../constants/files";

export const convertFromUriToBase64 = async (uri: string) => {
  const base64 = await FileSystem.readAsStringAsync(uri, { encoding: "base64" });
  return base64;
};

export const convertFromBase64ToUri = async (base64: string) => {
  let currentBase64 = base64;
  const directory = `${FileSystem.cacheDirectory}${FOLDER_NAME}`;
  const directoryInfo = await FileSystem.getInfoAsync(directory);
  if (!directoryInfo.exists) {
    await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
  }
  const newUri = `${directory}/${Date.now()}.png`;
  currentBase64 = currentBase64.replace(BASE64_PREFIX, "");

  await FileSystem.writeAsStringAsync(newUri, currentBase64, { encoding: "base64" });
  return newUri;
};
