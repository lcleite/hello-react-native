export default class Tweet{
  _user; //:TwitterUser
  _content; //:TweetContent
  _media; //:TweetMedia
  _createdAt; //:Date

  get user() {
    return this._user;
  }

  set user(value) {
    this._user = value;
  }

  get content() {
    return this._content;
  }

  set content(value) {
    this._content = value;
  }

  get media() {
    return this._media;
  }

  set media(value) {
    this._media = value;
  }

  get createdAt() {
    return this._createdAt;
  }

  set createdAt(value) {
    this._createdAt = value;
  }
}