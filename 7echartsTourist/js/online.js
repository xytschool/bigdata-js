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
  var province_customer = []
  var city_customer = []
  $.ajax({
    type: "GET",
    url:Vehicles,
    dataType: "json",
    success: function (data) {

      province_customer = data.province_customer
      city_customer = data.city_customer
      char1();
      char2()
    },
    error: function (jqXHR) {
      console.log("Error: " + jqXHR.status);
    }
  });

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
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ["城市1"],
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

});