$(function () {
  $.ajax({
    type: 'get',
    url: '/category/queryTopCategory',
    dataType: 'json',
    success: function (info) {
      console.log(info);
      var htmlStr = template('leftTpl',info)
      $('.lt_category_left ul').html(htmlStr)
      renderById(info.rows[0].id) //不用下标,下标会变
    }
  })

  /**
   * 1给所有的a注册点击事件(事件委托)
   * 2点击哪个哪个高亮
   * 3.点击哪个就切换对应的二级分类
   * 3.1获取对应的id
   * 3.2发送ajax请求
   * 3.3重新渲染页面
   */
  $('.lt_category_left ul').on('click','a',function () {
    //排他法
    $('.lt_category_left ul a').removeClass('current')
    $(this).addClass('current')

    var id = $(this).data('id')
    renderById(id)
  })
  function renderById(id) {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategory',
      data: { id },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var htmlStr = template('rightTpl',info)
        $('.lt_category_right ul').html(htmlStr)
      }
    })  
  }
})