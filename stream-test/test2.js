// var fs = require('fs')
// var path = require('path')

// //两个文件名
// var filename1 = path.resolve(__dirname, 'data.txt')
// var filename2 = path.resolve(__dirname, 'data-bake.txt')

//复制文件功能
// const fs = require('fs');
// const path = require('path');

// const filename1 = path.resolve(__dirname, 'data.txt');
// const filename2 = path.resolve(__dirname, 'data-bake.txt');

// const readStream = fs.createReadStream(filename1);
// const writeStream = fs.createWriteStream(filename2);

// readStream.pipe(writeStream)
// readStream.on('data', chunk => {
//   console.log('chunk:', chunk)
// })
// readStream.on('end', () => {
//   console.log('copy successs');
// })