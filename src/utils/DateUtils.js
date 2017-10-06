const SEARCH_RESULT_DATE_FORMAT = "mmm dd yyyy HH:mm";
let dateFormat = require('dateformat');

export default class DateUtils{

  static createDateFromString(dateString){
    let dateLong = Date.parse(dateString);
    return new Date(dateLong);
  }

  static getStringFromDate(date){
    return dateFormat(date, SEARCH_RESULT_DATE_FORMAT);
  }
}