
import React, {Component} from 'react';
import {Platform, StyleSheet, ScrollView, View, Text, Image, ActivityIndicator, TouchableWithoutFeedback, Linking} from 'react-native';
import CircularImage from "../components/CircularImage";
import DateUtils from "../utils/DateUtils";
import {ColorAsset} from "../values/ColorAsset";
import TweetMediaType from "../values/TweetMediaType";
import {ImageAsset} from "../values/ImageAsset";

export default class TweetScene extends Component{

  tweet; //:Tweet

  state = {
    loadingMedia: true
  };

  constructor(props) {
    super(props);
    this.tweet = props.tweet;
    this._bindMethods();
  }

  _bindMethods() {
    this._getTweetHashtags = this._getTweetHashtags.bind(this);
    this._getTweetMentions = this._getTweetMentions.bind(this);
    this._getTweetLinks = this._getTweetLinks.bind(this);
    this._tweetHasMedia = this._tweetHasMedia.bind(this);
    this._tweetHasHashtags = this._tweetHasHashtags.bind(this);
    this._tweetHasMentions = this._tweetHasMentions.bind(this);
    this._tweetHasLinks = this._tweetHasLinks.bind(this);
    this._getTweetClickableLinks = this._getTweetClickableLinks.bind(this);
    this._tweetHasLoadedVideo = this._tweetHasLoadedVideo.bind(this);
    this._playVideo = this._playVideo.bind(this);
  }

  _getTweetHashtags(){
    return this._getListValues(this.tweet.content.hashtags, "#");
  }

  _getTweetMentions(){
    return this._getListValues(this.tweet.content.userMentions, "@");
  }

  _getTweetLinks(){
    return this._getListValues(this.tweet.content.links, "");
  }

  _tweetHasLoadedVideo(){
    return (this.tweet.media.type == TweetMediaType.VIDEO && !this.state.loadingMedia);
  }

  //@_getListValues(list: string[], prefix: string) -> string
  _getListValues(list, prefix){
    let values = "";

    for(let i = 0; i < list.length; i++){
      values += (prefix + list[i]);

      if(i != list.length - 1)
        values += ", ";
    }

    return values;
  }

  _tweetHasMedia(){
    return this.tweet.media.type != TweetMediaType.NONE;
  }

  _tweetHasHashtags(){
    return this.tweet.content.hashtags.length > 0;
  }

  _tweetHasMentions(){
    return this.tweet.content.userMentions.length > 0;
  }

  _tweetHasLinks(){
    return this.tweet.content.links.length > 0;
  }

  _playVideo() {
    Linking.openURL(this.tweet.media.videoUrl);
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.userDetailsContainer}>
            <CircularImage url={this.tweet.user.userProfileImageUrl}/>
            <View style={{marginLeft: 16, flexDirection: "column"}}>
              <Text style={styles.userName}>{this.tweet.user.userName}</Text>
              <Text style={styles.userScreenName}>{"@"+this.tweet.user.userScreenName} </Text>
            </View>
          </View>
          <Text style={styles.tweetDate}>{DateUtils.getStringFromDate(this.tweet.createdAt)}</Text>
          <Text style={styles.tweetText}>{this.tweet.content.text}</Text>
          <TouchableWithoutFeedback disabled={!this._tweetHasLoadedVideo()} onPress={this._playVideo}>
            <View style={this._tweetHasMedia() ? styles.mediaContainer : styles.displayNone}>
                <ActivityIndicator size="large" color={ColorAsset.colorPrimary}
                                   style={this.state.loadingMedia ? styles.loadingIndicator : styles.displayNone}/>
                <Image style={this.state.loadingMedia ? styles.displayNoneImageLoading : styles.mediaImage}
                       source={{uri: this.tweet.media.photoUrl}}
                       resizeMode="contain" onLoad={() => this.setState({loadingMedia: false})
                       }/>
                <Image style={this._tweetHasLoadedVideo() ? styles.mediaPlayButton : styles.displayNone}
                       source={ImageAsset.videoPlay}/>
            </View>
          </TouchableWithoutFeedback>

          <View style={this._tweetHasHashtags() ? styles.listContainer : styles.displayNone}>
            <Text>Hashtags</Text>
            <Text>{this._getTweetHashtags()}</Text>
          </View>
          <View style={this._tweetHasMentions() ? styles.listContainer : styles.displayNone}>
            <Text>Mentions</Text>
            <Text>{this._getTweetMentions()}</Text>
          </View>
          <View style={this._tweetHasLinks() ? styles.listContainer : styles.displayNone}>
            <Text>Links</Text>
            {this._getTweetClickableLinks()}
          </View>
        </View>
      </ScrollView>
    );
  }

  //@_getTweetClickableLinks() -> Component[]
  _getTweetClickableLinks(){
    const clickableLinks = this.tweet.content.links.map((link, index) => {
      return(
        <TouchableWithoutFeedback key={index} onPress={() => Linking.openURL(link)}>
          <View>
            <Text style={styles.link}>{link}</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    });

    return clickableLinks;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorAsset.white,
  },
  subContainer: {
    flex: 1,
    flexDirection: 'column',
    marginBottom: 16
  },
  userDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  userName: {
    color: ColorAsset.black,
    fontWeight: 'bold'
  },
  userScreenName: {

  },
  tweetDate: {
    marginLeft: 16,
  },
  tweetText: {
    color: ColorAsset.black,
    fontSize: 18,
    padding: 16,
  },
  mediaContainer: {
    flexDirection: 'column',
    backgroundColor: ColorAsset.black,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    height: 320,
  },
  listContainer: {
    flexDirection: 'column',
    marginTop: 16,
    marginRight: 16,
    marginLeft: 16
  },
  loadingIndicator: {
    display: 'flex',
    flex: 1,
    alignSelf: 'stretch',
  },
  mediaImage: {
    flex: 1,
    alignSelf: 'stretch',
  },
  mediaPlayButton: {
    position: 'absolute',
    width: 64,
    height: 64,
  },
  link: {
    color: ColorAsset.colorAccent,
    textDecorationLine: 'underline',
  },
  displayNone: {
    display: 'none'
  },
  displayNoneImageLoading: {
    ...Platform.select({
      ios: {
        width: 1,
        height: 1,
      },
      android: {
        display: 'none'
      },
    })
  }
});