const fs = require('fs');
const path = require('path');

const filename = path.resolve(__dirname, 'data.txt');

//读取文件内容
// fs.readFile(filename, (err, data) => {
//   if(err) {
//     console.log('err:', err);
//     return;
//   }
//   //data是二进制类型，需要转换字符串。
//   console.log('data:', data.toString())
// });

//写入文件
// const content = '\n这是新写入的内容';
// const opt = {
//   flag: 'a', //追加写入， 覆盖用'w'

// }
// fs.writeFile(filename, content, opt, (err) => {
//   if(err) {
//     console.log('err:', err)
//   }
//   console.log('success')
// })

//判断文件是否存在
fs.exists(filename, (exists) => {
  console.log('exists:', exists)
})