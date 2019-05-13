const getList = (author, keyword) => {
  //先返回假数据，格式要正确
  return [{
    id: 1,
    title: '标题A',
    content: '内容A',
    createTime: '111111111',
    author: 'zhangsan'
  }, {
    id: 2,
    title: '标题B',
    content: '内容B',
    createTime: '222222222222',
    author: 'lisi'
  }]
}

const getDetail = (id) => {
  //返回假数据
  return {
    id: 1,
    title: '标题A',
    content: '内容A',
    createTime: '111111111',
    author: 'zhangsan'
  }
}

const newBlog = (blogData = {}) => {
  //blogData是一个博客对象，包含title content属性
  return {
    id: 3, //表示新建博客，插入到数据表里面的id
  }
}

const updateBlog = (id, blogData = {}) => {
  //id是要更新博客的id
  //blogData是一个博客对象，包含title content属性
  console.log('update id:', id)
  console.log('update blog:', blogData)
  return true
}

const delBlog = (id) => {
  //id就是要删除博客的id
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}