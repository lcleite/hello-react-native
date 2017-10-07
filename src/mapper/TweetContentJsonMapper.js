import JsonMapper from "./JsonMapper";
import TweetContent from "../models/TweetContent";

export default class TweetContentJsonMapper extends JsonMapper{

  //@toModel(jsonObject: Object) -> TweetContent
  toModel(jsonObject) {
    let tweetContent = new TweetContent();
    let entities = jsonObject["entities"];

    tweetContent.text = jsonObject["text"];
    tweetContent.links = this._getLinks(entities["urls"]);
    tweetContent.userMentions = this._getUserMentions(entities["user_mentions"]);
    tweetContent.hashtags = this._getHashtags(entities["hashtags"]);

    return tweetContent;
  }

  //@_getLinks(urls: Object[]) -> string[]
  _getLinks(urls) {
    return this._getStringsFromArrayWithKey(urls, "expanded_url");
  }

  //@_getUserMentions(userMentions: Object[]) -> string[]
  _getUserMentions(userMentions) {
    return this._getStringsFromArrayWithKey(userMentions, "screen_name");
  }

  //@_getHashtags(hashtags: Object[]) -> string[]
  _getHashtags(hashtags) {
    return this._getStringsFromArrayWithKey(hashtags, "text");
  }

  //@_getStringsFromArrayWithKey(array: Object[]) -> string[]
  _getStringsFromArrayWithKey(array, key){
    let strings = [];

    for(let obj of array)
      strings.push(obj[key]);

    return strings;
  }
}