const mysql = require('mysql');
const mysqlConf = require('../conf/mysqlConf');
const userSqlMap = require('./userSqlMap');
const pool = mysql.createPool(mysqlConf.mysql);

module.exports = {
    /**
     * 注册操作
     *
     * @param user 用户
     * @param callback 注册成功后操作
     */
    register: function (user, callback) {
        pool.query(userSqlMap.register, [user.username, user.password, user.createdAt], function (error, result) {
            if(error) {
                console.error(error);
                callback(false);
            } else {
                callback(true, result.insertId);
            }
        })
    },
    /**
     * 登录操作
     *
     * @param user 用户
     * @param callback 登录成功后操作
     */
    login: function (user, callback){
        pool.query(userSqlMap.login, [user.username, user.password], function (error, result) {
            if(error) {
                console.error(error);
                callback(false);
            } else {
                if (result[0]) {
                    delete result[0]['password'];
                    callback(true, result[0]);
                } else {
                    callback(false);
                }
            }
        })
    },
    /**
     * 更新用户信息
     *
     * @param user 用户
     * @param callback 更新成功后操作
     */
    update: function (user, callback) {
        pool.query(userSqlMap.update, [user.icon, user.id], function (error, result) {
            if(error) {
                console.error(error);
                callback(false);
            } else {
                callback(true, result.affectedRows > 0);
            }
        })
    },
    /**
     * 删除用户操作
     *
     * @param id 用户ID
     * @param callback 删除成功后操作
     */
    del: function (id, callback) {
        pool.query(userSqlMap.del, id, function (error, result) {
            if(error) {
                console.error(error);
                callback(false);
            } else {
                callback(true, result.affectedRows > 0);
            }
        })
    },
    /**
     * 获取单一用户操作
     *
     * @param id 用户ID
     * @param callback 获取成功后操作
     */
    get: function (id, callback) {
        pool.query(userSqlMap.get, id, function (error, result) {
            if(error) {
                console.error(error);
                callback(false);
            } else {
                if (result[0]) {
                    delete result[0]['password'];
                    callback(true, result[0]);
                } else {
                    callback(false);
                }
            }
        })
    },
    /**
     * 获取所有用户操作
     *
     * @param callback 获取成功后操作
     */
    list: function (callback) {
        pool.query(userSqlMap.list, function (error, result) {
            if(error) {
                console.error(error);
                callback(false);
            } else {
                for (let i = 0; i < result.length; i++) {
                    delete result[i]['password'];
                }
                callback(true, result);
            }
        })
    },
    /**
     *
     * 判断用户名是否已存在
     *
     * @param username 用户名
     * @param callback 判断成功后的操作
     */
    getName: function (username, callback) {
        pool.query(userSqlMap.getName, username, function (error, result) {
            if(error) {
                console.error(error);
                callback(false);
            } else {
                if (result[0]) {
                    callback(true);
                } else {
                    callback(false);
                }
            }
        })
    }
};