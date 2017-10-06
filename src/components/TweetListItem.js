import React, {PureComponent} from 'react';
import {StyleSheet, View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import CircularImage from "./CircularImage";
import {ColorAsset} from "../values/ColorAsset";
import {ImageAsset} from "../values/ImageAsset";
import TweetMediaType from "../values/TweetMediaType";
import DateUtils from "../utils/DateUtils";

export default class TweetListItem extends PureComponent{

  item;

  constructor(props){
    super(props);

    this.item = props.item;
    this._getMediaType = this._getMediaType.bind(props);
    this._itemHasMedia = this._itemHasMedia.bind(props);
  }

  _onPressItem = () => {
    this.props.onPressItem(this.item);
  };

  //@_getMediaType() -> Image{
  _getMediaType(){
    if(this.item.media.type == TweetMediaType.PHOTO)
      return ImageAsset.photo;
    else (this.item.media.type == TweetMediaType.VIDEO)
      return ImageAsset.video;
  }

  //@_itemHasMedia() -> boolean
  _itemHasMedia(){
    return this.item.media.type != TweetMediaType.NONE;
  }

  render() {
    return (
      <TouchableWithoutFeedback style={{flex: 1}} onPress={this._onPressItem}>
        <View style={styles.mainContainer}>

          <View style={styles.imageContainer}>
            <CircularImage url={this.item.user.userProfileImageUrl}/>
          </View>

          <View style={styles.contentContainer}>
            <View style={{flexDirection: "row"}}>
              <Text style={styles.userName}>{this.item.user.userName}</Text>
              <Text style={styles.userScreenName}>{"@"+this.item.user.userScreenName} </Text>
            </View>
            <Text style={styles.tweetText} numberOfLines={2}>{this.item.content.text}</Text>
            <View style={{flexDirection: "row"}}>
              <Image style={styles.badge} source={ImageAsset.hashtag}/>
              <Text style={styles.badgeText}>{this.item.content.hashtags.length}</Text>
              <Image style={styles.badge} source={ImageAsset.at}/>
              <Text style={styles.badgeText}>{this.item.content.userMentions.length}</Text>
              <Image style={this._itemHasMedia() ? styles.badgeMedia : styles.displayNone} source={this._getMediaType()}/>
              <Text style={styles.tweetDate}>{DateUtils.getStringFromDate(this.item.createdAt)}</Text>
            </View>
          </View>

        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
  },
  imageContainer: {
    flexDirection: 'column',
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  userName: {
    color: ColorAsset.black,
    fontWeight: 'bold'
  },
  userScreenName: {
    marginLeft: 8
  },
  tweetText: {
    height: 40,
  },
  badge: {
    width: 16,
    height: 16,
    margin: 2,
  },
  badgeMedia: {
    width: 20,
    height: 16,
    margin: 2,
  },
  badgeText: {
    marginRight: 16
  },
  tweetDate: {
    marginLeft: 'auto'
  },
  displayNone: {
    display: 'none'
  }
});