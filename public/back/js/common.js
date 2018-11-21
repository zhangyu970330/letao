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
})