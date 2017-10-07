

export default class TwitterUser{
  _userName; //:string
  _userScreenName; //:string
  _userProfileImageUrl; //:string

  get userName() {
    return this._userName;
  }

  set userName(value) {
    this._userName = value;
  }

  get userScreenName() {
    return this._userScreenName;
  }

  set userScreenName(value) {
    this._userScreenName = value;
  }

  get userProfileImageUrl() {
    return this._userProfileImageUrl;
  }

  set userProfileImageUrl(value) {
    this._userProfileImageUrl = value;
  }
}