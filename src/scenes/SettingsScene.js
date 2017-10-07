
import React, {Component} from 'react';
import {StyleSheet, AsyncStorage, View, Slider, Text} from 'react-native'
import {ColorAsset} from "../values/ColorAsset";
import StorageKey from "../values/StorageKey";
import PlatformUtils from "../utils/PlatformUtils";

export default class SettingsScene extends Component{

  state = {
    optionValue: 10
  };

  constructor(props){
    super(props);

    this._sliderValueUpdate = this._sliderValueUpdate.bind(this);
  }

  componentWillMount(){
    this._getOptionValueFromStorage();
  }

  async _getOptionValueFromStorage(){
    let optionValue = await AsyncStorage.getItem(StorageKey.maxTweets);
    if(optionValue == null)
      optionValue = "10";

    this._sliderValueUpdate(Number.parseInt(optionValue));
  }

  _sliderValueUpdate(value){
    this.setState({optionValue: value});
  };

  _sliderMaximumColor(){
    if (PlatformUtils.isPlatformIOS())
      return ColorAsset.grayText;
    else
      return ColorAsset.colorPrimary;
  }

  _sliderMinimumColor(){
    if (PlatformUtils.isPlatformIOS())
      return ColorAsset.colorPrimary;
    else
      return ColorAsset.grayText;
  }

  componentWillUnmount(){
    AsyncStorage.setItem(StorageKey.maxTweets, this.state.optionValue.toString());
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.optionTitle}>Tweets</Text>
        <View style={{flexDirection: "row"}}>
          <Slider style={{flex: 1}} thumbTintColor={ColorAsset.colorPrimary}
                  minimumTrackTintColor={this._sliderMinimumColor()} maximumTrackTintColor={this._sliderMaximumColor()}
                  minimumValue={5} maximumValue={15}
                  value={this.state.optionValue} step={1} onValueChange={this._sliderValueUpdate}/>
          <Text style={styles.optionValue}>{this.state.optionValue}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorAsset.white,
    padding: 16
  },
  optionTitle: {

  },
  optionValue: {
    color: ColorAsset.black,
    fontSize: 14,
    fontWeight: 'bold'
  },
});