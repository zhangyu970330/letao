$(function () {

    var picArr = [];
    var currentPage = 1;
    var pageSize = 3;
    render();

    // 渲染表单 添加分页
    function render() {
        $.ajax({
            type: "get",
            url: "/product/queryProductDetailList",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                var htmlStr = template("productTpl", info);
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
    // 下拉框渲染
    $('#addBtn').click(function () {
        $('#addModal').modal("show");
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
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

    // /   给下来菜单添加点击事件
    $('.dropdown-menu').on('click', 'a', function () {

        var txt = $(this).text();

        $('#dropdownText').text(txt);

        var id = $(this).data("id");

        $('[name="brandId"]').val(id);

        $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID");


    });
    // 添加图片
    $('#fileupload').fileupload({
        dataType: "json", //返回到数据
        done: function (e, data) {
            console.log(data);


            // var picObj = data.result; // 图片信息(图片名称/图片地址)
            // 往数组的最前面追加
            // picArr.unshift(picObj);
            var picObj = data.result;

            picArr.unshift(picObj);


            var utlPci = picObj.picAddr;

            $('#imgBox').prepend('<img src="' + utlPci + '" style="width:100px;">') //height:100px;



            if (picArr.length > 3) {

                picArr.pop();

                $('#imgBox img:last-of-type').remove();

            }
            if (picArr.length === 3) {
                $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID");
            }


        }
    });



    // 表单验证
    $('#form').bootstrapValidator({
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: "请选择二级分类"
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: "请输入商品名称"
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: "请输入商品描述"
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: "请输入商品库存"
                    },
                    //正则校验, 非零(1-9)
                    // \d  0-9
                    // *    表示0次或多次
                    // +    表示1次或多次
                    // ?    表示0次或一次
                    // {m,n}
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '请输入数字'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: "请输入商品尺码"
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        // /^\d{2}-\d{2}$/,
                        message: '请输入正确格式:xx-xx'
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: "请输入商品原价"
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: "请输入商品现价"
                    }
                }
            },
            picStatus: {
                validators: {
                    notEmpty: {
                        message: "请输入三张图片"
                    }
                }
            },
        }

    })
    // 表单验证成功是 

    //     $('#from').on("success.form.bv", function (e) {
    //         e.preventDefault();

    //         // 还需要拼接上图片地址和名称
    //         // paramsStr += "&key1=value1&key2=value2"
    //         var pramastr = $('#form').serialize();
    //         pramastr += "&picName1=" + picArr[0].picName + "&picAddr1=" + picArr[0].picAddr;
    //         pramastr += "&picName2=" + picArr[1].picName + "&picAddr2=" + picArr[1].picAddr;
    //         pramastr += "&picName3=" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr;



    //         console.log(pramastr);
    //         $.ajax({
    //             type: "post",
    //             url: "/product/addProduct",
    //             data: pramastr,
    //             dataType: "json",
    //             success: function (info) {
    //                 console.log(info);
    //                 if (info.success) {
    //                     // 关闭模态框
    //                     $('#addModal'), modal('hide');
    //                     currentPage = 1;
    //                     rander();
    //                     // 手动重置隐藏域

    //                     $('#form').data("bootstrapValidator").resetForm(true);
    //                     $('#dropdownText').text("请重新选择二级分类");
    //                     $('#imgBox img').remove();
    //                     picArr = [];
    //                 }

    //             }
    //         })




    //     })


    // })
    $('#form').on("success.form.bv", function (e) {
        e.preventDefault();

        var paramsStr = $('#form').serialize(); // 所有表单内容数据

        // 还需要拼接上图片地址和名称
        // paramsStr += "&key1=value1&key2=value2"
        paramsStr += "&picName1=" + picArr[0].picName + "&picAddr1=" + picArr[0].picAddr;
        paramsStr += "&picName2=" + picArr[1].picName + "&picAddr2=" + picArr[1].picAddr;
        paramsStr += "&picName3=" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr;

        $.ajax({
            type: "post",
            url: "/product/addProduct",
            data: paramsStr,
            dataType: "json",
            success: function (info) {
                console.log(info);
                if (info.success) {
                    // 添加成功
                    // 关闭模态框
                    $('#addModal').modal("hide");
                    // 页面重新渲染第一页
                    currentPage = 1;
                    render();

                    // 重置所有的表单内容和状态
                    $('#form').data("bootstrapValidator").resetForm(true);

                    // 由于下拉菜单  和  图片 不是表单元素, 需要手动重置
                    $('#dropdownText').text("请选择二级分类");

                    // 删除图片的同时, 清空数组
                    $('#imgBox img').remove();
                    picArr = [];
                }
            }
        })
    })



})