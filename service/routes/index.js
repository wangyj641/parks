var express = require('express');
var router = express.Router();
var fs = require('fs');
var PATH = './public/data/';

router.get('/', function (req, res, next) {
  if (!req.session.user) {
    return res.render('login', {});
  }
  res.render('index', {});
});

router.get('/login', function (req, res, next) {
  res.render('login', {});
});

router.get('/tuijian', function (req, res, next) {
  if (!req.session.user) {
    return res.render('login', {});
  }
  res.render('tuijian', {});
});

router.get('/test', function (req, res, next) {
  return res.send({
    status: 0,
    info: 'test',
    data: 'test result'
  });
});

router.get('/edit', function (req, res, next) {
  if (!req.session.user) {
    return res.render('login', {});
  }
  var type = req.query.type;
  if (type) {
    var obj = {};
    switch (type) {
      case 'sanwen':
        obj = {};
        break;
      case 'it':
        obj = {};
        break;
      case 'manager':
        obj = {};
        break;
      case 'cookies':
        obj = {};
        break;
      default:
        return res.send({
          status: 0,
          info: '????'
        });
        break;
    }
    fs.readFile(PATH + type + '.json', (err, data) => {
      if (err) {
        return res.send({
          status: 0,
          info: 'fail.....'
        });
      }
      var obj = JSON.parse(data.toString());
      return res.render('edit', {
        data: obj
      });
    });

  } else {
    return res.send({
      status: 0,
      info: '????'
    });
  }
});

//��ҳ�����

module.exports = router;
