const jwt = require('jwt-simple');

const token = {
    /**
     * 创建token
     *
     * @param user 用户
     * @param timeout token过期时间
     * @returns {String} token
     */
    createToken: function (user, timeout) {
        const expires = Date.now() + timeout;
        return jwt.encode({
            iss: user.id,
            exp: expires,
            aud: 'zzzz',
            isAdmin: user.isAdmin
        }, 'api.zzzz1997.com');
    },
    /**
     * 检查权限
     *
     * @param req 请求信息
     * @param callback 检查权限后的操作
     */
    check: function(req, callback) {
        const token = req.headers.authorization;
        const code = this.checkToken(token);
        callback(code);
    },
    /**
     * 检查token
     *
     * @param token token
     * @returns {number} 返回token状态
     */
    checkToken: function (token) {
        try{
            const decoded = jwt.decode(token, "api.zzzz1997.com");
            if (decoded.exp <= Date.now() || decoded.aud !== 'zzzz') {
                return -2;
            } else {
                return decoded.isAdmin;
            }
        } catch (e) {
            return -1
        }
    },
};

module.exports = token;