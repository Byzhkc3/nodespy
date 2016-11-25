/**
 * Created by byzhkc3 on 2016/11/25 .
 * 对外服务页面
 */
'use strict';
// 引入依赖
var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');
var async = require('async');
var mysql = require('mysql');
// 建立 express 实例
var app = express();
var dbConfig = require('./mysql');

// 开关数据库连接
// dbConfig.conn.connect();

// 返回默认首页
app.get('/', function(req, res) {
    res.send('这是一个爬虫页');
});

// 返回的API接口 
app.get('/api', function(req, res, next) {

    // res.send(tmp);
    // 返回json格式
    res.json({
        code: 200,
        msg: '数据获取成功',
        data: "测试数据"
    });

});

// 异常处理
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('500');
});

var port = 8080;
// 端口监听
app.listen(port, function(req, res) {
    console.log('app is running' + port);
});
