// MySQL数据库命令
const commentSqlMap = {
    get: 'select user.username, user.icon, user.isAdmin, comment.* from user, comment where comment.articleId = ? and user.id = comment.authorId',
    publish: 'insert into comment(authorId, articleId, content, createdAt) values(?, ?, ?, ?)'
};

module.exports = commentSqlMap;