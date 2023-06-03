import {StyleSheet, View} from 'react-native'
import React from 'react'
import QRCodeScanning from "./QRCodeScanning";
const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
});

export default function HomeScreen() {
  return (
    <View style={[styles.center, {top: 50}]}>
      {/* <QRCodeScanning/> */}
    </View>
  );
}
