$(function() {
  var dom = echarts.init(document.getElementById('container3'));

  var colorList = [
    '#ff2600',
    '#ffc000',
    '#00ad4e',
    '#0073c2',
    '#165868',
    '#e76f00',
    '#316194',
    '#723761',
    '#00b2f1',
    '#4d6022',
    '#4b83bf',
    '#f9c813',
    '#0176c0'
];
var xData = ['公共服务','健康保障','安全生产','价格监督','能源安全','信用体系', '城乡建设', '社区治理', '生态环保','应急维稳'];
var yData = [2912,3991,4621,3941,3313,6631,5543,4463,6541,3381];
option = {
    color:colorList,
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
    toolbox: {
        show : true,
        feature : {
            mark : {
                show: true
            },

        }
    },
    grid: {
       "borderWidth": 0,
			"top": '40',
			"left": '30',
			"right": '10',
			"bottom": '40',
			textStyle: {
				color: "#fff"
			}
    },
    xAxis : [
       {
			'type': 'category',
			"axisTick": {
				"show": false
			},
			"axisLine": {
				"show": false,
				lineStyle: {
					color: '#868c96'
				}
			},
			"axisLabel": {
				"interval": 0,
				fontSize:14,
				formatter:function(value)
				{
					var ret = "";//拼接加\n返回的类目项
					var maxLength = 2;//每项显示文字个数
					var valLength = value.length;//X轴类目项的文字个数
					var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
					if (rowN > 1)//如果类目项的文字大于3,
					{
						for (var i = 0; i < rowN; i++) {
							var temp = "";//每次截取的字符串
							var start = i * maxLength;//开始截取的位置
							var end = start + maxLength;//结束截取的位置
							//这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
							temp = value.substring(start, end) + "\n";
							ret += temp; //凭借最终的字符串
						}
						return ret;
					}
					else {
						return value;
					}
				}
			},
			"splitArea": {
				"show": false
			},
			'data': xData,
			splitLine: {
				show: false
			},
		
		}
    ],
    yAxis : [
      {
				"type": "value",
				offset: -14,
				"splitLine": {
					"show": false
				},
				"axisLine": {
					"show": false,
					lineStyle: {
						color: '#868c96'
					}
				},
				"axisTick": {
					"show": false
				},
				"axisLabel": {
					"interval": 0,
					fontSize:14

				},
				"splitArea": {
					"show": false
				}
			}

    ],
    series : [
        {
            name:'共享次数',
            type:'bar',
            data:yData,
            itemStyle: {
                normal: {
                    color: function(params) {
                        // build a color map as your need.
                        var colorList = [
                            '#ff2600',
                            '#ffc000',
                            '#00ad4e',
                            '#0073c2',
                            '#165868',
                            '#e76f00',
                            '#316194',
                            '#723761',
                            '#00b2f1',
                            '#4d6022',
                            '#4b83bf',
                            '#f9c813',
                            '#0176c0'
                        ];
                        return colorList[params.dataIndex]
                    },
                   
                }
            },
			 barWidth: 14,
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
        },
		{
			name:'折线',
			type:'line',
			itemStyle : {  /*设置折线颜色*/
				normal : {
				  color:'#d3d5fd'
				}
			},
			data:yData
		}
     
    ]
};


// 使用刚指定的配置项和数据显示图表。
dom.setOption(option);
});