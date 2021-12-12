(function () {
    'use strict';
    var myChart = echarts.init(document.getElementById('left-mid-nong'));

    // 指定图表的配置项和数据
    var option = {
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
                data: ["12:00-13:00", '13:00-14:00', "其他", "10:00-11:00", "11:00-12:00"]
            },
           
        ],
        grid: [{
        
          left:"0%",
          width: '80%'
        }],
        series: [{
            name: '销量',
            type: 'pie',
            radius: '50%',
            left: '0%',
            bottom:'10%',
            data: [{
                    value: 200,
                    name: '12:00-13:00'
                },
                {
                    value: 156,
                    name: '13:00-14:00'
                },
                {
                    value: 400,
                    name: '其他'
                },
                {
                    value: 991,
                    name: '10:00-11:00'
                },
                {
                    value: 332,
                    name: '11:00-12:00'
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