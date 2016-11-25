/**
 * Created by byzhkc3 on 2016/11/25 .
 */

// 抽取无用数据
SELECT * FROM `mmz` WHERE `url` LIKE '%#comment-%'

'use strict';

var mysql = require('mysql');

var pool = mysql.createPool({
    host     : dbConfig.dbhost,
    user     : dbConfig.dbuser,
    password : dbConfig.dbpassword,
    database : dbConfig.database
});

