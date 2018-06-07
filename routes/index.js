const express = require('express');
const router = express.Router();
const multipart = require('connect-multiparty');
const multiparty = multipart();
const token = require('../utils/token');

// 主页
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 测试登录获取token
router.post('/token', multiparty, function (req, res) {
    const user = req.body;
    res.send(token.createToken(user, 10 * 60 * 1000));
});

// 测试token功能
router.get('/checkToken', function (req, res) {
    const myToken = req.headers.authorization;
    if (myToken) {
        res.send('' + token.checkToken(myToken));
    } else {
        res.send('token缺失');
    }
});

module.exports = router;
