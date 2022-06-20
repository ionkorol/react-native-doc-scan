import { Button, SafeAreaView, StyleSheet, StatusBar, View } from "react-native";
import React from "react";

import { KorolDocScan } from "@korol/rn-doc-scan";
import { Home } from "./src/Home";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="red" />
      <SafeAreaView style={{ flex: 1, backgroundColor: "pink", position: "relative" }}>
        <KorolDocScan>
          <Home />
        </KorolDocScan>
      </SafeAreaView>
    </View>
  );
}
