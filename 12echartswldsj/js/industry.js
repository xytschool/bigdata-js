$(function () {
  var last_year_month=[]
  var day_group=[]
  $.ajax({
    type: "GET",
    url: "http://bigdata.xyt/api/getCustomerSummary",
    dataType: "json",
    success: function (data) {
      day_group = data.day_group
      last_year_month = data.last_year_day_group
      char()
    },
    error: function (jqXHR) {
      console.log("Error: " + jqXHR.status);
    }
  });
  function char() {
    day_group_data = []
    console.log(day_group);
    for (var i = 0; i < day_group.length; i++) {
      day_group_data.push(day_group[i].value)
    }

    var myChart = echarts.init(document.getElementById('container3'));
    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['本期', '同期', ],
        textStyle: {
          color: '#fff'
        }
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '0%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"],
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: "#ffffff" //X轴文字颜色
          }
        },
      }],
      yAxis: [{
        type: 'value',

        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: "#ffffff" //X轴文字颜色
          }
        },
      }],
      series: [{
          name: '本期',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(128, 255, 165)'
              },
              {
                offset: 1,
                color: 'rgba(1, 191, 236)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: day_group_data
        },
        {
          name: '同期',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(0, 221, 255)'
              },
              {
                offset: 1,
                color: 'rgba(77, 119, 255)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: last_year_month
        },

      ]
    };


    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }


});