const mysql = require('mysql');
const mysqlConf = require('../conf/mysqlConf');
const commentSqlMap = require('./commentSqlMap');
const pool = mysql.createPool(mysqlConf.mysql);

module.exports = {
    get: function (id, callback) {
        pool.query(commentSqlMap.get, id, function (error, result) {
            if(error) {
                console.error(error);
                callback(false);
            } else {
                callback(true, result);
            }
        })
    },
    publish: function (authorId, articleId, content, createdAt, callback) {
        pool.query(commentSqlMap.publish, [authorId, articleId, content, createdAt], function (error, result) {
            if (error) {
                console.error(error);
                callback(false);
            } else {
                callback(true);
            }
        })
    }
};