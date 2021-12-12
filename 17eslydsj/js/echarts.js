$(function () {

  var hour_group = []
  var day_group=[]
  $.ajax({
    type: "GET",
    url: "http://bigdata.xyt/api/getCustomerSummary",
    dataType: "json",
    success: function (data) {
      console.log(data);
      hour_group = data.hour_group
      day_group=data.day_group
      char()
      char_2()
    },
    error: function (jqXHR) {
      console.log("Error: " + jqXHR.status);
    }
  });

  function char() {
    for (var i = 0; i < hour_group.length; i++) {
      hour_group[i].name = hour_group[i].hour
    }
    var myChart = echarts.init(document.getElementById('container2'));
    option = {
      tooltip: {
        trigger: 'item',
      },
      color: ['#00c2ff', '#f9cf67', '#e92b77'],
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [{
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        emphasis: {
          label: {
            show: true,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        label: {
          color: '#fff',
        fontSize:"14",
          formatter: function (arg) {
            return arg.name + '时' + arg.value + '人数'

          },
        },
        data: hour_group
      }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
function char_2(){
  day_group_data = []
  for (var i = 0; i < day_group.length; i++) {
    day_group_data.push(day_group[i].value)
  }
  console.log(day_group_data);
  var myChart = echarts.init(document.getElementById('container3'));
  console.log(myChart);
  var option = {
    tooltip: {},
    "color": ["#00E4F0", "#44D16D", "#124E91", "#BDC414", "#C8CCA5", "#534EE1","#5ba3ed"],
    series: [{
      name: '销量',
      type: 'pie',
      radius: ['30%', '60%'],
      right: '20%',
      data: [{
          value: 124,
          name: '6日',
         
        },
        {
          value: 154,
          name: '7日',
        
        }, {
          value: 99,
          name: '8日',
        
        },
        {
          value: 57,
          name: '9日',
       
        }, {
          value: 197,
          name: '10日',
        
        },
        {
          value: 76,
          name: '11日',
          
        },
        {
          value: 136,
          name: '12日',
        
        },


      ]
    }]
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option)
  window.addEventListener('resize', function () {
    myChart.resize()
  })
}

});