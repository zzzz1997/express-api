const express = require('express');
const router = express.Router();
const multipart = require('connect-multiparty');
const multiparty = multipart();
const userDAO = require('../dao/userDAO');
const result = require('../utils/result');
const token = require('../utils/token');

// 设置token过期时间
const TIMEOUT = 24 * 60 * 60 * 1000;

// 注册一条数据（权限：所有）
router.post('/register', multiparty, function (req, res) {
    const user = req.body;
    userDAO.register(user, function (success, id) {
        if (success) {
            const data = {};
            data.id = id;
            res.json(result.createResult(data));
        } else {
            res.json(result.createFail('注册失败'));
        }
    })
});

// 登录（权限：所有）
router.post('/login', multiparty, function (req, res) {
    const user = req.body;
    userDAO.login(user, function (success, user1) {
        if (success) {
            if (user1) {
                const data = {};
                data.user = user1;
                data.token = token.createToken(user1, TIMEOUT);
                res.json(result.createResult(data))
            } else {
                res.json(result.createFail('用户名或密码错误'));
            }
        } else {
            res.json(result.createFail('用户名或密码错误'));
        }
    })
});

// 更新数据（权限：管理）
router.put('/', multiparty, function (req, res) {
    token.check(req, function (code) {
        if (code === 1) {
            const user = req.body;
            userDAO.update(user, function (success) {
                if (success) {
                    res.json(result.createResult());
                } else {
                    res.json(result.createFail('更新失败'));
                }
            })
        } else {
            res.json(result.createFail('无权限'));
        }
    })
});

// 删除数据（权限：管理）
router.delete("/:id", function (req, res) {
    token.check(req, function (code) {
        if (code === 1) {
            const id = req.params.id;
            userDAO.del(id, function (success) {
                if (success) {
                    res.json(result.createResult())
                } else {
                    res.json(result.createFail('删除失败'));
                }
            })
        } else {
            res.json(result.createFail('无权限'));
        }
    });
});

// 查询数据（权限：管理和用户）
router.get('/:id', function (req, res) {
    token.check(req, function (code) {
        if (code === 1 || code === 0) {
            const id = req.params.id;
            userDAO.get(id, function (success, user) {
                if (success) {
                    res.json(result.createResult(user));
                } else {
                    res.json(result.createFail('获取用户失败'));
                }
            })
        } else {
            res.json(result.createFail('无权限'));
        }
    });
});

// 获取所有数据（权限：管理）
router.get('/', function (req, res) {
    token.check(req, function (code) {
        if (code === 1) {
            userDAO.list(function (success, users) {
                if (success) {
                    res.json(result.createResult(users));
                } else {
                    res.json(result.createFail('获取数据失败'));
                }
            });
        } else {
            res.json(result.createFail('无权限'));
        }
    });
});

// 获取用户是否存在（权限：所有）
router.get('/isExist/:username', function (req, res) {
    const username = req.params.username;
    userDAO.getName(username, function (success) {
        if (success) {
            res.json(result.createResult('用户名已存在'));
        } else {
            res.json(result.createFail('用户名不存在'));
        }
    })
});

module.exports = router;
