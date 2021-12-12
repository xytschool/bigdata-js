(function () {
  'use strict';
  var myChart = echarts.init(document.getElementById('left-bottom-nong'));
  // 指定图表的配置项和数据
  var option = {
    tooltip: {},
    series: [{
      name: '销量',
      type: 'pie',
      radius: ['30%', '60%'],
      right: '20%',
      data: [{
          value: 124,
          name: '6日',
          itemStyle: {
            color: '#5f100f'
          }
        },
        {
          value: 154,
          name: '7日',
          itemStyle: {
            color: '#d2e5df'
          }
        }, {
          value: 99,
          name: '8日',
          itemStyle: {
            color: '#7a8aa7'
          }
        },
        {
          value: 57,
          name: '9日',
          itemStyle: {
            color: '#9a81c3'
          }
        }, {
          value: 197,
          name: '10日',
          itemStyle: {
            color: '#f4dfd5'
          }
        },
        {
          value: 76,
          name: '11日',
          itemStyle: {
            color: '#a0fffe'
          }
        },
        {
          value: 136,
          name: '12日',
          itemStyle: {
            color: '#5ba3ed'
          }
        },


      ]
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  window.addEventListener('resize', function () {
    myChart.resize();
  })
})()