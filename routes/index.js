var _ = require('underscore');
var path = require('path');
var express = require('express');
var router = express.Router();

var mockData = require('../mock/mockData.js');
var serverConfig = require('../config/server').CONFIG;
var profiles = require('../mock/users').profiles;
 
router.all(/\/[a-zA-Z0-9]+/, function(req, res, next) {
  if (_.contains(serverConfig.allowClient, req.headers.origin)) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.path !== '/Login' && !(req.cookies && req.cookies.isLogin && req.cookies.isLogin === '1')) {
    var data = {
      retCode: '00001',
      retMsg: 'cookie expired.'
    }
    res.json(data);
    res.end();
  } else {
    next();
  }
});

router.get('/', function(req, res){
  res.render('index', {title: 'Express'});
});

router.post('/Login', function(req, res){
  var body = req.body;
  var reqName = body.name;
  var reqPass = body.password;
  var isRightProfile = _.find(profiles, function(item){
    return item['name'] === reqName && item['password'] === reqPass;
  });
  if (isRightProfile) {
    var data = {
      retCode: '00000'
    };
    var expireTime = new Date(Date.now() + 1000 * 60 * 30);
    res.cookie('username', reqName, { expires: expireTime, httpOnly: true });
    res.cookie('isLogin', '1', { expires: expireTime, httpOnly: true });
  } else {
    var data = {
      retCode: '00002',
      retMsg: 'username or password is not right.'
    };
  }
  res.json(data);
  res.end();
});

router.post('/GetHomeData', function(req, res){
  var data = getHomeData();
  data.retCode = '00000';
  res.json(data);
  res.end();
});

router.post('/GetVODDetail', function(req, res){
  var data = getVODDetail(req.body);
  data.retCode = '00000';
  res.json(data);
  res.end();
});

router.post('/GetVodHomeData', function(req, res){
  var data = getVodHomeData(req.body);
  data.retCode = '00000';
  res.json(data);
  res.end();
});

router.post('/Logout', function(req, res){
  var data = {
    retCode: '00000'
  }
  res.clearCookie('username');
  res.clearCookie('isLogin');
  res.json(data);
  res.end();
});
 
function getHomeData() {
  return mockData.HomeData;
}
 
function getVODDetail(body) {
  var data = {};
  var vodID = body.id;
  data.vod = _.find(mockData.VODs, function(item) {
      return item.id === vodID;
  });
  data.recomendColumns = mockData.DetailColumns;
  return data;
}

function getVodHomeData() {
  return mockData.VODHomeData;
}

module.exports = router;
