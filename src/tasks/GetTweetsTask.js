import StorageUtils from "../utils/StorageUtils";
import TweetJsonMapper from "../mapper/TweetJsonMapper";

const OAUTH2_AUTHORIZATION = "Bearer AAAAAAAAAAAAAAAAAAAAANKm2QAAAAAA4egRyibPOIGTFLzy%2BhDnYDdr62o%3DcGtYhty15tRTVLwWjWux3S2rcP4cLxGoFEgJcissPmYOYkSikA";
const METHOD = "GET";
const SEARCH_URL = "https://api.twitter.com/1.1/search/tweets.json?q=";
const OPTIONS = {
  method: METHOD,
  headers: {
    'Authorization': OAUTH2_AUTHORIZATION
  }
};

export default class GetTweetsTask{

  query;

  constructor(query) {
    this.query = query;
  }

  async run() {
    let url = SEARCH_URL + this.query;
    let response = await fetch(url, OPTIONS);

    return new Promise((resolve, reject) => {
      if (response.ok)
        resolve(this._getTweets(response));
      else
        reject();
    });
  }

  async _getTweets(response) {
    let data = await response.json();
    let maxTweets = await StorageUtils.getMaxTweetsOptionValue();
    let tweetsData = data["statuses"];

    return this._mapTweets(tweetsData, maxTweets);
  }

  _mapTweets(tweetsData, maxTweets) {
    let tweetMapper = new TweetJsonMapper();
    let tweets = [];

    for(let i = 0; i < tweetsData.length; i++){
      if(i == maxTweets)
        break;

      tweets.push(tweetMapper.toModel(tweetsData[i]));
    }

    return tweets;
  }
}