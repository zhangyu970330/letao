$(document).ajaxStart(function () {

    // 开启进度条
    NProgress.start();




})

$(document).ajaxStop(function () {

    // 关闭进度条
    setTimeout(function () {
        NProgress.done();

    }, )



});


$(function () {
    // 进度条



    // 公用的功能
    // 1.左侧二级切换功能
    $('#category').click(function () {
        $(this).next().stop().slideToggle();
    })

    // 2. 左侧菜单切换功能
    $('.lt_topbar .icon_left').click(function () {
        // 让左侧侧边菜单切换  toggleClass 切换类
        $('.lt_aside').toggleClass("hidemenu");
        $('.lt_topbar').toggleClass("hidemenu");
        $('.lt_main').toggleClass("hidemenu");
    })


    // 模态框退出
    $('.lt_topbar .icon_right').click(function () {
        // 显示退出的模态框
        $('#logoutModal').modal("show");
    });
    $("#logoutBtn").click(function () {

        // 接口
        $.ajax({
            type: "get",
            url: "/employee/employeeLogout",
            dataType: "json",
            success: function (info) {
                if (info.success) {
                    location.href = "login.html";
                }

            }
        })
    })

})