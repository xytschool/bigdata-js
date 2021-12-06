

// 折线图定制
(function () {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector(".line .chart"));

  // (1)准备数据
  var data = {
    year: [
      [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
      [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
    ]
  };

  // 2. 指定配置和数据
  var option = {
    color: ["#00f2f1", "#ed3f35"],
    tooltip: {
      // 通过坐标轴来触发
      trigger: "axis"
    },
    legend: {
      // 距离容器10%
      right: "10%",
      // 修饰图例文字的颜色
      textStyle: {
        color: "#4c9bfd"
      }
      // 如果series 里面设置了name，此时图例组件的data可以省略
      // data: ["邮件营销", "联盟广告"]
    },
    grid: {
      top: "20%",
      left: "3%",
      right: "4%",
      bottom: "3%",
      show: true,
      borderColor: "#012f4a",
      containLabel: true
    },

    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月"
      ],
      // 去除刻度
      axisTick: {
        show: false
      },
      // 修饰刻度标签的颜色
      axisLabel: {
        color: "rgba(255,255,255,.7)"
      },
      // 去除x坐标轴的颜色
      axisLine: {
        show: false
      }
    },
    yAxis: {
      type: "value",
      // 去除刻度
      axisTick: {
        show: false
      },
      // 修饰刻度标签的颜色
      axisLabel: {
        color: "rgba(255,255,255,.7)"
      },
      // 修改y轴分割线的颜色
      splitLine: {
        lineStyle: {
          color: "#012f4a"
        }
      }
    },
    series: [
      {
        name: "新增项目",
        type: "line",
        stack: "总量",
        // 是否让线条圆滑显示
        smooth: true,
        data: data.year[0]
      },
      {
        name: "新增技能",
        type: "line",
        stack: "总量",
        smooth: true,
        data: data.year[1]
      }
    ]
  };
  // 3. 把配置和数据给实例对象
  myChart.setOption(option);

  // 重新把配置好的新数据给实例对象
  myChart.setOption(option);
  window.addEventListener("resize", function () {
    myChart.resize();
  });
})();

// 饼形图定制
// 折线图定制
(function () {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector(".pie .chart"));

  option = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
      position: function (p) {
        //其中p为当前鼠标的位置
        return [p[0] + 10, p[1] - 10];
      }
    },
    legend: {
      top: "90%",
      itemWidth: 10,
      itemHeight: 10,
      data: ["0岁以下", "20-29岁", "30-39岁", "40-49岁", "50岁以上"],
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12"
      }
    },
    series: [
      {
        name: "年龄分布",
        type: "pie",
        center: ["50%", "42%"],
        radius: ["40%", "60%"],
        color: [
          "#065aab",
          "#066eab",
          "#0682ab",
          "#0696ab",
          "#06a0ab",
          "#06b4ab",
          "#06c8ab",
          "#06dcab",
          "#06f0ab"
        ],
        label: { show: false },
        labelLine: { show: false },
        data: [
          { value: 1, name: "0岁以下" },
          { value: 4, name: "20-29岁" },
          { value: 2, name: "30-39岁" },
          { value: 2, name: "40-49岁" },
          { value: 1, name: "50岁以上" }
        ]
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  window.addEventListener("resize", function () {
    myChart.resize();
  });
})();
// 学习进度柱状图模块
(function () {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector("#funnel_a"));
  console.log(myChart);
  option = {
   
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c}%'
    },

    legend: {
      data: ['展现', '点击', '访问', '咨询', '订单'],
      textStyle: {
        color: '#ffffff'
    },
    },
    calculable: true,
    series: [
      {
        name: '金字塔',
        type: 'funnel',
        x: '50%',
        sort: 'ascending',
        itemStyle: {
          normal: {
            // color: 各异,
            label: {
              position: 'left'
            }
          }
        },
        data: [
          { value: 60, name: '访问' },
          { value: 40, name: '咨询' },
          { value: 20, name: '订单' },
          { value: 80, name: '点击' },
          { value: 100, name: '展现' }
        ]
      }
    ]
  }
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  window.addEventListener("resize", function () {
    myChart.resize();
  });
})();
// 折线图 优秀作品
(function () {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector(".line1 .chart"));

  option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        lineStyle: {
          color: "#dddc6b"
        }
      }
    },
    legend: {
      top: "0%",
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12"
      }
    },
    grid: {
      left: "10",
      top: "30",
      right: "10",
      bottom: "10",
      containLabel: true
    },

    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 12
          }
        },
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.2)"
          }
        },

        data: [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30"
        ]
      },
      {
        axisPointer: { show: false },
        axisLine: { show: false },
        position: "bottom",
        offset: 20
      }
    ],

    yAxis: [
      {
        type: "value",
        axisTick: { show: false },
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        },
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: 12
          }
        },

        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        }
      }
    ],
    series: [
      {
        name: "流入",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          normal: {
            color: "#0184d5",
            width: 2
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(1, 132, 213, 0.4)"
                },
                {
                  offset: 0.8,
                  color: "rgba(1, 132, 213, 0.1)"
                }
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)"
          }
        },
        itemStyle: {
          normal: {
            color: "#0184d5",
            borderColor: "rgba(221, 220, 107, .1)",
            borderWidth: 12
          }
        },
        data: [
          30,
          40,
          30,
          40,
          30,
          40,
          30,
          60,
          20,
          40,
          20,
          40,
          30,
          40,
          30,
          40,
          30,
          40,
          30,
          60,
          20,
          40,
          20,
          40,
          30,
          60,
          20,
          40,
          20,
          40
        ]
      },
      {
        name: "流出",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
          normal: {
            color: "#00d887",
            width: 2
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(0, 216, 135, 0.4)"
                },
                {
                  offset: 0.8,
                  color: "rgba(0, 216, 135, 0.1)"
                }
              ],
              false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)"
          }
        },
        itemStyle: {
          normal: {
            color: "#00d887",
            borderColor: "rgba(221, 220, 107, .1)",
            borderWidth: 12
          }
        },
        data: [
          50,
          30,
          50,
          60,
          10,
          50,
          30,
          50,
          60,
          40,
          60,
          40,
          80,
          30,
          50,
          60,
          10,
          50,
          30,
          70,
          20,
          50,
          10,
          40,
          50,
          30,
          70,
          20,
          50,
          10,
          40
        ]
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  window.addEventListener("resize", function () {
    myChart.resize();
  });
})();

