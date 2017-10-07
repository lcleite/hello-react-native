import {AppRegistry} from 'react-native';
import App from "./src/App";

AppRegistry.registerComponent('HelloReactNative', () => App);
// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */
//
// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View, Button
// } from 'react-native';
// import AppBar from "./src/components/AppBar";
//
// export default class App extends Component {
//
//   /*
//    https://stackoverflow.com/questions/35023879/react-native-access-this-prop-from-inside-function
//    */
//   xapa = "oi";
//   //
//
//   state = {
//     msg: "mssfff"
//   };
//
//   async getAlbums(){
//     let response = await fetch("https://rallycoding.herokuapp.com/api/music_albums");
//     // this.setState({msg: this.xapa});
//     let data = await response.json();
//
//     console.log(data);
//   }
//
//   // componentWillMount(){
//   //   this.getAlbums();
//   // }
//
//   constructor(props){
//     super(props);
//     this.getAlbums = this.getAlbums.bind(this);
//   }
//
//   render() {
//     return (
//       <View>
//         <AppBar title={this.state.msg}/>
//         <Button title={"Button"} onPress={this.getAlbums}/>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
//
// AppRegistry.registerComponent('HelloReactNative', () => App);
