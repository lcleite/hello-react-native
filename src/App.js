import React, { Component } from 'react';
import {View, Text} from 'react-native';
import RouterComponent from "./Router";

export default class App extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
    <View style={{flex: 1}}>
      <RouterComponent/>
    </View>
    );
  }
}