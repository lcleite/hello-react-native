import JsonMapper from "./JsonMapper";
import TweetContent from "../models/TweetContent";

export default class TweetContentJsonMapper extends JsonMapper{

  //@toModel(jsonObject: JSONObject) -> TweetContent
  toModel(jsonObject) {
    let tweetContent = new TweetContent();
    let entities = jsonObject["entities"];

    tweetContent.text = jsonObject["text"];
    tweetContent.links = this._getLinks(entities["urls"]);
    tweetContent.userMentions = this._getUserMentions(entities["user_mentions"]);
    tweetContent.hashtags = this._getHashtags(entities["hashtags"]);

    return tweetContent;
  }


  //@_getLinks(urls: JSONArray) -> string[]
  _getLinks(urls) {
    let links = [];

    for(let i = 0; i < urls.length ; i++){
      let url = urls[i];

      links.push(url["expanded_url"]);
    }

    return links;
  }

  //@_getUserMentions(userMentions: JSONArray) -> string[]
  _getUserMentions(userMentions) {
    let users = [];

    for(let i = 0; i < userMentions.length ; i++){
      let user = userMentions[i];

      users.push(user["screen_name"]);
    }

    return users;
  }

  //@_getHashtags(hashtags: JSONArray) -> string[]
  _getHashtags(hashtags) {
    let tags = [];

    for(let i = 0; i < hashtags.length ; i++){
      let tag = hashtags[i];

      tags.push(tag["text"]);
    }

    return tags;
  }
}