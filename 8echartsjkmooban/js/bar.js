(function () {
    'use strict';
    var myChart = echarts.init(document.getElementById('left-header-nong'));

    var option = {
        title: {
            textStyle: {
                color: '#2b8fff',
                fontSize: 14,
                fontWeight: 'bold'
            }
        },
        tooltip: {},
        legend: {
            show: false
        },
      
        xAxis: {
            data: ["0-5分钟", "5-30分钟", "30-120分钟", "120分钟及以上"],
            axisLabel: {
                // X 轴标签
                rotate: 40,
                fontSize: 10
            },
            // 坐标轴线相关设置设置
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#fff'
                }
            },
            axisTick: {
                show: false
            }

        },
        yAxis: {
            type: 'value',
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#fff'
                }
            },
            axisTick: {
                show: false
            }
        },
        series: [
          {
                name: '浅蓝',
                type: 'bar',
                data: [2, 4, 6, 2, 8],
                itemStyle: {
                    color: '#52d2ff'
                },
                barWidth: 10,
                label: {
                    show: true,
                    position: 'top',
                    fontSize: 10,
                    color: '#52d2ff'
                }
            },
          
        ]
    };
    myChart.setOption(option);
    window.addEventListener('resize',function(){
        myChart.resize();
    })
    // 屏幕适配
})()