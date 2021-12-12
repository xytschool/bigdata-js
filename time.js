  
     function fnW(str) {
      var num
      str >= 10 ? (num = str) : (num = '0' + str)
      return num
    }
   //获取当前时间
     var timer = setInterval(function () {
      var date = new Date()
      var year = date.getFullYear() //当前年份
      var month = date.getMonth() //当前月份
      var data = date.getDate() //天
      var hours = date.getHours() //小时
      var minute = date.getMinutes() //分
      var second = date.getSeconds() //秒
      var day = date.getDay() //获取当前星期几
      if(day==0){
        day="日"
      }
      var ampm = hours < 12 ? 'am' : 'pm'
      $('#time2').html(fnW(hours) + ':' + fnW(minute) + ':' + fnW(second))
      $('.date1').html(
        '<span>' +
          year +
          '/' +
          (month + 1) +
          '/' +
          data +
         
          '</span><span>周' +
          day +
          '</span>'
      )
    }, 1000)