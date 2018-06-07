const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// 载入路由
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const articleRouter = require('./routes/article');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, OPTIONS");
    res.header('Access-Control-Allow-Headers', "X-Requested-with");
    res.header('Access-Control-Allow-Headers', "Content-Type");
    next();
});

// 使用路由
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/article', articleRouter);

module.exports = app;
