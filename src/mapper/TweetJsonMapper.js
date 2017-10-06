import JsonMapper from "./JsonMapper";
import TwitterUserJsonMapper from "./TwitterUserJsonMapper";
import TweetContentJsonMapper from "./TweetContentJsonMapper";
import TweetMediaJsonMapper from "./TweetMediaJsonMapper";
import DateUtils from "../utils/DateUtils";
import Tweet from "../models/Tweet";

export default class TweetJsonMapper extends JsonMapper{

  _twitterUserJsonMapper;
  _tweetContentJsonMapper;
  _tweetMediaJsonMapper;

  constructor(){
    super();
    this._twitterUserJsonMapper = new TwitterUserJsonMapper();
    this._tweetContentJsonMapper = new TweetContentJsonMapper();
    this._tweetMediaJsonMapper = new TweetMediaJsonMapper();
  }

  //@toModel(jsonObject: JSONObject) -> Tweet
  toModel(jsonObject) {
    let tweet = new Tweet();

    tweet.createdAt = DateUtils.createDateFromString(jsonObject["created_at"]);
    tweet.user = this._twitterUserJsonMapper.toModel(jsonObject);
    tweet.content = this._tweetContentJsonMapper.toModel(jsonObject);
    tweet.media = this._tweetMediaJsonMapper.toModel(jsonObject);

    return tweet;
  }
}