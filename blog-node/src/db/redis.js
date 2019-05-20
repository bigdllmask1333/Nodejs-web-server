const redis = require('redis');
const { REDIS_CONF } = requir('./redis.js');


//创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClient.on('error', (err) => {
  console.log('redis is error:', err)
});

function set(key, value) {
  if(typeof value === 'object') {
    value = JSON.stringify(value);
  }
  redisClient.set(key, value, redis.print);
}

function get(key) {
  return new Promise((reslove, reject) => {
    redisClient.get(key, (err, val) => {
      if(err) {
        reject(err);
        return;
      }
      if(val === null) {
        reslove(null);
        return;
      }
      try {
        reslove(JSON.stringify(val));
      } catch (error) {
        reslove(error);
      }
    }) 
  })
}

module.exports = {
  set,
  get
}