// MySQL数据库命令
const commentSqlMap = {
    get: 'select user.username, user.icon, user.isAdmin, comment.* from user, comment where comment.articleId = ? and user.id = comment.authorId',
    insert: ''
};

module.exports = commentSqlMap;