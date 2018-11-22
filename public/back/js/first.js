$(function () {

    var currentPage = 1;
    var pageSize = 5;



    render();

    function render() {
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                var htmlStr = template("firstTpl", info);
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
    $('#addBtn').click(function () {
        $('#addModal').modal("show")



    })


    // 表单校验
    $('#form').bootstrapValidator({

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入一级分类名称'
                    },

                }
            },
        }

    });

    // 4. 注册表单成功效验成功，阻止默认的表单提交  提交ajax
    $('#form').on("success.form.bv", function (e) {
        e.preventDefault();

        $.ajax({
            type: "post",
            url: "/category/addTopCategory",
            data: $('#form').serialize(),
            dataType: "json",
            success: function (info) {
                console.log(info);
                if (info.success) {
                    $('#addModal').modal("hide")

                    currentPage = 1
                    render();
                    $('#form').data('bootstrapValidator').resetForm(true);
                }
            }
        })
    })
})