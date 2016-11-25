/**
 * Created by byzhkc3 on 2016/11/25 .
 * 爬虫文件
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

// 遍历妹子图地址
var urls = [];
for (var i = 0; i < 11; i++) {
    urls.push('http://jandan.net/ooxx/page-' + i + '#comments');
}


// 获取数据
var items = [];
var getDate = function(url, next) {
    // 用 superagent 去抓取 妹子图 的内容
    superagent.get(url).end(function(err, res, next) {
        // 常规的错误处理
        if (err) {
            return next(err);
        }
        // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
        // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
        // 剩下就都是 jquery 的内容了
        var $ = cheerio.load(res.text);

        $('.text p a').each(function(i, e) {

            // console.log($(e).attr('href'));
            items.push($(e).attr('href'));

            var dateTime = new Date().getTime();
            var data = $(e).attr('href');
            var post = {
                url: data,
                dateline: dateTime,
                name: "byzhkc3"
            };
            // 数据库插入
            dbConfig.conn.query('INSERT INTO mmz SET ?', post,
                function(err, result) {
                    console.log('数据插入成功' + ' ' + post[i].url + dateTime);
                });
            // conn.end();

        });

    });
}

// 并发连接数的计数器
var concurrencyCount = 0;
var fetchUrl = function(url, callback) {
    // delay 的值在 2500 以内，是个随机的整数
    var delay = parseInt((Math.random() * 30000000) % 2500, 10);
    concurrencyCount++;
    console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url,
        '，耗时' + delay + '毫秒');

    setTimeout(function() {
        concurrencyCount--;
        callback(null, url + ' html content');
    }, delay);

};

// 控制并发数为5
async.mapLimit(urls, 2, function(url, callback) {

    // 需要爬取数据时请去掉下列注释
    fetchUrl(url, callback);
    getDate(url);

}, function(err, result) {
    // console.log(result);

});


// 返回默认首页
app.get('/', function(req, res) {
    res.send('这个页面没东西哦');
});


// 异常处理
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('500');
});

var port = 3000;
// 端口监听
app.listen(port, function(req, res) {
    console.log('app is running:' + port);
});
