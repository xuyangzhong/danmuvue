const Mock = require('mockjs');

const Random = Mock.Random;

//设置请求延迟  以显示loading罩
Mock.setup({
  timeout: 800
})

const produceNewsData = function () {
  let articles = [];
  for (let i = 0; i < 100; i++) {
    let newArticleObject = {
      title: Random.csentence(5, 30), //  Random.csentence( min, max )
      thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    }
    articles.push(newArticleObject)
  }

  return {
    articles: articles
  }
}

const checkLogin = function () {
  let user = {
    user: {
      username: '李白',
      mobile: '123'
    }
  }

  return user;
}

const code = function () {
  return {
    code: '123'
  }
}


// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/news/index', 'get', produceNewsData);
Mock.mock('/user/checklogin', 'post', (options) => {
  console.log("url:", options.url)
  console.log("type:", options.type)
  console.log("body:", options.body)
  return checkLogin();
})
Mock.mock('/user/sendCode', 'get', code)
