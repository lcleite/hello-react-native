export default class TweetContent{
  _text; //:string
  _links; //:string[]
  _hashtags; //string[]
  _userMentions; //:string[]

  constructor() {
    this._links = [];
    this._hashtags = [];
    this._userMentions = [];
  }

  get text() {
    return this._text;
  }

  set text(value) {
    this._text = value;
  }

  get links() {
    return this._links;
  }

  set links(value) {
    this._links = value;
  }

  get hashtags() {
    return this._hashtags;
  }

  set hashtags(value) {
    this._hashtags = value;
  }

  get userMentions() {
    return this._userMentions;
  }

  set userMentions(value) {
    this._userMentions = value;
  }
}