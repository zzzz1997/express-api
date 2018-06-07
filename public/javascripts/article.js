(function (window) {
    // 初始化判断登录状况
    const token = getCookie("token");
    checkLogin(token);
    window.angular.module('article', [])
        .controller('articleCtrl', function ($scope, $http) {
            // 获取文章列表信息
            $http.get("/article")
                .then(function (response) {
                    $scope.artcles = response.data.data;
                }, function (error) {
                    alert(error);
                });
            // 设置管理员名字
            $scope.admin = getCookie('admin');
            /**
             * 新建文章
             */
            $scope.doAdd = function () {
                checkLogin(token);
                /*const data = JSON.stringify({
                    username: $('#add-name').val(),
                    password: $('#add-pwd').val(),
                    createdAt: '2018-5-21'
                });
                $http.post("/users/register", data, {headers : {'Authorization' : token}})
                    .then(function () {
                        $("#addModal").modal("hide");
                        location.reload();
                    }, function (error) {
                        alert(error)
                    });*/
            };
            /**
             * 删除文章
             */
            $scope.doDel = function () {
                checkLogin(token);
                /*$http.delete("/users/" + $('#user-id').text(), {headers : {'Authorization' : token}})
                    .then(function () {
                        $("#delModal").modal("hide");
                        location.reload();
                    }, function (error) {
                        alert(error)
                    });*/
            };
            /**
             * 退出系统
             */
            $scope.doExit = function () {
                delCookie("token");
                delCookie("admin");
                window.location.href = 'index.html';
            }
        })
})(window);

/**
 * 获取cookie数据
 *
 * @param cname cookie名字
 * @returns {string} 返回cookie值
 */
function getCookie(cname)
{
    const name = cname + "=";
    const ca = document.cookie.split(';');
    for(let i=0; i < ca.length; i++)
    {
        const c = ca[i].trim();
        if (c.indexOf(name) === 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

/**
 * 删除cookie
 *
 * @param name cookie名字
 */
function delCookie(name)
{
    const exp = new Date();
    exp.setTime(exp.getTime() - 1);
    const cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

/**
 * 检查登录状态
 *
 * @param token token值
 */
function checkLogin(token) {
    // token值不存在
    if (token === "") {
        alert("身份已过期，请重新登录");
        window.location.href = 'index.html';
    }
}