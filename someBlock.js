import React from 'react';
import {
  ToastAndroid,
  View,
  Text,
  Button
} from 'react-native';

let outsideBlockVar="world";
const block = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  <Text>{this.asyncData} Hello {outsideBlockVar} {this.movies}</Text>
  <Text>{this.checkStuff}</Text>
  <Button
    title={this.blockButtonName}
    onPress={() =>
      testingFunction(true)
    }
  /></View>
);
export default block;
