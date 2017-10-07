import JsonMapper from "./JsonMapper";
import TwitterUser from "../models/TwitterUser";

export default class TwitterUserJsonMapper extends JsonMapper{

  //@toModel(jsonObject: JSONObject) -> TwitterUser
  toModel(jsonObject) {
    let twitterUser = new TwitterUser();
    let user = jsonObject["user"];

    twitterUser.userName = user["name"];
    twitterUser.userScreenName = user["screen_name"];
    twitterUser.userProfileImageUrl = user["profile_image_url"];

    return twitterUser;
  }
}