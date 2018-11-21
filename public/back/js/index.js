$(function () {

    // 基于准备好的dom，初始化echarts实例
    var echarts_left = echarts.init(document.querySelector('.echarts_left'));

    // 指定图表的配置项和数据
    var option1 = {
        title: {
            text: ' 2018年注册人数'
        },
        tooltip: {},
        legend: {
            data: ['销量']
        },
        xAxis: {
            data: ["1月", "2月", "3月", "4月", "5月", "6月"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: "bar",
            data: [500, 200, 360, 120, 300, 400]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    echarts_left.setOption(option1);




    // 右侧饼图

    var echarts_right = echarts.init(document.querySelector(".echarts_right"));


    var option2 = {

        title: {
            text: '热门品牌销售',

            subtext: '2018年11月',

            x: 'center',
            textStyle: {
                fontSize: 25,
                color: "#e92322"
            }
        },
        // 提示框组件
        tooltip: {
            trigger: 'item',
            // {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // 图例
        legend: {

            orient: 'vertical',

            left: 'left',
            data: ['耐克', '阿迪', '阿迪王', '老北京', '老太太']
        },
        // 系列列表
        series: [{
            name: '热门品牌',
            type: 'pie',

            radius: '55%',
            // 圆心的坐标
            center: ['50%', '60%'],
            data: [{
                    value: 335,
                    name: '耐克'
                },
                {
                    value: 310,
                    name: '阿迪'
                },
                {
                    value: 234,
                    name: '阿迪王'
                },
                {
                    value: 135,
                    name: '老北京'
                },
                {
                    value: 1548,
                    name: '老太太'
                }
            ],
            // 控制额外的阴影效果
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'none'
                }
            }
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    echarts_right.setOption(option2);


})