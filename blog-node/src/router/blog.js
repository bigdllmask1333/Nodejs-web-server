const { 
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
 } = require('./../controller/blog')
const { SuccessModel, ErrorModel } = require('./../model/resModel');


//统一的登录验证函数
const loginCheck = (req) => {
  if(!req.session.username) {
    return Promise.resolve(
      new ErrorModel('尚未登录')
    )
  }
}


const handleBlogRouter = (req, res) => {
  const method = req.method

  //获取博客列表
  if(method === 'GET' && req.path === '/api/blog/list') {
    const { author = '', keyword = '' } = req.query
    const result = getList(author, keyword)
    return result.then(listData => {
      return new SuccessModel(listData)
    });
  }

  //获取博客详情
  if(method === 'GET' && req.path === '/api/blog/detail') {
    const result = getDetail(req.query.id)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }

  //新建博客
  if(method === 'POST' && req.path === '/api/blog/new') {

    const loginCheckResult = loginCheck(req);
    if(loginCheckResult) {
      return loginCheck
    }


    const author = req.session.username;
    req.body.author = author
    const result = newBlog(req.body)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }

  //更新一篇博客
  if(method === 'POST' && req.path === '/api/blog/update') {

    const loginCheckResult = loginCheck(req);
    if(loginCheckResult) {
      return loginCheck
    }

    const result = updateBlog(req.query.id, req.body)
    return result.then(val => {
      if(val) {
        return new SuccessModel()
      }else {
        return new ErrorModel('更新失败')
      }
    })
  }

  //删除一篇博客
  if(method === 'POST' && req.path === '/api/blog/del') {

    const loginCheckResult = loginCheck(req);
    if(loginCheckResult) {
      return loginCheck
    }

    const author = req.session.username;
    const result = delBlog(req.query.id, author);
    result.then(val => {
      if(val) {
        return new SuccessModel()
      }else {
        return new ErrorModel('删除失败')
      }
    })
  }
}

module.exports = handleBlogRouter