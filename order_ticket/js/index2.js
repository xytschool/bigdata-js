$(function () {
  var province_customer = []
  var buy_source = []
  var month = []
  var tickets_summary = []
  var last_year_month = []
  var hour_in_group = []
  var hour_out_group = []
  var group_type = []
  var day_group = []
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
  getPageDate()

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
        $("#customer_today").text(data.customer_today)
        $("#uphill").text(data.uphill)
        $("#downhill").text(data.downhill)
        $("#onhill").text(data.onhill)
        $("#todayTickets").text(data.customer_today)
        $("#ticket_amount").text(data.ticket_amount)
        province_customer = data.province_month_customer
        buy_source = data.by_source_month
        month = data.month_group
        tickets_summary = data.tickets_summary
        last_year_month = data.day_group
        group_type = data.group_type
        day_group = data.day_group
        ceshis();
        ceshis1()
        ceshi2()
        ceshis3()
      },
      error: function (jqXHR) {
        console.log("Error: " + jqXHR.status);
      }
    });

  }

  function ceshis() {
    var myChart = echarts.init(document.getElementById('chart4'));
    var option = null;
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
    option = {
      /*backgroundColor: '#00013a',*/
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
        text: '游客省份排行',
        subtext: '2021年 12月',
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
        right: 10,
        top: 80,
        bottom: 500,
        width: '200'
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
      // geo: {
      //     map: 'china',
      //     label: {
      //         show: true,
      //         color: '#ffffff',
      //         emphasis: {
      //             color: 'white',
      //             show: false
      //         }
      //     },
      //     roam: true,//是否允许缩放
      //     top: 10,
      //     left: 'left',
      //     right: '200',
      //     width:'66%',
      //     height:'90%',
      //     zoom: 1, //默认显示级别
      //     scaleLimit: {
      //         min: 0,
      //         max: 1
      //     }, //缩放级别
      //     itemStyle: {
      //         normal: {
      //             borderColor: 'rgba(26,82,231, 1)',
      //             borderWidth: 1,
      //             areaColor: {
      //                 type: 'radial',
      //                 x: 0.5,
      //                 y: 0.5,
      //                 r: 0.8,
      //                 colorStops: [{
      //                     offset: 0,
      //                     color: 'rgba(14, 101, 247, .1)' // 0% 处的颜色
      //                 }, {
      //                     offset: 1,
      //                     color: 'rgba(125, 183, 252, .1)' // 100% 处的颜色
      //                 }],
      //                 globalCoord: false // 缺省为 false
      //             },
      //             shadowColor: 'rgba(255, 255, 255, 0)',
      //             shadowOffsetX: -2,
      //             shadowOffsetY: 2,
      //             shadowBlur: 10
      //         },
      //         emphasis: {
      //             areaColor: 'rgba(249,157,51, .2)',
      //             borderWidth: 0
      //         }
      //     },
      //     tooltip: {
      //         show: false
      //     },
      //     data: province_customer
      // },
      series: [{
          name: '购票人数',
          type: 'map',
          aspectScale: 0.75,
          zoom: 1.2,
          mapType: 'china',
          roam: false,
          top: 80,
          left: 60,
          right: '200',
          width: '58%',
          height: '70%',
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
              borderColor: 'rgba(26,82,231, 1)',
              borderWidth: 1,
              areaColor: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(14, 101, 247, .1)' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: 'rgba(125, 183, 252, .1)' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              },
              shadowColor: 'rgba(255, 255, 255, 0)',
              shadowOffsetX: -2,
              shadowOffsetY: 2,
              shadowBlur: 10
            },
            emphasis: {
              areaColor: 'rgba(249,157,51, .2)',
              borderWidth: 0
            }
          },
          data: function () {
            return province_customer;
          }()
        },
        {
          name: 'barSer',
          type: 'bar',
          roam: false,
          visualMap: false,
          zlevel: 2,
          barMaxWidth: 16,
          barGap: 0,
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
        }
      ]
    };
    if (option && typeof option === "object") {
      myChart.setOption(option, true);
    }

    // 使用刚指定的配置项和数据显示图表。
    //myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }

  function ceshis1() {
    var myChart = echarts.init(document.getElementById('chart1'));

    var ydata = buy_source
    var color = ["#8d7fec", "#5085f2", "#e75fc3", "#f87be2", "#f2719a", "#fca4bb", "#f59a8f", "#fdb301", "#57e7ec", "#cf9ef1"]
    var xdata = ['同程', "售票口", "小程序", "美团"];
    console.log('bus', buy_source)
    option = {
      /*backgroundColor: "rgba(255,255,255,1)",*/
      color: color,
      legend: {
        orient: "vartical",
        x: "left",
        top: "center",
        left: "78%",
        bottom: "0%",
        data: xdata,
        itemWidth: 8,
        itemHeight: 8,
        textStyle: {
          color: '#fff'
        },
        formatter: function (name) {
          return '' + name
        }
      },
      series: [{
        type: 'pie',
        clockwise: false, //饼图的扇区是否是顺时针排布
        minAngle: 2, //最小的扇区角度（0 ~ 360）
        radius: ["20%", "60%"],
        center: ["40%", "45%"],
        avoidLabelOverlap: false,
        itemStyle: { //图形样式
          normal: {
            borderColor: '#ffffff',
            borderWidth: 1,
          },
        },
        label: {
          normal: {
            show: true,
            position: 'left',
            formatter: '{text|{b}}\n{c} ({d}%)',
            rich: {
              text: {
                color: "#fff",
                fontSize: 14,
                align: 'center',
                verticalAlign: 'middle',
                padding: 8
              },
              value: {
                color: "#8693F3",
                fontSize: 24,
                align: 'center',
                verticalAlign: 'middle',
              },
            }
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: 24,
            }
          }
        },
        data: ydata
      }]
    };
    myChart.setOption(option);
    // 使用刚指定的配置项和数据显示图表。
    /*myChart.setOption(option);*/
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }

  function ceshi2() {
    var myChart = echarts.init(document.getElementById('chart2'));
    var salvProName = [];
    var salvProValue = [];
    var maxVal = 0;

    for (var i = 0; i < tickets_summary.length; i++) {
      salvProName.push(tickets_summary[i].goods_name);
      salvProValue.push(tickets_summary[i].value);
      if (tickets_summary[i].value > maxVal) {
        maxVal = tickets_summary[i].value
      }
    }
    var salvProMax = []; //背景按最大值
    for (let i = 0; i < salvProValue.length; i++) {
      salvProMax.push(maxVal)
    }

    option = {
      grid: {
        left: '2%',
        right: '2%',
        bottom: '6%',
        top: '2%',
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'none'
        },
        formatter: function (params) {
          return params[0].name + ' : ' + params[0].value
        }
      },
      xAxis: {
        show: false,
        type: 'value'
      },
      yAxis: [{
        type: 'category',
        width: '10%',
        axisLabel: {
          show: true,
          textStyle: {
            color: '#fff'
          },
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        data: salvProName
      }, {
        type: 'category',
        axisTick: 'none',
        axisLine: 'none',
        show: true,
        axisLabel: {
          textStyle: {
            color: '#ffffff',
            fontSize: '12'
          },
        },
        data: salvProValue
      }],
      series: [{
          name: '值',
          type: 'bar',
          zlevel: 1,
          itemStyle: {
            normal: {
              barBorderRadius: 30,
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: 'rgb(57,89,255,1)'
              }, {
                offset: 1,
                color: 'rgb(46,200,207,1)'
              }]),
            },
          },
          barWidth: 10,
          data: salvProValue
        },
        {
          name: '背景',
          type: 'bar',
          barWidth: 10,
          barGap: '-100%',
          data: salvProMax,
          itemStyle: {
            normal: {
              color: 'rgba(24,31,68,1)',
              barBorderRadius: 30,
            }
          },
        },
      ]
    };

    myChart.setOption(option);
  }

  function ceshis3() {
    var myChart = echarts.init(document.getElementById('chart3'));
    let group_type_value = []
    for (var i = 0; i < group_type.length; i++) {
      group_type_value.push(group_type[i].value)
    }
    option = {
      xAxis: {
        type: 'category',
        data: ['个人', '团体', '电商'],
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: "#ffffff" //X轴文字颜色
          }
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: function (params) {
          var tar = params[0];
          return tar.name + ' : ' + tar.value;
        }
      },
      grid: [{
        top: '10%',
        width: '80%'
      }],
      yAxis: {
        show: false,
        type: 'value',
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: "#ffffff" //X轴文字颜色
          }
        },
      },
      "color": ["#00E4F0", "#44D16D", "#124E91", "#BDC414", "#C8CCA5", "#534EE1"],
      series: [{
          data: group_type_value,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgb(63,212,52)'
          },
          label: {
            show: true,
            position: 'top',
            valueAnimation: true,
            //color: 'rgb(102,236,12)'
          },
        },

      ]
    };

    myChart.setOption(option);
    myChart.currentIndex = -1;
  }


});