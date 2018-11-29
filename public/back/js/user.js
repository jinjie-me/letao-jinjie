$(function () {
  var currentPage = 1
  var pageSize = 5

  var currentId
  var isDelete

  render()
  function render() {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        //template(模板id,数据对象)
        var htmlStr = template('tmp',info)
        $('tbody').html(htmlStr)
  
        //根据ajax请求的数据,进行分页操作
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3, //版本号
          currentPage: info.page, //当前页
          totalPages : Math.ceil(info.total / info.size), //总页数
          //给页面添加点击事件
          onPageClicked: function (a,b,c,page) {
            console.log(page)
            currentPage = page
            render()
          }
        })
  
      }
    })
  }
  /**
   * 事件委托: 
   * 可以给动态生成的数据绑定事件
   * 可以批量绑定事件,效率高     
   */
  $('tbody').on('click','.btn',function () {
    //模态框显示,获取当前的用户id,获取用户状态
    $('#userModal').modal('show')
    currentId = $(this).parent().data('id')
    //判断按钮的类名,决定把他修改成什么状态
    isDelete = $(this).hasClass('btn-danger') ? 0 : 1
  })

  //模态框点击确认按钮,发送ajax,修改用户状态
  $('#confirmBtn').click(function () {
    $.ajax({
      type: 'post',
      url: '/user/updateUser',
      data: {
        id: currentId,
        isDelete: isDelete
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        //修改成功后,模态框隐藏,根据后台返回的新数据重新渲染页面
        $('#userModal').modal('hide')
        render()
      }
    })
  })

})