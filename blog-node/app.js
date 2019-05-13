const querystring = require("querystring");

const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/use");

// session数据
const SESSION_DATA = {}

//用于处理 post data
const getPostData = req => {
  return new Promise((reslove, reject) => {
    if (req.method !== "POST") {
      reslove({});
      return;
    }

    if (req.headers["Content-Type"] !== "application/json") {
      reslove({});
      return;
    }

    let postData = "";
    req.on("data", chunk => {
      postData += chunk.toString();
    });
    req.on("end", () => {
      if (!postData) {
        reslove({});
        return;
      }
      reslove(JSON.parse(postData));
    });
  });
};

//获取cookie过期时间
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 *60 * 1000))
  return d.toGMTString()
}

const serverHandle = (req, res) => {
  //设置返回格式JSON
  res.setHeader("Content-type", "application/json");

  //获取path
  const url = req.url;
  req.path = url.split("?")[0]; 

  //解析query
  req.query = querystring.parse(url.split("?")[1]);

  //解析cookie
  req.cookie = {}
  console.log('cookie:', req.headers.cookie)
  const cookieStr = req.headers.Cookie || ''
  console.log(cookieStr.split(";"), 'slite')
  cookieStr.split(';').forEach(item => {
    if(!item) {
      return
    }
    const arr = item.split('=')
    console.log(arr, 'arr')
    const {key, val} = arr
    req.cookie[key] = val
  })

  //操作cookie
  //res.setHeader('Set-Cookie', `username=good;path=/`)

  //解析session
  const needSetCookie = false
  const userId = req.cookie.userid
  if(userId) {
    if(!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {}
    }
  } else {
    userId = `${Date.now()}_${Math.random()}`
    SESSION_DATA[userId] = {}
    needSetCookie = true
  }
  req.session = SESSION_DATA[userId]

  //处理post data
  getPostData(req).then(postData => {
    req.body = postData;

    //处理blog路由
    // const blogData = handleBlogRouter(req, res);
    // if (blogData) {
    //   res.end(JSON.stringify(blogData));
    //   return;
    // }
    const blogResult = handleBlogRouter(req, res);
    if(blogResult) {
      blogResult.then(blogData => {
        if(needSetCookie) {
          res.setHeader('Set-Cookie',`userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`)
        }
        res.end(
          JSON.stringify(blogData)
        );
      });
      return
    }
    

    //处理user路由
    // const userData = handleUserRouter(req, res);
    // if (userData) {
    //   res.end(JSON.stringify(userData));
    //   return;
    // }
    const userResult = handleUserRouter(req, res);
    if(userResult) {
      userResult.then(userData => {
        if(needSetCookie) {
          res.setHeader('Set-Cookie',`userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`)
        }
        res.end(
          JSON.stringify(userData)
        )
      })
      return
    }
  }).catch(() => {
    

    //未命中路由，返回404
    res.writeHead(404, { "Content-type": "text/plain" });
    res.write("404 NOT FOUND");
    res.end();
  })
};

module.exports = serverHandle;
