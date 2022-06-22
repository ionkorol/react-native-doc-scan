import { Button, SafeAreaView, StyleSheet, StatusBar, View } from "react-native";
import React from "react";

import { KorolDocScan } from "@koroldev/rn-image-crop";
import { Home } from "./src/Home";

export default function App() {
  return (
    <KorolDocScan>
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="red" />
        <SafeAreaView style={{ flex: 1, backgroundColor: "pink", position: "relative" }}>
          <Home />
        </SafeAreaView>
      </View>
    </KorolDocScan>
  );
}
