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

module.exports = {
  getList,
  getDetail
}