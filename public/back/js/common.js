
/**
 * 进度条效果
 * ajax全局事件
 * ajaxStart() : 在第一个请求发送时调用
 * ajaxStop() : 在所有请求都发送后调用
 */
$(document).ajaxStart(function() {
  NProgress.start()
})
$(document).ajaxStop(function () {
  setTimeout(function () {
    NProgress.done()
  },500)
})



$(function () {
  //1.点击分类展开
  $('.lt_aside .category').click(function () {
    $(this).next().stop().slideToggle()
  })
  //2.切换侧边栏
  $('.icon_left').click(function () {
    $('.lt_aside').toggleClass('hidemenu')
    $('.lt_topbar').toggleClass('hidemenu')
    $('.lt_main').toggleClass('hidemenu')
  })
  //3.点击图标,显示模态框
  $('.icon_right').click(function () {
    $('#logoutModal').modal('show')
  })

  //4.点击退出,退出到登录页
  $('#logoutBtn').click(function () {
    $.ajax({
      type: 'get',
      url: '/employee/employeeLogout',
      dataType: 'json',
      success: function (info) {
        console.log(info);
        if(info.success){
          location.href = 'login.html'
        }
      }
    })
  })

})