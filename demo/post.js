const http = require('http')

const app = http.createServer((req, res) => {
  if(req.method === 'POST') {
    //req数据格式
    console.log('req content-type:', req.headers)
    //接受数据
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      console.log('postData:', postData)
      res.end('hello world')
    })
  }
})

app.listen(3000, () => {
  console.log('success')
})