const mysql = require('mysql');
const mysqlConf = require('../conf/mysqlConf');
const articleSqlMap = require('./articleSqlMap');
const pool = mysql.createPool(mysqlConf.mysql);

const articleDAO = {
    /**
     * 获取置顶文章列表
     *
     * @param callback 获取成功后的操作
     */
    top: function (callback) {
        pool.query(articleSqlMap.top, function (error, result) {
            if(error) {
                console.error(error);
                callback(false);
            } else {
                callback(true, result);
            }
        })
    },
    /**
     * 获取文章信息
     *
     * @param id 文章ID
     * @param callback 获取成功后的操作
     */
    get: function (id, callback) {
        pool.query(articleSqlMap.get, id, function (error, result) {
            if(error) {
                console.error(error);
                callback(false);
            } else {
                callback(true, result[0]);
            }
        })
    },
    /**
     * 更新文章浏览次数
     *
     * @param id 文章ID
     * @param callback 更新成功后的操作
     */
    updateVisited: function (id, callback) {
        pool.query(articleSqlMap.updateVisited, id, function (error) {
            if(error) {
                console.error(error);
                callback(false);
            } else {
                callback(true);
            }
        })
    }
};

module.exports = articleDAO;