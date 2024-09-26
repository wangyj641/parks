var express = require('express');
var router = express.Router();
var fs = require('fs');
var PATH = './public/data/';

/* GET home page. */
router.get('/read', function (req, res, next) {
  var type = req.query.type;
  console.log(type);
  fs.readFile(PATH + type + ".json", 'utf8', function (err, data) {
    if (err) {
      return res.send({
        status: 400,
        info: '读取文件失败'
      })
    }

    var COUNT = 50;
    var obj = JSON.parse(data);
    if (obj.length > COUNT) {
      obj.data = obj.slice(0, COUNT)
    }

    return res.send({
      status: 200,
      info: '读取文件成功',
      data: obj
    });
  });
});

router.post('/write', function (req, res, next) {
  if(!req.session.user){
    return res.send({
      status: 0,
      info: '未鉴权认证'
    });
  }
  var type = req.query.type;
  var url = req.query.url;
  var title = req.query.title;
  var img = req.query.img;

  if (!type || !url || !title || !img) {

    return res.send({
      status: 400,
      info: '参数错误'
    })
  }

  var filePath = PATH + type + ".json";
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return res.send({
        status: 400,
        info: '读取文件失败'
      })
    }

    var arr = JSON.parse(data);
    var obj = {
      url: url,
      title: title,
      img: img,
      id: guid(),
      time: new Date().getTime()
    }

    arr.splice(0, 0, obj);
    var newData = JSON.stringify(arr);
    fs.writeFile(filePath, newData, function (err) {
      if (err) {
        return res.send({
          status: 400,
          info: '写入文件失败'
        })
      }

      return res.send({
        status: 200,
        info: '写入文件成功'
      });
    });
  });
});

router.post('/write_config', function (req, res, next) {
  if(!req.session.user){
    return res.send({
      status: 0,
      info: '未鉴权认证'
    });
  }
  var data = req.body.data;
  var obj = JSON.parse(data);
  var newData = JSON.stringify(obj);

  var filePath = PATH + "config.json";
  fs.writeFile(filePath, newData, function (err) {
    if (err) {
      return res.send({
        status: 400,
        info: '写入文件失败'
      })
    }

    return res.send({
      status: 200,
      info: '写入文件成功'
    });
  });
});

router.post('/login', function (req, res, next) {
  console.log('---------------------- login -----------------');

  var username = req.body.username;
  var password = req.body.password;

  if (username == 'admin' && password == '123456') {
    req.session.user = {
      username: username
    }

    return res.send({
      status: 200,
      info: '登录成功'
    });
  } else {
    return res.send({
      status: 400,
      info: '登录失败'

    })
  }
})

function guid() {
  return ''.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

module.exports = router;
