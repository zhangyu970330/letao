$(function () {

    var currentPage = 1;
    var pageSize = 5;

    var currentId;
    var isDelete;

    render();

    function render() {
        $.ajax({
            type: "get",
            url: "/user/queryUser",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                var htmlStr = template("tmp", info);
                $('tbody').html(htmlStr);

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: info.page, //当前页
                    totalPages: Math.ceil(info.total / info.size), //总页数
                    onPageClicked: function (a, b, c, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        currentPage = page;
                        render();
                    }
                });

            }
        })
    }



    // 点击禁用按钮 显示模态框
    // 模态框退出
    $('tbody ').on("click", ".btn", function () {
        // 显示的模态框
        $('#userModal').modal("show");

        // 获取用户的id
        currentId = $(this).parent().data("id");

        isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
    });
    $("#submitBtn").click(function () {

        // 接口
        $.ajax({
            type: "post",
            url: "/user/updateUser",
            data: {
                id: currentId,
                isDelete: isDelete,
            },
            dataType: "json",
            success: function (info) {
                console.log(info);

                if (info.success) {
                    $('#userModal').modal("hide");
                    render();
                }

            }
        })
    })






})