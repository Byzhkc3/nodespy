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
var dbConfig = require('./dbConfig');

// 开关数据库连接
dbConfig.conn.connect();

// 设置静态文件
app.use(express.static('public'));


// 返回默认首页
app.get('/', function(req, res) {
    res.sendFile('./index.html');
});


var sql = 'SELECT * FROM `mmz` limit 12';
dbConfig.conn.query(sql, function(err, rows) {
    var data = rows;

    // 返回的API接口 
    app.get('/api', function(req, res, next) {
        console.log(data);
        // 返回json格式
        res.json({
            code: 200,
            msg: '数据获取成功',
            data: data
        });

    });

    return data;

});



// 异常处理
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('500');
});

var port = 8099;
// 端口监听
app.listen(port, function(req, res) {
    console.log('app is running:' + port);
});
