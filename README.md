change $HOME in "android/local.properties" into proper SDK path
<pre><code>npm install
react-native run-android</code></pre>

 <br><br><h3>HOW TO: </h3><br>
Installation : <br>
First, we need to prepare environment ([Official tutorial](https://facebook.github.io/react-native/docs/getting-started.html)).  
In short (for Linux → Android) :
1. Open console and write :
<pre><code>npm install -g react-native-cli</code></pre>
2. Install [Android Studio](https://developer.android.com/studio/index.html) 
3. During installation make sure you check 
- Android SDK
- Android SDK Platform
- Android Virtual Device
4. Set up Android SDK and virtual device (you can use real phone as well). All below should be checked in System Settings → Android SDK window (under SDK Platform → expand Android 6.0 (Marshmallow)) :<br>
- Google APIs, Android SDK Platform 23, 
- Intel x86 Atom_64 System Image, 		
- Google APIs Intel x86 
- Atom_64 System Image
5. You can configure bash_profile file ($HOME/.bash_profile) by adding ANDROID_HOME src (if you do, you can skip creating file with path every time you start new project):<br>
<pre><code>
export ANDROID_HOME=$HOME/Android/Sdk 
export PATH=$PATH:$ANDROID_HOME/tools export 		
PATH=$PATH:$ANDROID_HOME/platform-tools
</code></pre>
6. Create virtual device by selecting the "x86 Images" tab, then look for the Marshmallow API Level 23, x86_64 ABI image with a Android 6.0 (Google APIs).

<br><br>You are setted up. Now you can create base project using console.
1. Creating project :
<pre><code>
react-native init TestProject
</code></pre>
2. Add file “local.properties” into “android” folder inside your project with SDK dir instead “$HOME” (you can find it in Android Studio SDK window)
<pre><code>
sdk.dir = $HOME/Android/Sdk
</code></pre>
3. Add to android/gradle.properties line below, if you want speed up app build:
<pre><code>
org.gradle.daemon=true
</code></pre>
4. Turn on virtual device by clicking on AVD Manager inside Android Studio and choosing proper mirror.
5. Turn on project in console (it's good to add "sudo" in case you need to install something during build)
<pre><code>
cd TestProject
react-native run-android
</code></pre>
6. You should find app called TestProject in app list on using phone. Click it. After some time you will see your project. This it it. Now you can edit App.js and index.js to change your app. 

Hot changes:<br>
<br><br>reactNative makes possible to see changes almost instantly. In base mode, you can select your virtual device and press double R when app is on screen to refresh it. It is possible to see changes without any refresh on your side by turning on "hot changes". To do it, follow instructions below:
1. Select your virtual device to be active window.
2. Press CTRL+M inside your reactNative app
3. Enable hot changes
From now on, you don't have to refresh your app to see changes.
<br>
React variables:<br>
Inside layout sections you can use {variable}. To prepare layout for dynamic changes, you need to set up at least one state in class constructor. Whenever {variable} value change, you need to ping layout about state changing for keeping it actual.
<pre><code>
constructor(props) {	
	super(props);		
	this.state = {anyState: 'some text'};	//setting at least one state is important  	
}
</code></pre>
and then somewhere in same class:
<pre><code>
this.setState({anyState: 'anyValue'})
</code></pre>
You should create function inside layout class, after constructor, to control layout states. It is good to use states itself to change variables with instant refresh.
States can be used in many ways to resolve dynamic changes inside layout and are important part of reactNative (state driven).

<br><br>Use global variables like "this.variableOfAnyType" that will be public across all app files without any additional stuff. 
<pre><code>
&lt;Button tittle={stringVar} &gt; 
//to change still!!
this.globalID = 1;
</code></pre>

<br><br>AsyncStorage :<br>
You can save values in already implemented serialized structure called AsyncStorage. You need to do two things to use it.
1. To save data you need to import it and use async function as well :
<pre><code>
import {  AsyncStorage } from 'react-native';
testAsync = async(someStr) =&gt; {
  try {
    await AsyncStorage.setItem('@MySuperStore:key', 'someStr.');
  } catch (error) { }
};
testAsync(“hello async”); //you can call it whenever you want
</code></pre>
2. To read data, you need to call async function as well :
<pre><code>
readAsyncDataFunction = async(navigate) =&gt; {
   try {
	const val = await AsyncStorage.getItem('@MySuperStore:key');
	if ( val !== null){
		console.log(val); // We have data!!
	}
   } catch (error) {  }
}
</code></pre>
Only async functions can use "await" before calling another async function to wait for return response

<br><br>Widgets :<br>
To add widgets, import them into file you are using, just like this :
<pre><code>
import { Text } from 'react-native';
import { Text, Toast } from 'react-native'; //or multiple	
</code></pre>
Then use them whenever you want to :
<pre><code>
ToastAndroid.show(' Good job!', ToastAndroid.SHORT);
</code></pre>
Some of the extensions are not in basic modules, so you need to install it with node.js :
<pre><code>
npm install react-native-communications
</code></pre>
[React-native-communications](https://github.com/anarchicknight/react-native-communications) makes possible to email, choose phone dial etc. You need to import it after as well like below:
<pre><code>
import Communications from 'react-native-communications';
Communications.phonecall('0123456789', true);
</code></pre>
Webview (remember to import in proper place) uses source arguments :
<pre><code>
 &lt;WebView
	source={{ uri: 'https://github.com/facebook/react-native' }}
	style={{flex:1}}
/&gt;
</code></pre>
Text Input with text changing handler (and state changing) looks like this :
<pre><code>
 &lt;TextInput
	style={{height: 40}}
	placeholder="Type here to translate!"
	onChangeText={(text) =&gt; this.setState({text})}
/&gt;
</code></pre>

<br><br>reactNative is using [FETCH](https://facebook.github.io/react-native/docs/network.html) to retrieve online data (you can use xhttp requests as well). Below is simple fetch example :
<pre><code>
async function getMoviesFromApi() {
	try {
		this.movies = "aba";
		let response = await fetch('https://facebook.github.io/react-native/movies.json');
		let responseJson = await response.json();
  		return responseJson.movies;
	} catch(error) { console.error(error); }
}
</code></pre>
As you can see, you need to handle json type variable.

<br><br>Navigate :<br>
This is where it gets a little bit more tricky. To do layout changes, I choose [react-navigation](https://reactnavigation.org/docs/intro/quick-start) what will be explained below in short (due to beta version - hot changes and navigate, you need to reload to see new version of app outside of default screen) :
1. Turn off app if running in console
2. Write in console, inside project where package.json is:
<pre><code>
npm install --save react-navigation
</code></pre>
3. And then, reinstall modules
<pre><code>
npm install
</code></pre>
4. Define layouts containing all XML objects:
<pre><code>
class HomeScreen extends React.Component {
	constructor(props) {	
		super(props);		
		this.state = {text: ''};	//setting at least one state is important  	
	}					//to make refresh possible
	static navigationOptions = {
		title: 'Welcome',
	};
	render() {
		const { navigate } = this.props.navigation;
		return (
			&lt;View style={{ flex: 1 }}&gt; &lt;OtherObjects style={{flex:1}}&gt; &lt;/View&gt; 
		); 
	} 
}
</code></pre>
5. Now we will make changes into App.js (you can turn on app as well now or after). Example below use two layouts screens defined before (HomeScreen and block). You need to delete
<pre><code>
export default class App extends Component &lt;{}&gt; { 
	render() {return (layout) } 
}
</code></pre>
line. It is not needed, because you need to handle multiple layouts now.
<pre><code>
import { DrawerNavigator } from 'react-navigation'; 
const RootDrawer = DrawerNavigator({
	Home: {
		screen: HomeScreen,
		navigationOptions: { drawerLabel: 'Home', }
	},
	Profile: {
		screen: block,
		navigationOptions: { drawerLabel: 'Profile' }
	},
});
export default RootDrawer;
</code></pre>
6. Now you can use
<pre><code>
navigate('Profile')
</code></pre>
function to navigate across screens. Example below show how to handle button callback as well:
<pre><code>
 &lt;Button
	title={d}
	onPress={() =&gt;
		buttonPressFunction(navigate) //  or just navigate('Profile')
	}
/&gt;
</code></pre>
And function somewhere outside XML:
<pre><code>
onDeleteBTN = (navigate) =&gt; {
	navigate('Profile')
}
</code></pre>

<br><br>Layout and class files :
To handle classes and layouts across multiple files, you need to do some changes. Remember to add flex to any XML object that contains others objects. <br>
0. Easiest way is to define function in file and then just import whole file:
<pre><code>
functionName = () =&gt; { //code here } //this go to new file with function
import  './src/file'; //easiest way is to add this line to App.js to be global
functionName()    // use this function in every .js file now
</code></pre>

<br><br>Class files :
1. Inside new layout files you need structure like this :
<pre><code>
import React from 'react';
import { additionalModules } from 'react-native';
class stuff extends Component { static abc(a){ } }
export default stuff;
</code></pre>
2. Now, when you have defined and exported class, you need to import it in file you want to use function abc and simple use it.
<pre><code>
import stuff from './src/file.js';
stuff.abc(1);
</code></pre>

<br><br>Layout files (to handle it, you need to use react navigation):
1. Inside new layout files you need structure like this :
<pre><code>
import React from 'react';
import { additionalModules } from 'react-native';
const layoutName = () =&gt; (
	 &lt;View style={{ flex: 1, otherCSS:value}}&gt;
		 &lt;XMLobjects style={{ flex: 1 }}&gt;
	 &lt;/View&gt;
);
export default layoutName;
</code></pre>
2. Inside file you want to use defined layout :
<pre><code>
import layoutName from './src/file.js';
</code></pre>
3. In file that handle screens navigator, swap local layout with layoutName inside DraweNavigator on “screen” section. Should look like this (first in order will be default layout):
<pre><code>
const RootDrawer = DrawerNavigator({
	Home: {
		screen: HomeScreen,
		navigationOptions: {
			drawerLabel: 'Home',
		}
	},
	Profile: {
		screen: layoutName,
		navigationOptions: {
			drawerLabel: 'Profile'
		}
	},
});
</code></pre>

<br><br>System targeting and styles:
To declare variables targeted for platform, use construction like this :
<pre><code>
const instructions = Platform.select({
	ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
	android: 'Double tap R on your keyboard to reload’,
});
</code></pre>
And then use it as react variable: 
<pre><code>
 &lt;Text style={styles.instructions}&gt;
	{instructions}
 &lt;/Text&gt;
const styles = StyleSheet.create({
	instructions: {		
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},				//you can add multiple styles in this place
});
</code></pre>

<br><br>Handling dynamic components :
You can use in XML sections your own classes that extends component of reactNative. You can pass to them whatever arguments you want to and they will be accesible under “props” variable. Example below show how to create blink text class :
<pre><code>
class Blink extends Component {
	constructor(props) {
		super(props);
		this.state = {showText: true};
		// Toggle the state every second
		setInterval(() =&gt; {
			this.setState(previousState =&gt; {
				return { showText: !previousState.showText };
			});
		}, 1000);
	}
	render() {
		let display = this.state.showText ? this.props.text : ' ';
		return (
			 &lt;Text&gt;{display} &lt;/Text&gt;
		);
	}
}
</code></pre>
And then add to XML section :
<pre><code>
 &lt;Blink text='I love to blink' /&gt;
</code></pre>

Check it all implemented on :
https://github.com/SzymonFilipowicz/reactNativeTutorial
