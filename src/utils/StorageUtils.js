import {AsyncStorage} from 'react-native'
import StorageKey from "../values/StorageKey";

export default class StorageUtils{

  static async getMaxTweetsOptionValue(){
    let optionValue = await AsyncStorage.getItem(StorageKey.maxTweets);
    let defaultValue = "10";

    if(optionValue == null)
      optionValue = defaultValue;

    return optionValue;
  }

  static async setMaxTweetsOptionValue(value){
    AsyncStorage.setItem(StorageKey.maxTweets, value.toString());
  }
}