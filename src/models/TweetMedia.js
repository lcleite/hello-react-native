export default class TweetMedia{

  _type; //:TweetMediaType
  _photoUrl; //:string
  _videoUrl; //:string

  get type() {
    return this._type;
  }

  set type(value) {
    this._type = value;
  }

  get photoUrl() {
    return this._photoUrl;
  }

  set photoUrl(value) {
    this._photoUrl = value;
  }

  get videoUrl() {
    return this._videoUrl;
  }

  set videoUrl(value) {
    this._videoUrl = value;
  }

  toString() {
    return "TweetMedia{" +
      "type=" + this.type +
      ", photoUrl='" + this.photoUrl + '\'' +
      ", videoUrl='" + this.videoUrl + '\'' +
      '}';
  }
}