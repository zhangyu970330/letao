$(function () {

    // 登录 点击按钮  发送登录请求

    $('#loginBtn').click(function () {

        var username = $('#username').val().trim();
        var password = $('#password').val().trim();

        // 非空

        if (username === "") {
            mui.toast("请输入用户名");
            return;
        }

        if (password === "") {
            mui.toast("请输入密码");
            return;
        }

        $.ajax({
            type: "post",
            url: "/user/login",
            data: {
                username: username,
                password: password
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                if (info.error === 403) {
                    mui.toast("用户名或者密码错误");
                    return;
                }
                if (info.success) {
                    if (location.search.indexOf('retUrl') != -1) {
                        // "?retUrl=http://localhost:3000/front/product.html?productId=8"
                        var retUrl = location.search.replace("?retUrl=", "");

                        // 得到地址跳转
                        location.href = retUrl;

                    } else {
                        // 没有传参 
                        location.href = "user.html"
                    }
                }

            }
        })

    })

})