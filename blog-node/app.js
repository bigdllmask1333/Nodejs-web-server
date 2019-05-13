const querystring = require("querystring");

const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/use");

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

const serverHandle = (req, res) => {
  //设置返回格式JSON
  res.setHeader("Content-type", "application/json");

  //获取path
  const url = req.url;
  req.path = url.split("?")[0]; 

  //解析query
  req.query = querystring.parse(url.split("?")[1]);

  //获取cookie
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
        if(blogData) {
          res.end(
            JSON.stringify(blogData)
          );
          return
        }
      });
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
