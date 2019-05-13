const {
  login
} = require('./../controller/user')
const { SuccessModel, ErrorModel } = require('./../model/resModel')


//获取cookie过期时间
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 *60 * 1000))
  return d.toGMTString()
}

const handleUserRouter = (req, res) => {
  const method = req.method

  if(method === 'GET' && req.path === '/api/user/login') {
    // const { username, password } = req.body
    const { username, password } = req.query
    const result = login(username, password)
    return result.then(data => {
      if(data.username) {
        //设置session
        req.session.username = data.username
        req.session.realname = date.realname
        return new SuccessModel()
      }else {
        return new ErrorModel('登录失败')
      }
    })
  }

  //登录验证测试
  if(method === 'GET' && req.path === '/api/user/login-test') {
    if(req.session.username) {
      return Promise.resolve(new SuccessModel())
    }else {
      return Promise.resolve(new ErrorModel('尚未登录'))
    }
  }
}

module.exports = handleUserRouter