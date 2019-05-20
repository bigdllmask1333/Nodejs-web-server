const redis = require('redis');

//创建redis客户端
const redisClient = redis.createClient(6379, '127.0.0.1');

redisClient.on('error', err => {
  console.log('redis出现错误:', err)
})


//测试
redisClient.set('myname', 'huzhiwei', redis.print)
redisClient.get('myname', (err, value) => {
  if(err) {
    console.log('myName error', err)
  }
  console.log('myName is success', value)

  //退出
  redisClient.quit()
})