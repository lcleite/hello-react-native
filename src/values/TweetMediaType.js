const _NONE = 0;
const _PHOTO = 1;
const _VIDEO = 2;

export default class TweetMediaType {

  static get NONE() {
    return _NONE;
  }

  static get PHOTO() {
    return _PHOTO;
  }

  static get VIDEO() {
    return _VIDEO;
  }
}