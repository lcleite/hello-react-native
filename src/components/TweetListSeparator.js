import React, {Component} from 'react';
import {View} from 'react-native';
import {ColorAsset} from "../values/ColorAsset";

export default class TweetListSeparator extends Component{

  render() {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: ColorAsset.graySeparator,
          marginLeft: "20%",
        }}
      />
    );
  }
}