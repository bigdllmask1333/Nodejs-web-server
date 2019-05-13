const { 
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
 } = require('./../controller/blog')
const { SuccessModel, ErrorModel } = require('./../model/resModel')

const handleBlogRouter = (req, res) => {
  const method = req.method

  //获取博客列表
  if(method === 'GET' && req.path === '/api/blog/list') {
    const { author = '', keyword = '' } = req.query
    const listData  = getList(author, keyword)
    
    return new SuccessModel(listData)
  }

  //获取博客详情
  if(method === 'GET' && req.path === '/api/blog/detail') {
    const { id = "" } = req.query.id
    const data = getDetail(id)
    return new SuccessModel(data) 
  }

  //新建博客
  if(method === 'POST' && req.path === '/api/blog/new') { 
    const blogData = req.body
    const data = newBlog(blogData)
    return new SuccessModel(data)
  }

  //更新一篇博客
  if(method === 'POST' && req.path === '/api/blog/update') {
    const result = updateBlog(req.query.id, req.body)
    if(result) {
      return new SuccessModel()
    }else {
      return new ErrorModel('update fail')
    }
  }

  //删除一篇博客
  if(method === 'POST' && req.path === '/api/blog/del') {
    const result = delBlog(req.query.id)
    if(result) {
      return new SuccessModel()
    }else {
      return new ErrorModel('delete fail')
    }
  }
}

module.exports = handleBlogRouter