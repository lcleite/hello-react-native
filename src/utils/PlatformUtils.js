import {Platform} from 'react-native'

export default class PlatformUtils{

  static isPlatformIOS(){
    return Platform.OS === 'ios';
  }

  static isPlatformAndroid(){
    return !(Platform.OS === 'ios');
  }
}