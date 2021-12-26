
  var time=''
  new Vue({
    el: '.topHeder',
    data: function () {
      return {
        value1: ''
      }
    },
    methods:{
      datachange(value){
        console.log(value);
        time=value
      }
    }
  })
$(function () {
  var hour_in_group = []
  var hour_out_group = []
  var province_customer = []
  var city_customer = []

  $.ajax({
    type: "GET",
    url: Vehicles,
    dataType: "json",
    success: function (data) {
      $("#total_seat").text(data.total_seat)
      $("#in").text(data.in)
      $("#free_seat").text(data.free_seat)
      $("#ticket_amount").text(data.ticket_amount)
      hour_in_group = data.hour_in_group
      hour_out_group = data.hour_out_group
      province_customer = data.province_customer
      city_customer = data.city_customer

      echart_3();
      echarts_5()
      echarts_6()
    },
    error: function (jqXHR) {
      console.log("Error: " + jqXHR.status);
    }
  });
  // echarts_1();
  echarts_4();
  echarts_2();

  
  function echart_3() {
    // 基于准备好的dom，初始化echarts实例
    var hour_in_group_data = []
    var hour_out_group_data = []
    var myChart = echarts.init(document.getElementById('chart_3'));

    for (var i = 0; i < hour_in_group.length; i++) {
      hour_in_group_data.push(hour_in_group[i].value)
      console.log(hour_in_group_data);
    }
    for (var i = 0; i < hour_out_group.length; i++) {
      hour_out_group_data.push(hour_out_group[i].value)
    }
    console.log(hour_in_group_data, hour_out_group_data);
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
      grid: [{
        top: '0%',

        width: '80%'
      }],
      legend: {

        data: ['进场数据', '离场数据'],
        textStyle: {
          color: "rgba(255,255,255,0.9)" //图例文字
        }
      },
      xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: ['06', '08', '10', '12', '14', '16', '18', '20', '22'],
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
          name: '进场数据',
          type: 'line',
          stack: 'Total',
          emphasis: {
            focus: 'series'
          },
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#13a19e'
              },
              {
                offset: 1,
                color: '#13a19e'
              }
            ])
          },
          data: hour_in_group_data
        },
        {
          name: '离场数据',
          type: 'line',
          stack: 'Total',
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#b2dff4'
              },
              {
                offset: 1,
                color: '#b2dff4'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: hour_out_group_data
        },

      ]
    };


    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }

  function echarts_4() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echart4'));
    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: '#57617B'
          }
        }
      },
      "legend": {

        "data": [{
            "name": "本期"
          },
          {
            "name": "同期"
          },

        ],
        "top": "0%",
        "textStyle": {
          "color": "rgba(255,255,255,0.9)" //图例文字
        }
      },

      "xAxis": [{
        type: "category",
        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        },
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,1)",
            fontSize: '14',
          },
        },

      }, ],
      "yAxis": [{
          "type": "value",
          "name": "",
          "min": 0,
          "max": 50,
          "interval": 10,
          "axisLabel": {
            "show": true,

          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255,255,67,.8)'
            }
          }, //左线色

        },
  
      ],
      "grid": {
        "top": "10%",
        "right": "30",
        "bottom": "30",
        "left": "30",
      },
      "series": [{
          "name": "本期",
          "type": "bar",
          "data": [4, 6, 36, 6, 8, 6, 4, 6, 30, 6, 8, 12],
          "barWidth": "auto",
          "itemStyle": {
            "normal": {
              "color": {
                "type": "linear",
                "x": 0,
                "y": 0,
                "x2": 0,
                "y2": 1,
                "colorStops": [{
                    "offset": 0,
                    "color": "#609db8"
                  },

                  {
                    "offset": 1,
                    "color": "#609db8"
                  }
                ],
                "globalCoord": false
              }
            }
          }
        },
        {
          "name": "同期",
          "type": "bar",
          "data": [
            4, 2, 34, 6, 8, 6, 4, 2, 32, 6, 8, 18
          ],
          "barWidth": "auto",

          "itemStyle": {
            "normal": {
              "color": {
                "type": "linear",
                "x": 0,
                "y": 0,
                "x2": 0,
                "y2": 1,
                "colorStops": [{
                    "offset": 0,
                    "color": "#66b8a7"
                  },
                  {
                    "offset": 1,
                    "color": "#66b8a7"
                  }
                ],
                "globalCoord": false
              }
            }
          },
          "barGap": "0"
        },
       
      ]
    };


    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }

  function echarts_2() {
    var worldMapContainer1 = document.getElementById('map');
    var myChart = echarts.init(worldMapContainer1);
    var option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        y: 'bottom',
        data: [
          '购票人数'
        ],
        textStyle: {
          color: '#ccc'
        }
      },

      series: [{
          name: '购票人数',
          type: 'map',
          aspectScale: 0.75,
          zoom: 1.2,
          mapType: 'china',
          roam: false,
          label: {
            normal: {
              show: true, //显示省份标签
              textStyle: {
                color: "#c71585"
              } //省份标签字体颜色
            },
            emphasis: { //对应的鼠标悬浮效果
              show: true,
              textStyle: {
                color: "#800080"
              }
            }
          },


        },

      ],

    };

    myChart.setOption(option);

    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }

  function echarts_5() {
    var province = []
    var value = []

    var worldMapContainer1 = document.getElementById('province');
    var myChart = echarts.init(worldMapContainer1);
    for (var i = 0; i < province_customer.length; i++) {
      province.push(province_customer[i].province)
      value.push(province_customer[i].value)

    }
    console.log(province);
    const seriesLabel = {
      show: true
    };
    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ["省份"],
        textStyle: {
          color: "#fff"
        }
      },
      grid: {
        left: 100
      },

      xAxis: {
        show: false,
        type: 'value',
        name: 'Days',
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: "#ffffff" //X轴文字颜色
          }
        }
      },
      yAxis: {

        type: 'category',
        inverse: false,
        data: province,
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: "#ffffff" //X轴文字颜色
          }
        },
      },
      series: [{
        name: '省份',
        type: 'bar',
        data: value,
        label: seriesLabel,
        markPoint: {
          symbolSize: 1,
          symbolOffset: [0, '50%'],
        },
        itemStyle: {
          normal: {
            barBorderRadius: 5,
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [{
                offset: 0,
                color: '#788fd8'
              }, ]
            )
          }
        },
      }, ]
    };
    myChart.setOption(option);

    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }

  function echarts_6() {
    var city = []
    var value = []
    var worldMapContainer1 = document.getElementById('city');
    var myChart = echarts.init(worldMapContainer1);
    for (var i = 0; i < city_customer.length; i++) {
      city.push(city_customer[i].city)
      value.push(city_customer[i].value)

    }
    console.log(city);
    const seriesLabel = {
      show: true
    };
    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ["城市"],
        textStyle: {
          color: "#fff"
        }
      },
      grid: {
        left: 100
      },

      xAxis: {
        show: false,
        type: 'value',
        name: 'Days',
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: "#ffffff" //X轴文字颜色
          }
        }
      },
      yAxis: {
        type: 'category',
        inverse: true,
        data: city,
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: "#ffffff" //X轴文字颜色
          }
        },
      },
      series: [{
        name: '城市',
        type: 'bar',
        data: value,
        label: seriesLabel,
        markPoint: {
          symbolSize: 1,
          symbolOffset: [0, '50%'],
        },
        itemStyle: {
          normal: {
            barBorderRadius: 5,
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [{
                offset: 0,
                color: '#f3c96b'
              }, ]
            )
          }
        },
      }, ]
    };
    myChart.setOption(option);

    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }
})