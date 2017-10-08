import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Image} from 'react-native';
import {ImageAsset} from "../values/ImageAsset";

export default class CircularImage extends Component{
  state = {
    showPlaceholder: true
  };

  _getImageFromUrl = () => {
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
// Better to maintain, in case you wanna change its radius.
const radius = 48;

const styles = StyleSheet.create({
  circularImage: {
    width: radius,
    height: radius,
    borderRadius: radius/2
  }
});

CircularImage.propTypes = {
  url: PropTypes.string
};
