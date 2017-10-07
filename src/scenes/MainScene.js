
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native'
import {SearchBar} from 'react-native-elements'
import GetTweetsTask from "../tasks/GetTweetsTask";
import TweetList from "../components/TweetList";
import {ColorAsset} from "../values/ColorAsset";

export default class MainScene extends Component{

  lastQuery = ""; //:string

  state = {
    tweets: [],
    refreshing: false,
    searchQuery: ""
  };

  constructor(props){
    super(props);
    this._bindMethods();
  }

  _bindMethods() {
    this.searchSubmit = this.searchSubmit.bind(this);
    this.refreshQuery = this.refreshQuery.bind(this);
    this._getTweets = this._getTweets.bind(this);
    this._showClearIcon = this._showClearIcon.bind(this);
  }

  async _getTweets(query) {
    let task = new GetTweetsTask(query);
    let tweets = await task.run();

    this.setState({refreshing: false, tweets: tweets});
  }

  searchSubmit(){
    this.lastQuery = this.state.searchQuery;
    this._getTweets(this.state.searchQuery);
  }

  refreshQuery(){
    if (this.lastQuery.length > 0)
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
      <View style={styles.container}>
        <SearchBar
          containerStyle={styles.searchContainer}
          inputStyle={styles.searchInput}
          icon={icons.icon}
          clearIcon={this._showClearIcon()}
          placeholderTextColor={ColorAsset.grayText}
          placeholder="Search"
          onSubmitEditing={this.searchSubmit}
          value={this.state.searchQuery}
          onChangeText={(textInputValue) => this.setState({searchQuery: textInputValue})}
        />
        <TweetList
          style={{flex: 1}} data={this.state.tweets}
          refreshing={this.state.refreshing} onRefresh={this.refreshQuery}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorAsset.white
  },
  searchContainer: {
    backgroundColor: ColorAsset.colorPrimary,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    // Android only
    elevation: 4,
  },
  searchInput: {
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