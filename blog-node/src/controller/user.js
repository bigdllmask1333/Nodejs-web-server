const { exec } = require('./../db/mysql')


const login = (username, password) => {
  const sql = `
    select username, password from users where username='${username}' and password=${password}
  `
  return exec(sql).then(rows => {
    console.log(rows, 'row')
    return rows[0] || {}
  })
}

module.exports = {
  login
}