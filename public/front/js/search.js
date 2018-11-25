/**
 * Created by 54721 on 2018/11/25.
 */

/*
* 由于整个页面都在进行本地历史记录的操作, 所以约定键名: search_list
*
  以下 3 行代码, 用于在控制台执行, 添加假数据
  var arr = ["耐克", "啊迪", "阿迪王", "耐克王", "老奶奶", "老北京"];
  var jsonStr = JSON.stringify( arr );
  localStorage.setItem( "search_list", jsonStr );
* */

/*
 * 功能分析
 * 功能1: 本地历史记录渲染展示
 * 功能2: 清空所有历史记录
 * 功能3: 删除单条历史记录
 * 功能4: 添加搜索历史
 * */

$(function () {
    /*
     * 功能1: 本地历史记录渲染展示
     * 思路:
     *   (1) 从本地读取搜索历史
     *   (2) 读出来的是 jsonStr, 转换成数组
     *   (3) 结合模板引擎渲染
     * */
    render();

    function getHistory() {
        var jsonStr = localStorage.getItem("search_list") || "[]";
        var arr = JSON.parse(jsonStr); // 这是转成字符串
        return arr;
    }

    function render() {
        var arr = getHistory();
        var htmlStr = template("searchTpl", {
            list: arr
        });
        $(".lt_history").html(htmlStr);
    }

    /*
     * 功能2: 清空所有历史记录
     * 思路:
     *   (1) 给清空记录添加点击事件 (事件委托注册)
     *   (2) 利用removeItem清空所有的历史记录
     *   (3) 重新渲染页面
     * */

    $(".lt_history").on("click", ".btn_empty", function () {
        mui.confirm("你确认删除记录吗？", "温馨提示", ["取消 ", " 确认"], function (
            e
        ) {
            if (e.index === 1) {
                localStorage.removeItem("search_list");
                render();
            }
        });
    });
    // var arr = JSON.parse(jsonStr); // 这是转成字符串
    // localStorage.setItem( "search_list", JSON.stringify(arr) );
    // 单个删除记录
    $(".lt_history").on("click", ".btn_delete", function () {
        // 下标
        var index = $(this).data("index");
        var arr = getHistory();
        arr.splice(index, 1);
        localStorage.setItem("search_list", JSON.stringify(arr));
        render();
    });

    // 添加历史记录
    $('.search_btn').click(function () {

        var key = $('.search_input').val().trim();


        if (key === "") {
            mui.toast("请输入内容");
            return;
        }

        // 获取数组
        var arr = getHistory();
        // 去重
        var index = arr.indexOf(key);
        if (index != -1) {
            arr.splice(index, 1);
        }
        // 超10
        if (arr.length >= 10) {
            arr.pop();
        }

        // 往数组前面增加
        arr.unshift(key);

        localStorage.setItem("search_list", JSON.stringify(arr));

        render();
        $('.search_input').val("");

        // 跳转
        location.href = "searchList.html?key=" + key;
    })


});

// })