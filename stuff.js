import React, { Component } from 'react';
import {
  AppRegistry,
  ToastAndroid
} from 'react-native';

class stuff extends Component {
   static abc(a){
     a+=" stuff";
     return a;
   }}
export default stuff
//  OR
helloFunction = () => {
  ToastAndroid.show('Welcome!', ToastAndroid.SHORT);
}
