
import React, {Component} from 'react';
import {StyleSheet, View, Slider, Text} from 'react-native'
import {ColorAsset} from "../values/ColorAsset";
import PlatformUtils from "../utils/PlatformUtils";
import StorageUtils from "../utils/StorageUtils";

export default class SettingsScene extends Component{

  state = {
    optionValue: 10
  };

  constructor(props){
    super(props);
    this._bindMethods();
  }

  _bindMethods() {
    this._sliderValueUpdate = this._sliderValueUpdate.bind(this);
  }

  componentWillMount(){
    this._getOptionValueFromStorage();
  }

  async _getOptionValueFromStorage(){
    let optionValue = await StorageUtils.getMaxTweetsOptionValue();
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
    StorageUtils.setMaxTweetsOptionValue(this.state.optionValue);
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