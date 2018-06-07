const express = require('express');
const router = express.Router();
const articleDAO = require('../dao/articleDAO');
const userDAO = require('../dao/userDAO');
const result = require('../utils/result');

// 根据id获取文章
router.get('/id/:id', function(req, res) {
    const id = req.params.id;
    articleDAO.get(id, function (success, article) {
        if (success) {
            articleDAO.updateVisited(id, function (success) {
                if (success) {
                    userDAO.get(article.authorId, function (success, author) {
                        if (success) {
                            const data = {};
                            data.article = article;
                            data.author = author;
                            res.json(result.createResult(data));
                        } else {
                            res.json(result.createFail('获取作者信息失败'));
                        }
                    });
                } else {
                    res.json(result.createFail('获取文章失败'));
                }
            });
        } else {
            res.json(result.createFail('获取文章失败'));
        }
    });
});

// 获取置顶文章列表
router.get('/top', function (req, res) {
    articleDAO.top(function (success, articles) {
        if (success) {
            const data = {};
            data.articles = articles;
            res.json(result.createResult(data));
        } else {
            res.json(result.createFail('获取置顶失败'));
        }
    })
});

module.exports = router;
