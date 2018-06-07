module.exports = {
    createResult: function (data) {
        // 默认返回数据格式
        const result = {};
        result.success = true;
        result.data = data;
        return result;
    },
    createFail: function (message) {
        const result = {};
        result.success = false;
        result.message = message;
        return result
    }
};