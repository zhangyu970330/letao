$(function () {

    // 获取搜索框的关键字
    var key = getSearch("key")
    console.log(key);

    $('.search_input').val(key)

    render();


    // 点击搜索的按钮 发送ajax请求 获取数据 进行渲染
    $('.search_btn').click(function () {
        render();
    })

    // 点击排序按钮 实现高亮 并切换

    $('.lt_sort a[data-type]').click(function () {
        if ($(this).hasClass("current")) {
            // 有类
            $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
        } else {
            $(this).addClass("current").siblings().removeClass("current");
        }
        render();
    })

    function render() {
        $('.lt_product').html(' <div class="loading"></div> ')

        var paramsObj = {};
        paramsObj.proName = $('.search_input').val();
        paramsObj.page = 1;
        paramsObj.pageSize = 100;

        var $current = $('.lt_sort a.current');

        if ($current.length === 1) {
            var sortName = $current.data("type");


            var sorValue = $current.find("i").hasClass("fa-angle-down") ? 2 : 1;
            paramsObj[sortName] = sorValue;
        }
        setTimeout(function () {

            $.ajax({
                type: "get",
                url: "/product/queryProduct",
                data: paramsObj,
                dataType: "json",
                success: function (info) {
                    console.log(info);
                    var htmlStr = template("searchTlw", info);
                    $('.lt_product').html(htmlStr);
                }
            })
        }, 500)


    }


})