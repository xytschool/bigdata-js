(function () {
    'use strict';
    var myChart = echarts.init(document.getElementById('left-mid-nong'));

    // 指定图表的配置项和数据
    var option = {
        "color": ["#00E4F0", "#f020d4","#44D16D", "#124E91", "#BDC414", "#C8CCA5", "#534EE1"],
        tooltip: {},
        legend: [{
                // 设置布局方向
                orient: 'vertical',
                // 文字和图形对齐方式
                align: 'left',
                right: '5%',
                top: '10%',
                // 图形形状
                icon: 'circle',
                padding: [20, 0, 0, 0],
                itemGap: 20,
                textStyle: {
                    borderRadius: 100,
                    color:'#fff'
                },
                data: ["8:00-10:00", "10:00-12:00", "12:00-14:00",'14:00-16:00', "其他", "16:00-18:00"]
            },
        ],
        grid: [{
          left:"0%",
          width: '80%'
        }],
        series: [{
            name: '时段',
            type: 'pie',
            radius: '50%',
            left: '0%',
            bottom:'10%',
            data: [{
                    value: 5,
                    name: '12:00-14:00'
                },
                {
                    value: 6,
                    name: '14:00-16:00'
                },
                {
                    value: 2,
                    name: '16:00-18:00'
                },
                {
                    value: 4,
                    name: '其他'
                },
                {
                    value: 3,
                    name: '8:00-10:00'
                },
                {
                    value: 6,
                    name: '10:00-12:00'
                },

            ]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener('resize',function(){
        myChart.resize();
    })


})()
