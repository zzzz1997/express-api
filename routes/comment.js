const express = require('express');
const router = express.Router();
const multipart = require('connect-multiparty');
const multiparty = multipart();
const commentDAO = require('../dao/commentDAO');
const result = require('../utils/result');
const token = require('../utils/token');

router.get('/:id', function (req, res) {
    const id = req.params.id;
    commentDAO.get(id, function (success, comments) {
        if (success) {
            res.json(result.createResult(comments));
        } else {
            res.json(result.createFail('获取评论失败'))
        }
    })
});

router.post('/publish', multiparty, function (req, res) {
    token.check(req, function (code) {
        if (code === 1 || code === 0) {
            const authorId = req.body.authorId;
            const content = req.body.content;
            const articleId = req.body.articleId;
            const createdAt = req.body.createdAt;
            commentDAO.publish(authorId, articleId, content, createdAt, function (success) {
                if (success) {
                    res.json(result.createResult())
                } else {
                    res.json(result.createFail("评论失败"))
                }
            })
        } else {
            res.json(result.createFail('无权限'));
        }
    });
});

module.exports = router;