$(function () {

    var currentPage = 1;
    var pageSize = 5
    render();

    function render() {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataPage: "json",
            success: function (info) {
                console.log(info);
                var htmlStr = template("secondTpl", info);
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
    $('#addBtn').click(function () {
        $('#addModal').modal("show")

        $.ajax({
            type: 'get',
            url: "/category/queryTopCategoryPaging",
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                var htmlStr = template("dropdownTpl", info);
                $('.dropdown-menu').html(htmlStr);

            }
        })


    })

    // 下来菜单
    $('.dropdown-menu').on('click', 'a', function () {

        var txt = $(this).text();

        $('#dropdownText').text(txt);

        var id = $(this).data("id");

        $('[name="categoryId"]').val(id);

        $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");


    });


    // 上传图片
    $("#fileupload").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            console.log(data);
            var result = data.result;

            var picUrl = result.picAddr;

            $('#imgBox img').attr('src', picUrl);

            $('[name="brandLogo"]').val(picUrl);

            $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
        }
    });




    // 表单校验
    $('#form').bootstrapValidator({
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            brandName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入二级分类名称'
                    }
                }
            },
            categoryId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入一级分类名称'
                    }

                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传图片"
                    }
                }
            }
        }

    });

    $('#form').on("success.form.bv", function (e) {

        // 阻止默认的提交
        e.preventDefault();

        // 通过 ajax 提交
        $.ajax({
            type: "post",
            url: "/category/addSecondCategory",
            data: $('#form').serialize(),
            dataType: "json",
            success: function (info) {
                console.log(info);
                if (info.success) {
                    // 添加成功
                    // 关闭模态框
                    $('#addModal').modal("hide");
                    // 重新渲染页面, 重新渲染第一页
                    currentPage = 1;
                    render();

                    // 内容和状态都要重置
                    $('#form').data("bootstrapValidator").resetForm(true);
                }
            }
        })

    })

})