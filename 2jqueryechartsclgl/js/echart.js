$(function () {
  var startDate = ""
  var endDate = ""

  new Vue({
    el: '.topHeder',
    data: function () {
      return {
        value1: ''
      }
    },
    methods: {
      datachange(value) {
        console.log('time', value);
        startDate = value[0]
        endDate = value[1]
        getPageDate()
      }
    }
  })
  var hour_in_group = []
  var hour_out_group = []
  var province_customer = []
  var city_customer = []
  var month_group = []
  var last_year_month_group = []
  var total_self_city = null
  var total_self_province = null
  var total_other_province = null
  var total_Fuel = null
  var total_NEV = null

  function getPageDate() {
    $.ajax({
      type: "GET",
      url: Vehicles,
      data: {
        start: startDate,
        end: endDate
      },
      dataType: "json",
      success: function (data) {
        $("#total_seat").text(data.total_seat)
        $("#in").text(data.in)
        $("#free_seat").text(data.free_seat)
        $("#ticket_amount").text(data.ticket_amount)
        total_self_city = data.total_self_city
        total_self_province = data.total_self_province
        total_other_province = data.total_other_province
        total_Fuel = data.total_Fuel
        total_NEV = data.total_NEV
        hour_in_group = data.hour_in_group
        hour_out_group = data.hour_out_group
        province_customer = data.province_customer_name
        city_customer = data.city_customer
        month_group = data.month_group.map(function (item) {
          return item.value
        })
        last_year_month_group = data.last_year_month_group.map(function (item) {
          return item.value
        })
        console.log('month_group', month_group)
        console.log('province_customer_name', province_customer)
        echart_3()
        echarts_5()
        echarts_6()
        echarts_2()
        echarts_4()
        echarts_1();
      },
      error: function (jqXHR) {
        console.log("Error: " + jqXHR.status);
      }
    });
  }
  getPageDate()
  echarts_4();

  function echarts_1() {
    var myChart = echarts.init(document.getElementById('echarts_1'));
    var hour_in_group_data = []
    for (var i = 0; i < hour_in_group.length; i++) {
      hour_in_group_data.push(hour_in_group[i].name + "??????")
    }
    option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        bottom: 10,
        left: 'center',
        data: hour_in_group_data
      },
      series: [{
        type: 'pie',
        radius: '65%',
        center: ['50%', '50%'],
        selectedMode: 'single',
        data: hour_in_group,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };

    // ???????????????????????????????????????????????????
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }

  function echart_3() {
    // ??????????????????dom????????????echarts??????
    var myChart = echarts.init(document.getElementById('chart_3'));

    var xLables = ['06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22']
    var hour_in_group_data = xLables.map(function (item) {
      for (var i = 1; i < hour_in_group.length; i++) {
        if (hour_in_group[i].hour == parseInt(item)) {
          return hour_in_group[i].value
        }
      }
      return 0
    })

    var hour_out_group_data = xLables.map(function (item) {
      for (var i = 1; i < hour_out_group.length; i++) {
        if (hour_out_group[i].hour == parseInt(item)) {
          return hour_in_group[i].value
        }
      }
      return 0
    })


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

        data: ['????????????', '????????????'],
        textStyle: {
          color: "rgba(255,255,255,0.9)" //????????????
        }
      },
      xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: xLables,
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: "#ffffff" //X???????????????
          }
        },
      }],
      yAxis: [{
        type: 'value',
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: "#ffffff" //X???????????????
          }
        },
      }],
      series: [{
          name: '????????????',
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
          name: '????????????',
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


    // ???????????????????????????????????????????????????
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }

  function echarts_4() {
    // ??????????????????dom????????????echarts??????
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
            "name": "??????"
          },
          {
            "name": "??????"
          },

        ],
        "top": "0%",
        "textStyle": {
          "color": "rgba(255,255,255,0.9)" //????????????
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
        "max": 5000,
        "axisLabel": {
          "show": true,
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,67,.8)'
          }
        }, //?????????
      }, ],
      "grid": {
        "top": "10%",
        "right": "40",
        "bottom": "30",
        "left": "30",
      },
      "series": [{
          "name": "??????",
          "type": "bar",
          "data": month_group,
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
          "name": "??????",
          "type": "bar",
          "data": last_year_month_group,
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


    // ???????????????????????????????????????????????????
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
        trigger: 'item',
        formatter: function (num) {
          console.log(num);
          if (num.value > 0) {
            return num.name + ":" + num.value
          } else {
            return num.name + ": 0"
          }
        }
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        y: 'bottom',
        data: ['?????????'],
        textStyle: {
          color: '#ccc'
        }
      },
      visualMap: {
        top: 'middle',
        right: 10,
        color: ['orangered', 'yellow', 'lightskyblue', ],
        textStyle: {
          color: "#fff"
        }
      },
      series: [{
        name: '?????????',
        type: 'map',
        aspectScale: 0.75,
        zoom: 1.2,
        mapType: 'china',
        roam: false,
        label: {
          normal: {
            show: true, //??????????????????
            textStyle: {
              color: "#c71585"
            } //????????????????????????
          },
          emphasis: { //???????????????????????????
            show: true,
            textStyle: {
              color: "#800080"
            }
          }
        },
        itemStyle: {
          normal: {
            borderWidth: .5, //??????????????????
            borderColor: '#009fe8', //??????????????????
            areaColor: "#ffffff", //????????????
          },
          emphasis: {
            borderWidth: .5,
            borderColor: '#4b0082',
            areaColor: "#ffdead",
          }
        },
        data: province_customer
      }, ],
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
      province.push(province_customer[i].name)
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
        data: ["??????"],
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
            color: "#ffffff" //X???????????????
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
            color: "#ffffff" //X???????????????
          }
        },
      },
      series: [{
        name: '??????',
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
        data: ["??????"],
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
            color: "#ffffff" //X???????????????
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
            color: "#ffffff" //X???????????????
          }
        },
      },
      series: [{
        name: '??????',
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