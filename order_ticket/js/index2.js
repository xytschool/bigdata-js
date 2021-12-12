$(function () {
    var province_customer = []
    var buy_source = []
    var month = []
    var tickets_summary = []
    var last_year_month = []
    var hour_in_group = []
    var hour_out_group = []
    var group_type = []
    var day_group=[]
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
            province_customer = data.province_month_customer
            buy_source = data.buy_source_name
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

    function ceshis() {
        var myChart = echarts.init(document.getElementById('chart4'));

        var namedata = [{name:'张'},{name:'刘'},{name:'李'},{name:'邓'},{name:'熊'},{name:'田'},{name:'周'},{name:'赵'},{name:'钱'},{name:'孙'},
            {name:'吴'},{name:'郑'},{name:'王'},{name:'冯'},{name:'陈'},{name:'杨'},{name:'朱'},{name:'秦'},{name:'许'},{name:'徐'},
            {name:'何'},{name:'曹'},{name:'陶'},{name:'邹'},{name:'苏'},{name:'范'},{name:'彭'},{name:'鲁'},{name:'马'},{name:'方'},
            {name:'唐'},{name:'顾'}];
        var option = null;
        var geoCoordMap = {
            '上海': [119.1803, 31.2891],
            "福建": [119.4543, 25.9222],
            "重庆": [108.384366, 30.439702],
            '北京': [116.4551, 40.2539],
            "辽宁": [123.1238, 42.1216],
            "河北": [114.4995, 38.1006],
            "天津": [117.4219, 39.4189],
            "山西": [112.3352, 37.9413],
            "陕西": [109.1162, 34.2004],
            "甘肃": [103.5901, 36.3043],
            "宁夏": [106.3586, 38.1775],
            "青海": [101.4038, 36.8207],
            "新疆": [87.9236, 43.5883],
            "西藏": [91.11, 29.97],
            "四川": [103.9526, 30.7617],
            "吉林": [125.8154, 44.2584],
            "山东": [117.1582, 36.8701],
            "河南": [113.4668, 34.6234],
            "江苏": [118.8062, 31.9208],
            "安徽": [117.29, 32.0581],
            "湖北": [114.3896, 30.6628],
            "浙江": [119.5313, 29.8773],
            '内蒙古': [110.3467, 41.4899],
            "江西": [116.0046, 28.6633],
            "湖南": [113.0823, 28.2568],
            "贵州": [106.6992, 26.7682],
            "云南": [102.9199, 25.4663],
            "广东": [113.12244, 23.009505],
            "广西": [108.479, 23.1152],
            "海南": [110.3893, 19.8516],
            '黑龙江': [127.9688, 45.368],
            '台湾': [121.4648, 25.5630]
        };
       //var chinaDatas = [{name: '北京',value: 86}, {name: '福建', value: 65}, {name: '广东', value: 53}, {name: '上海', value: 48}];

        var chinaDatas = province_customer;
        var convertData = function(data, type) {
            /*type:1 地图参数；type:2数据参数*/
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    if (type == 2) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value),
                            username: data[i].username,
                            telphone: data[i].telphone,
                            address: data[i].address
                        });
                    } else {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        });
                    }
                }
            }
            //console.log(res);
            return res;
        };
        var yData = [];
        var barData = chinaDatas;
        barData = barData.sort(function(a,b){
            return b.value-a.value;
        });
        for(var j =0;j<barData.length;j++){
            if(j<10){
                yData.push('0'+j + barData[j].name);
            }else{
                yData.push(j + barData[j].name);
            }
        }

        option = {
            /*backgroundColor: '#00013a',*/
            title: [{
                show: true,
                text: '游客省份排行',
                subtext: '2021年 12月',
                subtextStyle:{
                    color:'#ffffff',
                    lineHeight:20
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
                    formatter: function(params) {
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
            geo: {
                map: 'china',
                label: {
                    show: true,
                    color: '#ffffff',
                    emphasis: {
                        color: 'white',
                        show: false
                    }
                },
                roam: true,//是否允许缩放
                top: 10,
                left: 'left',
                right: '200',
                width:'66%',
                height:'90%',
                zoom: 1, //默认显示级别
                scaleLimit: {
                    min: 0,
                    max: 1
                }, //缩放级别
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
                //是否显示南海诸岛
                /*regions: [{
                    name: "南海诸岛",
                    value: 0,
                    itemStyle: {
                        normal: {
                            opacity: 0,
                            label: {
                                show: false
                            }
                        }
                    }
                }],*/
                tooltip: {
                    show: false
                }
            },
            series: [
                {
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    z: 1,
                    data: [],
                    symbolSize: 14,
                    label: {
                        normal: {
                            show: true,
                            formatter: function(params) {
                                return '{fline|客户：'+params.data.username+'  '+params.data.telphone+'}\n{tline|'+params.data.address+'}';
                            },
                            position: 'top',
                            backgroundColor: 'rgba(254,174,33,.8)',
                            padding: [0, 0],
                            borderRadius: 3,
                            lineHeight: 32,
                            color: '#f7fafb',
                            rich:{
                                fline:{
                                    padding: [0, 10, 10, 10],
                                    color:'#ffffff'
                                },
                                tline:{
                                    padding: [10, 10, 0, 10],
                                    color:'#ffffff'
                                }
                            }
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        color: '#feae21',
                    }
                },
                {
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    z: 1,
                    data: [],
                    symbolSize: 14,
                    label: {
                        normal: {
                            show: true,
                            formatter: function(params) {
                                return '{fline|客户：'+params.data.username+'  '+params.data.telphone+'}\n{tline|'+params.data.address+'}';
                            },
                            position: 'top',
                            backgroundColor: 'rgba(233,63,66,.9)',
                            padding: [0, 0],
                            borderRadius: 3,
                            lineHeight: 32,
                            color: '#ffffff',
                            rich:{
                                fline:{
                                    padding: [0, 10, 10, 10],
                                    color:'#ffffff'
                                },
                                tline:{
                                    padding: [10, 10, 0, 10],
                                    color:'#ffffff'
                                }
                            }
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        color: '#e93f42',
                    }
                },
                {
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    z: 1,
                    data: [],
                    symbolSize: 14,
                    label: {
                        normal: {
                            show: true,
                            formatter: function(params) {
                                return '{fline|客户：'+params.data.username+'  '+params.data.telphone+'}\n{tline|'+params.data.address+'}';
                            },
                            position: 'top',
                            backgroundColor: 'rgba(8,186,236,.9)',
                            padding: [0, 0],
                            borderRadius: 3,
                            lineHeight: 32,
                            color: '#ffffff',
                            rich:{
                                fline:{
                                    padding: [0, 10, 10, 10],
                                    color:'#ffffff'
                                },
                                tline:{
                                    padding: [10, 10, 0, 10],
                                    color:'#ffffff'
                                }
                            }
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        color: '#08baec',
                    }
                },
                //地图
                {
                    type: 'map',
                    mapType: 'china',
                    geoIndex: 0,
                    z: 0,
                    data: convertData(chinaDatas, 1)
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
                            color: function(params) {
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
                            barBorderRadius: [0,15,15,0]
                        }
                    },
                    label:{
                        normal: {
                            show: true,
                            textBorderColor: '#333',
                            textBorderWidth: 2
                        }
                    },
                    data: barData.sort((a,b)=>{
                        return b.value-a.value;
                    })
                }]
        };
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
        function getTel(){
            var n = 2,telstr = '1';
            while(n<12){
                if(n<3){
                    while(1){
                        var nums = Math.floor(Math.random()*10);
                        if(nums!==0&&nums!==1&&nums!==2&&nums!==3&&nums!==4&&nums!==6){
                            telstr+=nums;
                            break;
                        }
                    }

                }else if(n>3&&n<8){
                    telstr+='*';
                }else{
                    telstr+=Math.floor(Math.random()*10);
                }
                n++;
            }
            return telstr;
        }
        function getName(type){
            var name = '';
            var roundnum = Math.floor(Math.random()*32);
            switch (type) {
                case 1:
                    name = namedata[roundnum].name+'先生';
                    break;
                case 2:
                    name = namedata[roundnum].name+'女士';
                    break;
                default:
                    name = namedata[roundnum].name+'先生';
                    break;
            }
            return name;
        }
        function getAddress(num,type){
            var addstr = '';
            switch (type) {
                case 1:
                    addstr = '在'+chinaDatas[num].name+'-保时捷4S店购买车辆';
                    break;
                case 2:
                    addstr = '在'+chinaDatas[num].name+'-奔驰4S店购买车辆';
                    break;
                default:
                    addstr = '在'+chinaDatas[num].name+'-法拉利4S店购买车辆';
                    break;
            }
            return addstr;
        }
        var timer = setInterval(()=>{

            //数据情况重绘，清除formatter移动效果，也可根据自身需求是否需要，删除这两行代码
            /*option.series[seriesjson[runidx].createType-1].data = [];
            myChart.setOption(option, true);*/
            var runidx = Math.floor(Math.random()*3);
            var typeidx = Math.floor(Math.random()*3);
            var dataidx = Math.floor(Math.random()*32);
            var ranval = Math.floor(Math.random()*10);
            chinaDatas[dataidx].value = chinaDatas[dataidx].value+ranval;
            var valarr = geoCoordMap[chinaDatas[dataidx].name];
            valarr.push(ranval);
            option.series[typeidx].data = [{
                name:'',
                username: getName(runidx),
                telphone: getTel(),
                address: getAddress(dataidx,typeidx),
                value: valarr
            }];
            option.series[4].data = option.series[4].data.sort(function(a,b){
                return b.value-a.value;
            });
            myChart.setOption(option, true);
        },3000);
        // 使用刚指定的配置项和数据显示图表。
        //myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }

    function ceshis1() {
      var myChart = echarts.init(document.getElementById('chart1'));

      var ydata = buy_source
      var color = ["#8d7fec", "#5085f2", "#e75fc3", "#f87be2", "#f2719a", "#fca4bb", "#f59a8f", "#fdb301", "#57e7ec", "#cf9ef1"]
      var xdata = ['同程', "售票口", "小程序", "美团"];
      console.log('bus' ,buy_source)
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
              formatter: function(name) {
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
      window.addEventListener("resize",function(){
          myChart.resize();
      });
    }

    function ceshi2(){
      var myChart = echarts.init(document.getElementById('chart2'));
      var salvProName =[];
      var salvProValue =[];
      var maxVal = 0;

      for(var i=0; i< tickets_summary.length ;i++){
        salvProName.push(tickets_summary[i].goods_name);
        salvProValue.push(tickets_summary[i].value);
        if(tickets_summary[i].value > maxVal) {
            maxVal = tickets_summary[i].value
        }
      }
      var salvProMax =[];//背景按最大值
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
              formatter: function(params) {
                  return params[0].name  + ' : ' + params[0].value
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
              inverse: true,
              axisTick: 'none',
              axisLine: 'none',
              show: true,
              axisLabel: {
                  textStyle: {
                      color: '#ffffff',
                      fontSize: '12'
                  },
              },
              data:salvProValue
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


});
