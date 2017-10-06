
const _hashtag = require('../img/hashtag_icon.png');
const _at = require('../img/at_icon.png');
const _photo = require('../img/photo_icon.png');
const _video = require('../img/video_icon.png');
const _videoPlay = require('../img/video_play_icon.png');
const _placeholder = require('../img/downloading_placeholder.png');
const _settings = require('../img/settings_icon.png');

export class ImageAsset {

  static get hashtag() {
    return _hashtag;
  }

  static get at() {
    return _at;
  }

  static get photo() {
    return _photo;
  }

  static get video() {
    return _video;
  }

  static get videoPlay() {
    return _videoPlay;
  }

  static get placeholder() {
    return _placeholder;
  }

  static get settings() {
    return _settings;
  }

}
