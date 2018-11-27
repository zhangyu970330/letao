/**
 * Created by 54721 on 2018/11/26.
 */
$(function () {

  $.ajax({

    type: "get",
    url: "/user/queryUserMessage",
    dataType: "json",
    success: function (info) {
      console.log(info);

      if (info.error === 400) {
        // 未登录
        location.href = "login.html"
        return;

      }
      // 已登录
      var htmlStr = template("userTpl", info);

      $('#userInfo').html(htmlStr);
    }
  })
  //  退出功能 点击退出按钮

  $('#logout').click(function () {
    $.ajax({
      type: "get",
      url: "/user/logout",
      dataType: "json",
      success: function (info) {
        console.log(info);
        // 退出成功  
        location.href = "login.html"
      }
    })
  })
})