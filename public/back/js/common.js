$(function () {
    // 进度条

    $(document).ajaxStart(function () {

        // 开启进度条
        NProgress.start();




    })

    $(document).ajaxStop(function () {

        // 关闭进度条
        setTimeout(function () {
            NProgress.done();

        }, 500)



    });


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
})