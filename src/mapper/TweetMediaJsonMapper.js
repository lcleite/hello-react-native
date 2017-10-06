import JsonMapper from "./JsonMapper";
import TweetMedia from "../models/TweetMedia";
import TweetMediaType from "../values/TweetMediaType";

export default class TweetMediaJsonMapper extends JsonMapper {

  //@toModel(jsonObject: JSONObject) -> TweetMedia
  toModel(jsonObject) {
    let tweetMedia = new TweetMedia();
    let entities = jsonObject["entities"];
    let media = this._getMedia(entities);
    let extendedEntities = jsonObject["extended_entities"];
    let extendedMedia = this._getMedia(extendedEntities);

    if(media == null){
      tweetMedia.type = TweetMediaType.NONE;
    }
    else if(extendedMedia == null){
      tweetMedia.type = TweetMediaType.PHOTO;
      tweetMedia.photoUrl = this._getPhotoUrl(media);
    }
    else{
      tweetMedia.type = this._getExtendedMediaType(extendedMedia);
      tweetMedia.photoUrl = this._getPhotoUrl(media);
      tweetMedia.videoUrl = this._getVideoUrl(extendedMedia);
    }

    return tweetMedia;
  }

  //@_getMedia(entities: JSONObject) {
  _getMedia(entities) {
    try {
      let media = entities["media"];

      if (media != null && media.length > 0)
        return media[0];
    } catch (err){
      console.log("Tweet without media");
    }

    return null;
  }

  //@_getPhotoUrl(media: JSONObject) -> string
  _getPhotoUrl(media) {
    return this._getUrl(media, "media_url");
  }

  //@_getVideoUrl(extendedMedia: JSONObject) -> string
  _getVideoUrl(extendedMedia) {
    return this._getUrl(extendedMedia, "expanded_url")
  }

  //@_getUrl(media: JSONObject, key: string) -> string
  _getUrl(media, key) {
    if(media != null)
      return media[key];
    else
      return "";
  }

  //@_getExtendedMediaType(extendedMedia: JSONObject) -> TweetMediaType
  _getExtendedMediaType(extendedMedia) {
    let type = extendedMedia["type"];

    if(type === "photo")
      return TweetMediaType.PHOTO;
    else
      return TweetMediaType.VIDEO;
  }
}
