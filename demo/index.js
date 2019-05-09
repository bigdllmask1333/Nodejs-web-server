const fs = require('fs')
const path = require('path')





//callback 方式获取一个文件内容
function getFileContent(fileName, callback) {
  const fullFileName = path.resolve(__dirname, fileName)
  fs.readFile(fullFileName, (err, data) => {
    if(err) {
      console.log(err)
      return
    }
    callback(
      JSON.parse(data.toString())
    )
  })
}

getFileContent('a.json', aData => {
  console.log('a data:' , aData)
  getFileContent(aData.next, bData => {
    console.log('b data', bData)
  })
})