
  var time=''
new Vue({
  el: '.header',
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

  var province_customer = []
  var buy_source = []
  var tickets_summary = []
  var last_year_month = []
  var hour_in_group = []
  var hour_out_group = []
  var group_type = []
  var day_group=[]
  console.log(time);
  $.ajax({
    type: "GET",
    url: Customer,
    dataType: "json",
    success: function (data) {
      $("#customer_today").text(data.customer_today)
      $("#uphill").text(data.uphill)
      $("#downhill").text(data.downhill)
      $("#onhill").text(data.onhill)
      $("#todayTickets").text(data.customer_today)
      $("#ticket_amount").text(data.ticket_amount)
      province_customer = data.province_customer
      buy_source = data.buy_source
      month = data.month_group
      tickets_summary = data.tickets_summary
      last_year_month = data.last_year_day_group
      group_type = data.group_type
      day_group = data.day_group_name
      ceshis1();
      ceshis2();
      ceshis3();
      ceshis5();
      ceshis6()
    },
    error: function (jqXHR) {
      console.log("Error: " + jqXHR.status);
    }
  });

  $.ajax({
    type: "GET",
    url: Vehicles,
    dataType: "json",
    success: function (data) {
      $("#in").text(data.customer_todinay)
      $("#total_seat").text(data.total_seat)
      $("#ticket_amount").text(data.ticket_amount)
      hour_in_group = data.hour_in_group
      hour_out_group = data.hour_out_group

      ceshis4();
    },
    error: function (jqXHR) {
      console.log("Error: " + jqXHR.status);
    }
  });

  $.ajax({
    type: "GET",
    url: "http://bigdata.xytschool.com/api/getWeather",
    dataType: "json",
    success: function (data) {
      $("#weather_text").text(data.weatherinfo.weather)
      var text=  data.weatherinfo.temp1 + '-' + data.weatherinfo.temp2
      $("#weather_value").text(text)
    },
    error: function (jqXHR) {
      console.log("Error: " + jqXHR.status);
    }
  });

  function ceshis1() {
    for (var i = 0; i < buy_source.length; i++) {
      buy_source[i].name = buy_source[i].buy_source
    }
    var myChart = echarts.init(document.getElementById('chart2'));
    option = {
      tooltip: {
        trigger: 'item',
      },
      label: {
        color: '#fff',
        show: true, // 显示文字
        formatter: function (arg) {
          console.log(arg)
          return arg.name + arg.value + '张\n' + arg.percent + '%'

        },
      },
      legend: {
        top: '5%',
        left: 'center',
        textStyle: {
          color: '#fff'
        },
      },
      series: [{
        type: 'pie',
        labelLine: {
          show: false
        },
        data: buy_source
      }]
    };
    myChart.setOption(option);

    // 使用刚指定的配置项和数据显示图表。
    /*myChart.setOption(option);*/
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }

  function ceshis2() {
    var myChart = echarts.init(document.getElementById('chart3'));
    let group_type_value = []
    for (var i = 0; i < group_type.length; i++) {
      group_type_value.push(group_type[i].value)
    }
    option = {
      xAxis: {
        type: 'category',
        data: ['团体', '个人', '电商'],
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: "#ffffff" //X轴文字颜色
          }
        },
      },
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: function (params) {
            var tar = params[0];
            return  tar.name + ' : ' + tar.value;
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

  function ceshis3() {
    day_group_data = day_group
    // for (var i = 0; i < day_group.length; i++) {
    //   day_group_data.push(day_group[i].value)
    // }
    console.log("day_group_data", day_group_data)
    var myChart = echarts.init(document.getElementById('chart4'));
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
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }

  function ceshis4() {
    var hour_in_group_data = []
    var hour_out_group_data = []

    var myChart = echarts.init(document.getElementById('chart5'));
    for (var i = 0; i < hour_in_group.length; i++) {
      hour_in_group_data.push(hour_in_group[i].value)
    }
    for (var i = 0; i < hour_out_group.length; i++) {
      hour_out_group_data.push(hour_out_group[i].value)
    }
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
        show: false,
        // data: ['进场数据', '离场数据']
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

  function ceshis5() {
    var province_customer_index = []
    var province_customer_value = []
    for (var i = 0; i < province_customer.length; i++) {
      province_customer_value.push(province_customer[i].value)
      province_customer_index.push(province_customer[i].province)
    }

    var worldMapContainer1 = document.getElementById('map');
    var myChart = echarts.init(worldMapContainer1);
    var option = {
      "color":       ["#DD6B66",  "#EEDD78", "#73A373", "#73B9BC", "#7289AB", "#91CA8C", "#F49F42"],
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
      grid: [{
        right: '4%',
        top: '35%',
        bottom: '10%',
        width: '30%'
      }],
      xAxis: {
        max: 'dataMax',
        type: 'value',
        show: false,
      },
      yAxis: {
        inverse: true,
        type: 'category',
        data: province_customer_index,
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: "#d9d2c9"
          }
        },
      },
      series: [{
          name: '购票人数',
          type: 'map',
          aspectScale: 0.75,
          zoom: 1.2,
          mapType: 'china',
          roam: false,
          left: "10%",
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
          data: function () {
            return province_customer;
          }()
        },
        {
          type: 'bar',
          zlevel: 1,
          realtimeSort: true,
          sort: true,
          data: province_customer_value,
          showBackground: true,
          backgroundStyle: {
            color: 'rgb(191,239,123)'
          },
          label: {
            show: true,
            position: 'right',
            valueAnimation: true,
            color: 'rgb(191,239,123)'
          }
        },
      ],
      animationDuration: 0,
      animationDurationUpdate: 3000,
      animationEasing: 'linear',
      animationEasingUpdate: 'linear'
    };

    myChart.setOption(option);

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    myChart.on('click', function (params) { //点击事件
      if (params.componentType === 'series') {}
    })
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }

  function ceshis6() {
    for (var i = 0; i < tickets_summary.length; i++) {
      tickets_summary[i].name = tickets_summary[i].goods_name
    }
    var myChart = echarts.init(document.getElementById('chart6'));
    option = {
      tooltip: {
        trigger: 'item'
      },
      series: [{
        name: 'Access From',
        type: 'pie',
        radius: '55%',
        data: tickets_summary,
        roseType: 'radius',
        label: {
          color: '#fff',
          show: true, // 显示文字
          formatter: function (arg) {
            return arg.name + arg.value + '张\n' + arg.percent + '%'

          },
        },
        labelLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)'
          },
          smooth: 0.2,
          length: 10,
          length2: 20
        },
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return Math.random() * 200;
        }
      }]
    };
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }
});
