import {
  AppRegistry,
  ToastAndroid,
  AsyncStorage
} from 'react-native';
import App from './App';
import React, {
  Component
} from 'react';

AppRegistry.registerComponent('TestProject', () => App);


this.buttonName = "Swapped Button name"; //loaded after App.js
testAsync = async() => {
  try {
    await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
  } catch (error) { }
};
testAsync();
helloFunction();
