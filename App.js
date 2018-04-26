import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView,
  Button,
  ToastAndroid,
  TextInput,
  AsyncStorage
} from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import stuff from './stuff';
import block from './someBlock';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

this.asyncData="none";
this.blockButtonName = "aloha";
this.checkStuff = "where is my ";
this.movies = "none";

let testCounter=0;
this.buttonName="profile";
let testStringState = "Ma changes text";
var blinkInterval=new Array();
let intervalLength=1000;

class Blink extends Component {
  constructor(props) {
    super(props);
    this.state = {showText: true};
    blinkInterval.push(setInterval(() => {
      this.setState(previousState => {
        return { showText: !previousState.showText };
      });
    }, intervalLength));
  }
  render() {
    let display = this.state.showText ? this.props.text : ' ';
    return (
      <Text>{display}</Text>
    );
  }
}

async function loadMovie() {
  checkStuff=stuff.abc(checkStuff); //call function from other file
  try {
    const value = await AsyncStorage.getItem('@MySuperStore:key');
    if (value !== null){
      this.asyncData = value
    }
  } catch (error) {
    // Error retrieving data
  }
  //when changing layout, we should stop blinks
  //intervals to avoid warnnings

  await getMoviesFromApi(); //retrieve movie data async
}

function stopBlink() {
  let blinkLen = blinkInterval.length;
  for (i = 0; i < blinkLen; i++) {
    clearInterval(blinkInterval[i]);
  }
}


function setMovies(a){
  this.movies = a+" is first";
  buttonName=this.movies;
}
async function getMoviesFromApi() {
  try {
    this.movies = "waiting"; //will be laiting until loading will finish
    let response = await fetch('https://facebook.github.io/react-native/movies.json');
    let responseJson = await response.json();
    this.movies=responseJson.movies[0].title;
    ToastAndroid.show(this.movies, ToastAndroid.SHORT);
    return setMovies(this.movies);
  } catch(error) { console.error(error); }
}

testingFunction = (show) => {
  if(show)
    ToastAndroid.show('test function '+testCounter, ToastAndroid.SHORT);
  testCounter++;
}

//we can automatic call function when component is loaded or changeg
//like in Text component is calling function testingFunction
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: '', myText: 'next tab'};
  }
  changingScreen = async(navigate) => {
    stopBlink();
    navigate('Profile', { name: 'Bob' });
    //you can still pass navigate as variable
  }
  loadMovies = async() => {
    await loadMovie(); //wait for changes before set state
    this.setState({text: testStringState});
  }
  typing = () => {
    testingFunction(true)
  }
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Button
          title={buttonName}
          onPress={() =>
            {this.changingScreen(navigate)}}
        />
        <Button
          title="load movie"
          onPress={() =>
            {this.loadMovies()}}
        />
        <TextInput
            style={{height: 40}}
            placeholder="Type here to translate!"
            onChangeText={this.typing(), (text) => this.setState({text})}
        />
        <Text style={{padding: 10, fontSize: 42}}>
          {testingFunction(false)}
          {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
        </Text>
        <Text style={styles.instructions}>
          {instructions} //resolving target platform
        </Text>
        <WebView
            source={{ uri: 'https://github.com/facebook/react-native' }}
            style={{flex:1}}
        />
        <Blink text='I love to blink' />
        <Blink text='I love to blink2' />
      </View>
    );
  }
}

const RootDrawer = DrawerNavigator({
  //first in order is default screen
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      drawerLabel: 'Home',

    }
  },
  Profile: {
    screen: block,
    navigationOptions: {
      drawerLabel: 'Profile'
    }
  },
});
export default RootDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
