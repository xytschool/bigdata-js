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
    methods:{
      datachange(value){
        console.log('time', value);
        startDate = value[0]
        endDate = value[1]
        getPageDate()
      }
    }
  })
  var province_customer = []
  var city_customer = []
  var province_customer_name = []

  function getPageDate(){
    $.ajax({
    type: "GET",
    url:Vehicles,
    dataType: "json",
    data: {start:startDate , end: endDate},
    success: function (data) {
      province_customer = data.province_customer
      province_customer_name = data.province_customer_name
      city_customer = data.city_customer
      char1();
      char2()
      map()
    },
    error: function (jqXHR) {
      console.log("Error: " + jqXHR.status);
    }
    });
  }

  getPageDate()

  function char1() {
    var myChart = echarts.init(document.getElementById('container2'));
    var city = []
    var value = []


    for (var i = 0; i < city_customer.length; i++) {
      city.push(city_customer[i].city)
      value.push(city_customer[i].value)

    }
    console.log(city);
    const seriesLabel = {
      show: true
    };
    option = {
      "color":       ["#DD6B66",  "#EEDD78", "#73A373", "#73B9BC", "#7289AB", "#91CA8C", "#F49F42"],
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
      },
      yAxis: {
        type: 'category',
        inverse: true,
        data: city,
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: "#fff" //X轴文字颜色
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

  function char2() {
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
      "color":       ["#DD6B66",  "#EEDD78", "#73A373", "#73B9BC", "#7289AB", "#91CA8C", "#F49F42"],
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
            color: "#a03030" //X轴文字颜色
          }
        },
      },
      series: [
          {
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

  function map(){
    console.log('map ....')
    var worldMapContainer1 = document.getElementById('distribution_map');
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
          '游客来源'
        ],
        textStyle: {
          color: '#ccc'
        }
      },
      series: [{
        name: '游客数量',
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
        data: province_customer_name
      }]
    };

    myChart.setOption(option);

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    myChart.on('click', function (params) { //点击事件
      if (params.componentType === 'series') {}
    })
  }

});
