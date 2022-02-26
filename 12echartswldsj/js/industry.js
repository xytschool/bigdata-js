$(function () {

  var last_year_month = []
  var day_group = []
  var hour_group = []
  var startDate = ""
  var endDate = ""
  var province_customer = []
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

  function getPageDate() {
    $.ajax({
      type: "GET",
      url: Customer,
      data: {
        start: startDate,
        end: endDate
      },
      dataType: "json",
      success: function (data) {
        day_group = data.day_group
        last_year_month = data.last_year_day_group
        hour_group = data.hour_group
        province_customer = data.province_customer_name
        console.log('province_customer', province_customer)
        char()
        char_1()
        map()
      },
      error: function (jqXHR) {
        console.log("Error: " + jqXHR.status);
      }
    });
  }
  getPageDate()

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
      grid: {
        left: '0%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
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

  function char_1() {
    day_group_data = []
    for (var i = 0; i < hour_group.length; i++) {
      day_group_data.push(hour_group[i].value)
    }

    var dom = echarts.init(document.getElementById('container2'));
    var XData = ["08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"];
    var yData = hour_group;
    option = {
      backgroundColor: "",
      xAxis: {
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        splitArea: {
          show: false
        },
        data: XData,
        axisLabel: {
          formatter: function (value) {
            var ret = ""; //拼接加\n返回的类目项
            var maxLength = 1; //每项显示文字个数
            var valLength = value.length; //X轴类目项的文字个数
            var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
            if (rowN > 1) //如果类目项的文字大于3,
            {
              for (var i = 0; i < rowN; i++) {
                var temp = ""; //每次截取的字符串
                var start = i * maxLength; //开始截取的位置
                var end = start + maxLength; //结束截取的位置
                //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                temp = value.substring(start, end) + "\n";
                ret += temp; //凭借最终的字符串
              }
              return ret;
            } else {
              return value;
            }
          },
          interval: 0,
          fontSize: 14,
          fontWeight: 100,
          textStyle: {
            color: '#9faeb5',

          }
        },
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: "#ffffff" //X轴文字颜色
          }
        },
      },
      yAxis: {
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        splitArea: {
          show: false
        },

        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: "#ffffff" //X轴文字颜色
          }
        },
        axisLine: {
          lineStyle: {
            color: '#fff'
          }
        },

      },
      "tooltip": {
        "trigger": "axis",
        transitionDuration: 0,
        backgroundColor: 'rgba(83,93,105,0.8)',
        borderColor: '#535b69',
        borderRadius: 8,
        borderWidth: 2,
        padding: [5, 10],
        formatter: function (params, ticket, callback) {
          var res = '';
          for (var i = 0, l = params.length; i < l; i++) {
            res += '' + params[i].seriesName + ' : ' + params[i].value + '<br>';
          }
          return res;
        },
        axisPointer: {
          type: 'line',
          lineStyle: {
            type: 'dashed',
            color: '#ffff00'
          }
        }
      },
      series: [{
        name: '共享次数',
        type: "bar",
        itemStyle: {
          normal: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: '#00d386' // 0% 处的颜色
              }, {
                offset: 1,
                color: '#0076fc' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            },
            barBorderRadius: 15,
          }
        },
        label: {
          normal: {
            show: true,
            position: "top",
            textStyle: {
              color: "#ffc72b",
              fontSize: 10
            }
          }
        },
        data: yData,
        barWidth: 16,
      }, {
        name: '折线',
        type: 'line',
        itemStyle: {
          /*设置折线颜色*/
          normal: {
            /* color:'#c4cddc'*/
          }
        },
        data: yData
      }]
    };
    dom.setOption(option);
  }

  function map() {
    var worldMapContainer1 = document.getElementById('distribution_map');
    var myChart = echarts.init(worldMapContainer1);
    var yData = [];
    barData = province_customer.sort(function (a, b) {
      return b.value - a.value;
    });
    console.log(barData);
    for (var j = 0; j < barData.length; j++) {
      if (j < 10) {
        yData.push('0' + j + barData[j].name);
      } else {
        yData.push(j + barData[j].name);
      }
    }
    console.log(yData)
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
      visualMap: {
        top: 'middle',
        right: 10,
        color: ['orangered', 'yellow', 'lightskyblue', ],
        textStyle: {
          color: "#fff"
        }
      },
      title: [{
        show: true,
        text: '',
        subtext: '',
        subtextStyle: {
          color: '#ffffff',
          lineHeight: 20
        },
        textStyle: {
          color: '#fff',
          fontSize: 18
        },
        right: 140,
        top: 20
      }],
      grid: {
        right: 300,
        top: 10,
        bottom: 550,
        width: '100'
      },
      xAxis: {
        show: false
      },
      yAxis: {
        type: 'category',
        inverse: true,
        nameGap: 16,
        axisLine: {
          show: false,
          lineStyle: {
            color: '#ddd'
          }
        },
        axisTick: {
          show: false,
          lineStyle: {
            color: '#ddd'
          }
        },
        axisLabel: {
          interval: 0,
          margin: 85,
          textStyle: {
            color: '#fff',
            align: 'left',
            fontSize: 14
          },
          rich: {
            a: {
              color: '#fff',
              backgroundColor: '#f0515e',
              width: 15,
              height: 15,
              align: 'center',
              borderRadius: 2
            },
            b: {
              color: '#fff',
              backgroundColor: '#24a5cd',
              width: 15,
              height: 15,
              align: 'center',
              borderRadius: 2
            }
          },
          formatter: function (params) {
            if (parseInt(params.slice(0, 2)) < 3) {
              return [
                '{a|' + (parseInt(params.slice(0, 2)) + 1) + '}' + '  ' + params.slice(2)
              ].join('\n')
            } else {
              return [
                '{b|' + (parseInt(params.slice(0, 2)) + 1) + '}' + '  ' + params.slice(2)
              ].join('\n')
            }
          }
        },
        data: yData
      },

      series: [{
        name: '购票人数',
        type: 'map',
        aspectScale: 0.75,
        zoom: 1.2,
        mapType: 'china',
        roam: false,
        top: 80,
        left: 80,
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
        itemStyle: {
          normal: {
            borderWidth: .5, //区域边框宽度
            borderColor: '#009fe8', //区域边框颜色
            areaColor: "#ffffff", //区域颜色
          },
          emphasis: {
            borderWidth: .5,
            borderColor: '#4b0082',
            areaColor: "#ffdead",
          }
        },
        data: province_customer
      }, {
        name: 'barSer',
        type: 'bar',
        visualMap: false,
        zlevel: 2,
        barMaxWidth: 16,
        barGap: 0,
        roam: false,
        top: 150,
        left: 100,
        itemStyle: {
          normal: {
            color: function (params) {
              var colorList = [{
                  colorStops: [{
                    offset: 0,
                    color: '#f0515e'
                  }, {
                    offset: 1,
                    color: '#ef8554'
                  }]
                },
                {
                  colorStops: [{
                    offset: 0,
                    color: '#3c38e4'
                  }, {
                    offset: 1,
                    color: '#24a5cd'
                  }]
                }
              ];
              if (params.dataIndex < 3) {
                return colorList[0]
              } else {
                return colorList[1]
              }
            },
            barBorderRadius: [0, 15, 15, 0]
          }
        },
        label: {
          normal: {
            show: true,
            textBorderColor: '#333',
            textBorderWidth: 2
          }
        },
        data: barData.sort((a, b) => {
          return b.value - a.value;
        })
      }]
    };


    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    setTimeout(function () {
      myChart.resize();
    }, 500)
    window.addEventListener("resize", function () {
      myChart.resize();
    });
    myChart.on('click', function (params) { //点击事件
      if (params.componentType === 'series') {}
    })
  }

});