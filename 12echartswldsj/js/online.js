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
  // var dom = document.getElementById("container2");
  // var myChart = echarts.init(dom);
  var hour_group=[]
  $.ajax({
    type: "GET",
    url: Customer,
    dataType: "json",
    success: function (data) {
      hour_group=data.hour_group
      console.log(hour_group);
      char_1()
    },
    error: function (jqXHR) {
      console.log("Error: " + jqXHR.status);
    }
  });
  function char_1(){
    day_group_data = []
    for (var i = 0; i < hour_group.length; i++) {
      day_group_data.push(hour_group[i].value)
    }

    var dom = echarts.init(document.getElementById('container2'));
    var XData = ["08", "09", "10", "11", "12", "13", "14", "15", "16","17", "18", "19", "20", "21","22"];
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
  
 

});
