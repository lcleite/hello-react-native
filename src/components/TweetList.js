import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, FlatList, RefreshControl} from 'react-native';
import {Actions} from 'react-native-router-flux';
import TweetListItem from "./TweetListItem";
import TweetListSeparator from "./TweetListSeparator";
import {ColorAsset} from "../values/ColorAsset";

export default class TweetList extends Component{

  constructor(props){
    super(props);
    this._bindMethods();
  }

  _bindMethods() {
    this._getRefreshControl = this._getRefreshControl.bind(this);
  }

  _onPressItem(item){
    Actions.tweet({tweet: item});
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          data={this.props.data}
          extraData={this.props}
          renderItem={({item}) => <TweetListItem item={item} onPressItem={this._onPressItem}/>}
          ItemSeparatorComponent={TweetListSeparator}
          keyExtractor={(item, index) => index}
          refreshControl={this._getRefreshControl()}
        />
      </View>
    );
  }

  _getRefreshControl() {
    return(
      <RefreshControl
        refreshing={this.props.refreshing}
        onRefresh={this.props.onRefresh}
        colors={[ColorAsset.colorPrimary]}
      />
    );
  }
}

TweetList.propTypes = {
  data: PropTypes.array,
  refreshing: PropTypes.bool,
  onRefresh: PropTypes.any,
};