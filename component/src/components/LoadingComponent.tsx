import React from "react";
import { View, ActivityIndicator } from "react-native";

interface Props {
  isLoading: boolean;
}

export const LoadingComponent: React.FC<Props> = ({ isLoading }) => {
  if (isLoading) {
    return (
      <View
        style={{
          position: "absolute",
          height: "100%",
          backgroundColor: "#00000050",
          zIndex: 99,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator color="red" />
      </View>
    );
  }
  return <></>;
};
