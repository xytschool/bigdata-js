(function () {
  'use strict';
  var myChart = echarts.init(document.getElementById('left-bottom-nong'));
  // 指定图表的配置项和数据
  var option = {
    tooltip: {},
    series: [{
      name: '来访',
      type: 'pie',
      radius: ['30%', '60%'],
      right: '20%',
      data: [{
          value: 33,
          name: '21日',
          itemStyle: {
            color: '#5f100f'
          }
        },
        {
          value: 24,
          name: '22日',
          itemStyle: {
            color: '#d2e5df'
          }
        }, {
          value: 19,
          name: '23日',
          itemStyle: {
            color: '#7a8aa7'
          }
        },
        {
          value: 17,
          name: '24日',
          itemStyle: {
            color: '#9a81c3'
          }
        }, {
          value: 20,
          name: '25日',
          itemStyle: {
            color: '#f4dfd5'
          }
        },
        {
          value: 26,
          name: '26日',
          itemStyle: {
            color: '#a0fffe'
          }
        },
        {
          value: 14,
          name: '27日',
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
