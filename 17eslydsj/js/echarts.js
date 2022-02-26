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

  var hour_group = []
  var day_group=[]
  $.ajax({
    type: "GET",
    url: Customer,
    dataType: "json",
    success: function (data) {
      console.log(data);
      hour_group = data.hour_group
      day_group=data.day_group_name
      char()
      char_2()
    },
    error: function (jqXHR) {
      console.log("Error: " + jqXHR.status);
    }
  });

  $.ajax({
    type: "GET",
    url: videoDevicesUrl,
    dataType: "json",
    success: function (data) {
      console.log(data);
      var videos = data.data
      document.getElementById('video_1').src = videos[0].addr;
      document.getElementById('video_1').play();
      document.getElementById('video_2').src = videos[1].addr;
      document.getElementById('video_2').play()
      document.getElementById('video_3').src = videos[2].addr;
      document.getElementById('video_3').play()
      document.getElementById('video_4').src = videos[3].addr;
      document.getElementById('video_4').play()
    },
    error: function (jqXHR) {
      console.log("Error: " + jqXHR.status);
    }
  });

  $.ajax({
    type: "GET",
    url: eventsUrl,
    dataType: "json",
    success: function (data) {
      console.log(data);
      var events = data.data
      events.forEach(function (event){
        $('#event_wrap').innerHTML = ''
        $('#event_wrap').append(
            " <li>\n" +
            "<p class=\"text_l\">一切正常</p>\n" +
            "<p class=\"text_r\">景管部 " + event.staff +
            "  " + event.position +
            "   " + event.time +
            "</p>\n" +
            "</li>"
        )
      })
    },
    error: function (jqXHR) {
      console.log("Error: " + jqXHR.status);
    }
  });

  $.ajax({
    type: "GET",
    url: getMapDataUrl,
    dataType: "json",
    success: function (data) {
      console.log('$(\'#getMapDataId\').innerHTML', $('#getMapDataId').innerHTML)
      $('#getMapDataId').empty()
      console.log(data);
      var events = data.data
      events.forEach(function (event){
        $('#getMapDataId').append(
            " <tr style=\"margin-bottom: 15px\">\n" +
            "                <th style=\"width: 80px\">" + event.position + "</th>\n" +
            "                <th style=\"width: 30px;text-align: right\">"+ event.num +"人</th>\n" +
            "                <th style=\"width: 90px;text-align: right\"><img src=\"img/btn-long-green.png\"></th>\n" +
            "              </tr>"
        )
      })
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
      // tooltip: {
      //   trigger: 'item',
      // },
      color: ['#00c2ff', '#f9cf67', '#e92b77'],
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [{
        name: '游客人数变化',
        type: 'pie',
        radius: ['25%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 20,
          borderColor: '#fff',
          borderWidth: 2
        },
        // emphasis: {
        //   label: {
        //     show: true,
        //     fontWeight: 'bold',
        //     formatter: function (arg) {
        //       return arg.name + '点'
        //     },
        //   }
        // },
        // labelLine: {
        //   show: false
        // },
        label: {
          color: '#fff',
          fontSize:"14",
          formatter: function (arg) {
            return arg.name + '点' + arg.value + '人'
          },
        },
        data: hour_group
      }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
function char_2(){

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
      data: day_group.reverse().slice(0,7),
      label: {
        color: '#fff',
        fontSize:"14",
        formatter: function (arg) {
          return arg.name + '日' + arg.value + '人'
        },
      },
    }]
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option)
  window.addEventListener('resize', function () {
    myChart.resize()
  })
}

});

$(function(){
  getHt();
  //initMap();
})
//获取div的高度
function getHt(){
  var all_height=$(window).height();
  var div_height=840;
  $("#car_control").css("height",div_height+"px");
}
