

 var startDate = ""
 var endDate = ""

 new Vue({
   el: '.topHeder',
   data: function () {
     return {
       value1: ''
     }
   },
   methods:{
     datachange(value){
       console.log('time', value);
       startDate = value[0]
       endDate = value[1]
       getPageDate()
     }
   }
 })

// 折线图定制

  var sex_group = []
  var day_group = []
  var last_year_month = []
  var buy_source = []
  var group_type = []
  var tickets_summary = []
  var month = []
  var age_group = []
  var province_customer_name = []
  getPageDate()
  function getPageDate(){
    $.ajax({
      type: "GET",
      url: Customer,
      data: {start:startDate , end: endDate},
      dataType: "json",
      success: function (data) {
        console.log(data);
        sex_group = data.sex_group
        day_group = data.day_group
        last_year_month = data.day_group
        buy_source = data.buy_source
        group_type = data.group_type
        tickets_summary = data.tickets_summary
        month = data.month_group
        age_group = data.age_group
        province_customer_name = data.province_customer_name
        char_1()
        char_2()
        char_3()
        char_4()
        char_5()
        char_6()
        char_7()
      },
      error: function (jqXHR) {
        console.log("Error: " + jqXHR.status);
      }
    });
  }

  //游客性别分析
  function char_1() {
    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector("#Gender"));
    var man = 0
    var woman = 0
    for (var i = 0; i < sex_group.length; i++) {
      if (sex_group[i].sex == "M") {
        man = sex_group[i].value
      } else if (sex_group[i].sex == "F") {
        woman = sex_group[i].value
      }
    }
    console.log(woman);
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
        formatter: function (param) {
          return param.value
        },
        textStyle: {
          fontSize: 18,
          fontFamily: 'Arial',
          color: '#ffffff'
        }
      }
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
        top: '6px',
        icon: 'rect',
        // selectedMode: false, //取消图例上的点击事件
        textStyle: {
          color: '#ffffff'
        },
      },
      grid: {
        left: '30%',
        right: '30%',
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
              value: man,
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
              value: woman,
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
              symbol: symbols[1],
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
    window.addEventListener("resize", function () {
      myChart.resize();
    });

  }

  function char_2() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector(".line .chart"));
    day_group_data = []
    for (var i = 0; i < day_group.length; i++) {
      day_group_data.push(day_group[i].value)
    }


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
          "1-5人",
          "6-10人",
          "11-20人",
          "20人以上",
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
      series: [{
          name: "本期",
          type: "line",
          stack: "总量",
          // 是否让线条圆滑显示
          smooth: true,
          data: day_group_data
        },
        {
          name: "同期",
          type: "line",
          stack: "总量",
          smooth: true,
          data: last_year_month
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
  }

  function char_3() {
    let buy_source_name = []
    let buy_source_value = []

    for (var i = 0; i < province_customer_name.length; i++) {
      buy_source_value.push(province_customer_name[i].value)
      buy_source_name.push(province_customer_name[i].name)
    }
    console.log(buy_source, buy_source_name, buy_source_value);
    var myChart = echarts.init(document.querySelector(".pie .chart"));
    var salvProMax = [] //背景按最大值
    for (let i = 0; i < buy_source_value.length; i++) {
      salvProMax.push(buy_source_value[0])
    }
    option = {
      grid: {
        left: '2%',
        right: '2%',
        bottom: '-6%',
        top: '8%',
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
          inverse: true,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            }
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
          data: buy_source_name
        },
        {
          type: 'category',
          inverse: true,
          axisTick: 'none',
          axisLine: 'none',
          show: true,
          axisLabel: {
            textStyle: {
              color: '#ffffff',
              fontSize: '12'
            }
          },
          data: buy_source_value
        }
      ],
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
                },
                {
                  offset: 1,
                  color: 'rgb(46,200,207,1)'
                }
              ])
            }
          },
          barWidth: 10,
          data: buy_source_value
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
              barBorderRadius: 30
            }
          }
        }
      ]
    }

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }

  function char_4() {
    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector("#echarts_1"));
    console.log(group_type);
    let group_type_name = []
    for (var i = 0; i < group_type.length; i++) {
      if (group_type[i].type == "group") {
        group_type[i].name = "团队"
        group_type_name.push(group_type[i].name)
      } else if (group_type[i].type == "online") {
        group_type[i].name = "电商"
        group_type_name.push(group_type[i].name)

      } else if (group_type[i].type == "sigle") {
        group_type[i].name = "散客"
        group_type_name.push(group_type[i].name)
      }
    }
    console.log(group_type, group_type_name);

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
        data: group_type_name,
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
        data: group_type
      }, ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      // 让我们的图表调用 resize这个方法
      myChart.resize();
    });
  }

  function char_5() {
    var tickets_summary_name = []
    for (var i = 0; i < tickets_summary.length; i++) {
      tickets_summary_name.push(tickets_summary[i].goods_name)
      tickets_summary[i].name = tickets_summary[i].goods_name
    }
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector("#funnel_a"));
    console.log(myChart);
    option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}'
      },
      legend: {
        data: ["提前四天","提前三天","提前两天","提前一天","当天"],
        textStyle: {
          color: '#ffffff'
        },
      },
      calculable: true,
      series: [{
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
          {name:"提前四天",value:"10"},
          {name:"提前三天",value:"30"},
          {name:"提前两天",value:"50"},
          {name:"提前一天",value:"80"},
          {name:"当天",value:"100"},

        ]
      }]
    }
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }

  function char_6() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector(".line1 .chart"));
    var month_value = []
    for (var i = 0; i < month.length; i++) {
      month_value.push( parseInt(month[i].value/5 + month[i].value %96 ))
    }

    option = {
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        x: 40,
        y: 40,
        x2: 20,
        y2: 20
      },
      toolbox: {
        feature: {
          //saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLabel: {
          /*inside: true,*/
          interval: 0,
          textStyle: {
            color: '#fff',
            fontSize: 12
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          symbol: ['none', 'arrow'],
          symbolOffset: 12,
          lineStyle: {
            color: '#fff'
          }
        },
        data: [
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月'
        ]
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: true,
          symbol: ['none', 'arrow'],
          symbolOffset: 12,
          lineStyle: {
            color: '#fff'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: '#fff',
            fontSize: 12
          }
        }
      },
      series: [{
        type: 'line',
        data: month_value ,
        itemStyle: {
          normal: {
            color: '#0efdff', //折线点的颜色
            lineStyle: {
              color: '#0efdff', //折线的颜色
              width: 2
            }
          }
        }
      }]
    }

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }

  function char_7() {
    for (var i = 0; i < age_group.length; i++) {
      age_group[i].name = age_group[i].age
    }
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
        // formatter: "{a} <br/>{b} : {c} ({d}%)"
        formatter: function (params) {
          console.log(params);
          return params.name + ' 岁: ' + params.value + '人'
        }
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
      series: [{
        name: "点位统计",
        type: "pie",
        // 如果radius是百分比则必须加引号
        radius: ["10%", "70%"],
        center: ["50%", "42%"],
        roseType: "radius",
        data: age_group,
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
      }]
    };

    // 3. 配置项和数据给我们的实例化对象
    myChart.setOption(option);
    // 4. 当我们浏览器缩放的时候，图表也等比例缩放
    window.addEventListener("resize", function () {
      // 让我们的图表调用 resize这个方法
      myChart.resize();
    });
  }