// 点位分布统计模块
(function () {
  // 1. 实例化对象
  var myChart = echarts.init(document.querySelector(".pie1  .chart"));
  // 2. 指定配置项和数据
  var option = {
    legend: {
      top: "90%",
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: "12"
      }
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    // 注意颜色写的位置
    color: [
      "#006cff",
      "#60cda0",
      "#ed8884",
      "#ff9f7f",
      "#0096ff",
      "#9fe6b8",
      "#32c5e9",
      "#1d9dff"
    ],
    series: [
      {
        name: "点位统计",
        type: "pie",
        // 如果radius是百分比则必须加引号
        radius: ["10%", "70%"],
        center: ["50%", "42%"],
        roseType: "radius",
        data: [
          { value: 20, name: "西安" },
          { value: 26, name: "北京" },
          { value: 24, name: "上海" },
          { value: 25, name: "其他" },
          { value: 20, name: "武汉" },
          { value: 25, name: "杭州" },
          { value: 30, name: "深圳" },
          { value: 42, name: "广州" }
        ],
        // 修饰饼形图文字相关的样式 label对象
        label: {
          fontSize: 10
        },
        // 修饰引导线样式
        labelLine: {
          // 连接到图形的线长度
          length: 10,
          // 连接到文字的线长度
          length2: 10
        }
      }
    ]
  };

  // 3. 配置项和数据给我们的实例化对象
  myChart.setOption(option);
  // 4. 当我们浏览器缩放的时候，图表也等比例缩放
  window.addEventListener("resize", function () {
    // 让我们的图表调用 resize这个方法
    myChart.resize();
  });
})();
//游客类型占比
(function(){
 // 1. 实例化对象
 var myChart =  echarts.init(document.querySelector("#echarts_1"));
 console.log(myChart);
 var data = [
  {value: 12,name: '行业一'},
  {value: 13,name: '行业二'},
  {value: 70,name: '行业三'},
  {value: 52,name: '行业四'},
  {value: 35,name: '行业五'}
];
option = {
  backgroundColor: 'rgba(0,0,0,0)',
  tooltip: {
      trigger: 'item',
      formatter: "{b}: <br/>{c} ({d}%)"
  },
  color: ['#af89d6', '#4ac7f5', '#0089ff', '#f36f8a', '#f5c847'],
  legend: { //图例组件，颜色和名字
      x: '70%',
      y: 'center',
      orient: 'vertical',
      itemGap: 12, //图例每项之间的间隔
      itemWidth: 10,
      itemHeight: 10,
      icon: 'rect',
      data: ['行业一', '行业二', '行业三', '行业四', '行业五'],
      textStyle: {
          color: [],
          fontStyle: 'normal',
          fontFamily: '微软雅黑',
          fontSize: 12,
      }
  },
  series: [{
      name: '行业占比',
      type: 'pie',
      clockwise: false, //饼图的扇区是否是顺时针排布
      minAngle: 20, //最小的扇区角度（0 ~ 360）
      center: ['35%', '50%'], //饼图的中心（圆心）坐标
      radius: [50, 75], //饼图的半径
      avoidLabelOverlap: true, ////是否启用防止标签重叠
      itemStyle: { //图形样式
          normal: {
              borderColor: '#1e2239',
              borderWidth: 2,
          },
      },
      label: { //标签的位置
          normal: {
              show: true,
              position: 'inside', //标签的位置
              formatter: "{d}%",
              textStyle: {
                  color: '#fff',
              }
          },
          emphasis: {
              show: true,
              textStyle: {
                  fontWeight: 'bold'
              }
          }
      },
      data: data
  }, {
      name: '',
      type: 'pie',
      clockwise: false,
      silent: true,
      minAngle: 20, //最小的扇区角度（0 ~ 360）
      center: ['35%', '50%'], //饼图的中心（圆心）坐标
      radius: [0, 40], //饼图的半径
      itemStyle: { //图形样式
          normal: {
              borderColor: '#1e2239',
              borderWidth: 1.5,
              opacity: 0.21,
          }
      },
      label: { //标签的位置
          normal: {
              show: false,
          }
      },
      data: data
  }]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
window.addEventListener("resize", function () {
  // 让我们的图表调用 resize这个方法
  myChart.resize();
});
})();
//游客性别分析
(function(){
  // 1. 实例化对象
  var myChart =  echarts.init(document.querySelector("#Gender"));

  var symbols = [
      'path://M18.2629891,11.7131596 L6.8091608,11.7131596 C1.6685112,11.7131596 0,13.032145 0,18.6237673 L0,34.9928467 C0,38.1719847 4.28388932,38.1719847 4.28388932,34.9928467 L4.65591984,20.0216948 L5.74941883,20.0216948 L5.74941883,61.000787 C5.74941883,65.2508314 11.5891201,65.1268798 11.5891201,61.000787 L11.9611506,37.2137775 L13.1110872,37.2137775 L13.4831177,61.000787 C13.4831177,65.1268798 19.3114787,65.2508314 19.3114787,61.000787 L19.3114787,20.0216948 L20.4162301,20.0216948 L20.7882606,34.9928467 C20.7882606,38.1719847 25.0721499,38.1719847 25.0721499,34.9928467 L25.0721499,18.6237673 C25.0721499,13.032145 23.4038145,11.7131596 18.2629891,11.7131596 M12.5361629,1.11022302e-13 C15.4784742,1.11022302e-13 17.8684539,2.38997966 17.8684539,5.33237894 C17.8684539,8.27469031 15.4784742,10.66467 12.5361629,10.66467 C9.59376358,10.66467 7.20378392,8.27469031 7.20378392,5.33237894 C7.20378392,2.38997966 9.59376358,1.11022302e-13 12.5361629,1.11022302e-13',
      'path://M28.9624207,31.5315864 L24.4142575,16.4793596 C23.5227152,13.8063773 20.8817445,11.7111088 17.0107398,11.7111088 L12.112691,11.7111088 C8.24168636,11.7111088 5.60080331,13.8064652 4.70917331,16.4793596 L0.149791395,31.5315864 C-0.786976655,34.7595013 2.9373074,35.9147532 3.9192135,32.890727 L8.72689855,19.1296485 L9.2799493,19.1296485 C9.2799493,19.1296485 2.95992025,43.7750224 2.70031069,44.6924335 C2.56498417,45.1567684 2.74553639,45.4852068 3.24205501,45.4852068 L8.704461,45.4852068 L8.704461,61.6700801 C8.704461,64.9659872 13.625035,64.9659872 13.625035,61.6700801 L13.625035,45.360657 L15.5097899,45.360657 L15.4984835,61.6700801 C15.4984835,64.9659872 20.4191451,64.9659872 20.4191451,61.6700801 L20.4191451,45.4852068 L25.8814635,45.4852068 C26.3667633,45.4852068 26.5586219,45.1567684 26.4345142,44.6924335 C26.1636859,43.7750224 19.8436568,19.1296485 19.8436568,19.1296485 L20.3966199,19.1296485 L25.2043926,32.890727 C26.1862111,35.9147532 29.9105828,34.7595013 28.9625083,31.5315864 L28.9624207,31.5315864 Z M14.5617154,0 C17.4960397,0 19.8773132,2.3898427 19.8773132,5.33453001 C19.8773132,8.27930527 17.4960397,10.66906 14.5617154,10.66906 C11.6274788,10.66906 9.24611767,8.27930527 9.24611767,5.33453001 C9.24611767,2.3898427 11.6274788,0 14.5617154,0 L14.5617154,0 Z',
      'path://M512 292.205897c80.855572 0 146.358821-65.503248 146.358821-146.358821C658.358821 65.503248 592.855572 0 512 0 431.144428 0 365.641179 65.503248 365.641179 146.358821 365.641179 227.214393 431.144428 292.205897 512 292.205897zM512 731.282359c-80.855572 0-146.358821 65.503248-146.358821 146.358821 0 80.855572 65.503248 146.358821 146.358821 146.358821 80.855572 0 146.358821-65.503248 146.358821-146.358821C658.358821 796.273863 592.855572 731.282359 512 731.282359z'
  ];
  var bodyMax = 100; //指定图形界限的值
  var labelSetting = {
      normal: {
          show: true,
          position: 'bottom',
          offset: [0, 10],
          formatter: function(param) {
              return (param.value / bodyMax * 100).toFixed(0) + '%';
          },
          textStyle: {
              fontSize: 18,
              fontFamily: 'Arial',
              color: '#ffffff'
          }
      }
  };
  var markLineSetting = { //设置标线
      symbol: 'none',
      lineStyle: {
          normal: {
              opacity: 0.3
          }
      },
      data: [{
          type: 'max',
          label: {
              normal: {
                  formatter: 'max: {c}'
              }
          }
      }, {
          type: 'min',
          label: {
              normal: {
                  formatter: 'min: {c}'
              }
          }
      }]
  };

  option = {
      tooltip: {
          show: false, //鼠标放上去显示悬浮数据
      },
      legend: {
          data: ['男性', '女性'],
          selectedMode: 'single',
          itemWidth: 10, //图例的宽度
          itemHeight: 10, //图例的高度
          itemGap: 30,
          orient: 'horizontal',
          left: 'center',
          top: '20px',
          icon: 'rect',
          // selectedMode: false, //取消图例上的点击事件
          textStyle: {
              color: '#ffffff'
          },
      },
      grid: {
          // left: '20%',
          // right: '20%',
          top: '20%',
          bottom: '20%',
          containLabel: true
      },
      xAxis: {
          data: ['a', 'x', 'b'],
          axisTick: {
              show: false
          },
          axisLine: {
              show: false
          },
          axisLabel: {
              show: false
          }
      },
      yAxis: {
          max: bodyMax,
          splitLine: {
              show: false
          },
          axisTick: {
              // 刻度线
              show: false
          },
          axisLine: {
              // 轴线
              show: false
          },
          axisLabel: {
              // 轴坐标文字
              show: false
          }
      },
      series: [{
          name: '男性',
          type: 'pictorialBar',
          symbolClip: true,
          symbolBoundingData: bodyMax,
          label: labelSetting,
          data: [{
              value: 35,
              symbol: symbols[0],
              itemStyle: {
                  normal: {
                      color: 'rgba(105,204,230)' //单独控制颜色
                  }
              },
          },
              {

              },
              {
                  value: 65,
                  symbol: symbols[1],
                  itemStyle: {
                      normal: {
                          color: 'rgba(255,130,130)' //单独控制颜色
                      }
                  },
              }
          ],
          // markLine: markLineSetting,
          z: 10
      },
          {
              name: '女性',
              type: 'pictorialBar',
              symbolClip: true,
              symbolBoundingData: bodyMax,
              label: labelSetting,
              data: [{
                  value: 70,
                  symbol: symbols[0]
              },
                  {},
                  {
                      value: 30,
                      symbol: symbols[1]
                  }
              ],
              // markLine: markLineSetting,
              z: 10
          },
          {
              // 设置背景底色，不同的情况用这个
              name: 'full',
              type: 'pictorialBar', //异型柱状图 图片、SVG PathData
              symbolBoundingData: bodyMax,
              animationDuration: 0,
              itemStyle: {
                  normal: {
                      color: '#ccc' //设置全部颜色，统一设置
                  }
              },
              z: 10,
              data: [{
                  itemStyle: {
                      normal: {
                          color: 'rgba(105,204,230,0.40)' //单独控制颜色
                      }
                  },
                  value: 100,
                  symbol: symbols[0]
              },
                  {
                      // 设置中间冒号
                      itemStyle: {
                          normal: {
                              color: '#1DA1F2' //单独控制颜色
                          }
                      },
                      value: 100,
                      symbol: symbols[2],
                      symbolSize: [8, '18%'],
                      symbolOffset: [0, '-200%']
                  },
                  {
                      itemStyle: {
                          normal: {
                              color: 'rgba(255,130,130,0.40)' //单独控制颜色
                          }
                      },
                      value: 100,
                      symbol: symbols[1]
                  }
              ]
          }
      ]
  }

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  window.addEventListener("resize",function(){
      myChart.resize();
  });
 })();
