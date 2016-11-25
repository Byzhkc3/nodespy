/**
 * Created by byzhkc3 on 2016/11/25 .
 * 数据库配置
 */
'use strict';
// 引入依赖
var mysql = require('mysql');

// 连接mysql数据库
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mmz',
    charset: 'UTF8_GENERAL_CI'
});

exports.conn = conn;


