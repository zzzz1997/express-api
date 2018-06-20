const express = require('express');
const router = express.Router();
const commentDAO = require('../dao/commentDAO');
const result = require('../utils/result');

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

module.exports = router;