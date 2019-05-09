class BaseModel {
  constructor(data, message) { //传入data是对象类型，message是字符串类型
    if(typeof data === 'string') { //兼容一下，如果没有data
      this.message = data
      data = null
      message = null
    }
    if(data) {
      this.data = data
    }
    if(message) {
      this.message = message
    }
  }
}

class SuccessModel extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.errno = 0
  }
}

class ErrorModel extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.errno = -1
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}