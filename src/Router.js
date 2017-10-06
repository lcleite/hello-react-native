import React, {Component} from 'react';
import {View, StatusBar, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import {Actions} from 'react-native-router-flux';
import MainScene from "./scenes/MainScene";
import TweetScene from "./scenes/TweetScene";
import SettingsScene from "./scenes/SettingsScene";
import {ImageAsset} from "./values/ImageAsset";
import {ColorAsset} from "./values/ColorAsset";

export default class RouterComponent extends Component{

  //@renderSettingsButton() -> Component{
  renderSettingsButton(){
    return(
      <TouchableOpacity onPress={()=>Actions.settings()}>
        <Image style={styles.settingsButton} source={ImageAsset.settings} resizeMode="contain"/>
      </TouchableOpacity>
    );
  }

  render() {
    return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={ColorAsset.colorPrimary} barStyle="light-content"/>
      <Router navigationBarStyle={styles.navigationBarDefault} titleStyle={styles.navigationTitle} navBarButtonColor={ColorAsset.white}>
        <Scene key="root">
          <Scene key="main" renderRightButton={this.renderSettingsButton()}
                 component={MainScene} title="Twitter Search" initial/>
          <Scene key="tweet" navigationBarStyle={styles.navigationBarElevation} component={TweetScene} title="Tweet Details"/>
          <Scene key="settings" navigationBarStyle={styles.navigationBarElevation} component={SettingsScene} title="Settings"/>
        </Scene>
      </Router>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  navigationBarDefault: {
    backgroundColor: ColorAsset.colorPrimary,
    shadowOpacity: 0,
    elevation: 0,
  },
  navigationBarElevation: {
    backgroundColor: ColorAsset.colorPrimary,
  },
  navigationTitle: {
    color: ColorAsset.white,
  },
  settingsButton:{
    width: 24,
    height: 24,
    marginRight: 16,
  },
});