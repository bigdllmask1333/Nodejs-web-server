const { exec } = require('./../db/mysql')

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `
  if(author) {
    sql += `and author=${author}`
  }
  if(keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;` 
  //返回 promise
  return exec(sql)
}

const getDetail = (id) => {
  const sql = `select * from blogs where id=${id}`
  return exec(sql).then(rows => {
    return rows[0]
  })
}

const newBlog = (blogData = {}) => {
  const { title, content, author, createtime = Date.now() } = blogData
  const sql = `insert into blogs (title, content, author, createtime)
              values('${title}', '${content}','${author}', ${createtime})`

  return exec(sql).then(insertData => {
    return {
      id: insertData.insertId
    }
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog
}