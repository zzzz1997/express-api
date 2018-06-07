// MySQL数据库命令
const articleSqlMap = {
    top: 'select user.username, user.icon, user.isAdmin, article.* from user, article where user.id = article.authorId',
    get: 'select * from article where id = ?',
    updateVisited: 'update article set visited = visited + 1 where id = ?'
};

module.exports = articleSqlMap;