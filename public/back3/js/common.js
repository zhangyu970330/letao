$(function () {

    $('#manage').click(function () {
        $(this).next().stop().slideToggle();
        $(this).next().stop().slideToggle();
        // 2. 左侧菜单切换功能
        $('.lt_topbar .icon_left').click(function () {
            // 让左侧侧边菜单切换  toggleClass 切换类
            $('.lt_aside').toggleClass("hidemenu");
            $('.lt_topbar').toggleClass("hidemenu");
            $('.lt_main').toggleClass("hidemenu");
        })
    })



})