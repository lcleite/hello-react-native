import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Image} from 'react-native';
import {ImageAsset} from "../values/ImageAsset";

export default class CircularImage extends Component{

  state = {
    showPlaceholder: true
  };

  constructor(props){
    super(props);
    this._bindMethods();
  }

  _bindMethods() {
    this._getImageFromUrl = this._getImageFromUrl.bind(this);
  }

  //@_getImageFromUrl() -> Image | Object{
  _getImageFromUrl(){
    if(this.state.showPlaceholder)
      return ImageAsset.placeholder;
    else
      return {uri: this.props.url};
  }

  render() {
    return (
      <Image style={styles.circularImage}
             source={this._getImageFromUrl()}
             onLoad={() => this.setState({showPlaceholder: false})} />
    );
  }
}

const styles = StyleSheet.create({
  circularImage: {
    width: 48,
    height: 48,
    borderRadius: 48/2
  }
});

CircularImage.propTypes = {
  url: PropTypes.string
};