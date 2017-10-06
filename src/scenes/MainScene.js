
import React, {Component} from 'react';
import {StyleSheet, AsyncStorage, View, Text} from 'react-native'
import {SearchBar} from 'react-native-elements'
import TweetJsonMapper from "../mapper/TweetJsonMapper";
import TweetList from "../components/TweetList";
import StorageKey from "../values/StorageKey";
import {ColorAsset} from "../values/ColorAsset";

export default class MainScene extends Component{

  lastQuery; //:string

  state = {
    tweets: [],
    refreshing: false,
    searchQuery: ""
  };

  constructor(props){
    super(props);

    this.searchSubmit = this.searchSubmit.bind(this);
    this.refreshQuery = this.refreshQuery.bind(this);
    this._getTweets = this._getTweets.bind(this);
    this._showClearIcon = this._showClearIcon.bind(this);
  }

  async _getTweets(query) {
    this.setState({refreshing: true, tweets: []});
    const OAUTH2_TOKEN = "AAAAAAAAAAAAAAAAAAAAANKm2QAAAAAA4egRyibPOIGTFLzy%2BhDnYDdr62o%3DcGtYhty15tRTVLwWjWux3S2rcP4cLxGoFEgJcissPmYOYkSikA";
    let response = await fetch("https://api.twitter.com/1.1/search/tweets.json?q=" + query, {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + OAUTH2_TOKEN
      }
    });

    let data = await response.json();
    let optionValue = await AsyncStorage.getItem(StorageKey.maxTweets);
    if(optionValue == null)
      optionValue = "10";
    let maxTweets = Number.parseInt(optionValue);

    let tweetMapper = new TweetJsonMapper();
    let tweetsData = data["statuses"];
    let tweets = [];

    for(let i = 0; i < tweetsData.length; i++){
      if(i == maxTweets)
        break;

      tweets.push(tweetMapper.toModel(tweetsData[i]));
    }

    this.setState({refreshing: false, tweets: tweets});
  }

  searchSubmit(){
    this.lastQuery = this.state.searchQuery;
    this._getTweets(this.state.searchQuery);
  }

  refreshQuery(){
    this._getTweets(this.lastQuery);
  }

  //@_showClearIcon() -> Object | boolean
  _showClearIcon(){
    if (this.state.searchQuery.length > 0)
      return icons.clearIcon;
    else
      return false;
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: ColorAsset.white}}>
        <SearchBar
          containerStyle={styles.containerStyle}
          inputStyle={styles.inputStyle}
          icon={icons.icon}
          clearIcon={this._showClearIcon()}
          placeholderTextColor={ColorAsset.grayText}
          placeholder="Search"
          onSubmitEditing={this.searchSubmit}
          value={this.state.searchQuery}
          onChangeText={(textInputValue) => {
            this.setState({searchQuery: textInputValue});
          }}
        />
        <TweetList
          style={{flex: 1}} data={this.state.tweets}
          refreshing={this.state.refreshing} onRefresh={this.refreshQuery}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: ColorAsset.colorPrimary,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    // Android
    elevation: 4,
    // iOS
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 10 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
  },
  inputStyle: {
    backgroundColor: ColorAsset.white,
    color: ColorAsset.black
  }
});

const icons = {
  icon: {
    color: ColorAsset.grayText,
    name: 'search'
  },
  clearIcon: {
    color: ColorAsset.grayText,
  }
};