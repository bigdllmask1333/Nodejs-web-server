const { 
  getList,
  getDetail,
  newBlog
 } = require('./../controller/blog')
const { SuccessModel, ErrorModel } = require('./../model/resModel')

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
    const author = 'huzhiwei'
    req.body.author = author
    const result = newBlog(req.body)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }

  //更新一篇博客
  if(method === 'POST' && req.path === '/api/blog/update') {
    return {
      msg: '这是更新博客的接口'
    }
  }

  //删除一篇博客
  if(method === 'POST' && req.path === '/api/blog/del') {
    return {
      msg: '这是删除博客的接口'
    }
  }
}

module.exports = handleBlogRouter