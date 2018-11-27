$(function () {

    var productId = getSearch("productId");

    $.ajax({
        type: 'get',
        url: '/product/queryProductDetail',
        data: {
            id: productId
        },
        dataType: 'json',
        success: function (info) {
            console.log(info);
            var htmlStr = template("productTpl", info);
            $('.lt_main .mui-scroll').html(htmlStr);

            // 渲染 轮播图
            var gallery = mui('.mui-slider');
            gallery.slider({
                interbal: 5000
            });
            mui('.mui-numbox').numbox();
        }
    });

    // 尺码
    $('.lt_main').on('click', ".lt_size span", function () {
        // 让自己家还是那个current类 移除其他的current类
        $(this).addClass("current").siblings().removeClass("current");

    });

    // 加入购物车 

    $("#addCart").click(function () {
        // 获取尺码 和数量
        var size = $('.lt_size span.current').text();
        var num = $('.mui-numbox-input').val();

        if (size == null) {
            // 没有选择尺码
            mui.toast("请选择尺码");
            return;

        }

        // 发送ajax请求
        $.ajax({
            type: "post",
            url: "/cart/addCart",
            data: {
                productId: productId,
                size: size,
                num: num
            },
            dataType: "json",
            success: function (info) {
                console.log(info);


                // if (info.error === 400) {
                //     location.href = "login.html?retUrl=" + location.href;
                //     return;
                // }
                if (info.error === 400) {
                    location.href = "login.html?retUrl=" + location.href;
                    return;
                }



                // if (info.success) {
                //     // 给用户提示

                //     mui.confirm("添加成功", "温馨提示", ["去购物车", "继续浏览"], function (e) {
                //         // e.index 标记 当前点击的下标
                //         if (e.index === 0) {
                //             location.href = "cart.html";
                // (2) 已登录, success 加入成功
                if (info.success) {
                    // 给用户提示
                    mui.confirm("添加成功", "温馨提示", ["去购物车", "继续浏览"], function (e) {
                        // e.index 标记当前点击的按钮下标
                        if (e.index === 0) {
                            // 去购物车
                            location.href = "cart.html";
                        }

                    })
                }
            }

        })

    })
})