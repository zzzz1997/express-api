(function (window) {
    window.angular.module('index', [])
        .controller('loginCtrl', function ($scope, $http) {
            /**
             * 登录后台管理系统
             */
            $scope.login = function () {
                const name = document.getElementById("name").value;
                const pwd = document.getElementById("pwd").value;
                $http.post("/user/login",{ username: name, password: pwd })
                    .then(function (response) {
                        // 登录成功
                        if (response.data.success) {
                            // 作为管理员
                            if (response.data.data.user.isAdmin === 1) {
                                setCookie("token", response.data.data.token);
                                setCookie("admin", response.data.data.user.username);
                                window.location.href = '/html/user.html';
                            } else {
                                alert("抱歉，您无权限登录此系统！");
                            }
                        } else {
                            alert("用户名或密码错误！");
                        }
                    }, function (error) {
                        alert(error);
                    });
            };
        })
})(window);

/**
 * 设置cookie
 *
 * @param name cookie名称
 * @param value cookie值
 */
function setCookie(name,value)
{
    const d = new Date();
    d.setTime(d.getTime() + (10 * 60 * 1000));
    const expires = "expires=" + d.toGMTString();
    document.cookie = name + "=" + value + "; " + expires;
}