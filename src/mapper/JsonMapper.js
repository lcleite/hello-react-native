export default class JsonMapper{

  constructor(){
    if (this.constructor === JsonMapper)
      throw new Error('Cannot instantiate interface JsonMapper');
  }

  toModel(jsonObject){
    throw new Error('Cannot call abstract method toModel()');
  }
}