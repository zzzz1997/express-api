const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: '/upload/'});
const fs = require("fs");
const result = require('../utils/result');

router.post('/upload', upload.any(), function(req, res, next) {
    console.log(req.files[0]);  // 上传的文件信息

    const file = req.files[0];

    const newName = file.destination + file.originalname;
    fs.rename(file.path, newName, function (error) {
        if (error) {
            console.error(error);
            res.json(result.createFail('上传失败'));
        }else{
            const data = {};
            data.url = newName;
            res.json(result.createResult(data));
        }
    })
});

module.exports = router;