// MySQL数据库命令
const userSqlMap = {
    register: 'insert into user(username, password, createdAt) values(?, ?, ?)',
    login: 'select * from user where username=? and password=?',
    update: 'update user set icon=? where id=?',
    del: 'delete from user where id=?',
    get: 'select * from user where id=?',
    list: 'select * from user',
    getName: 'select * from user where username = ?'
};

module.exports = userSqlMap;