$(function () {
  var currentPage = 1
  var pageSize = 5
  //1模板引擎渲染
  render()
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page : currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var htmlStr = template('firstTpl',info)
        $('tbody').html(htmlStr)

        // 分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion : 3, //版本号
          currentPage: info.page, //当前页
          totalPages: Math.ceil(info.total / info.size), //总页数
          //页码添加点击事件
          onPageClicked: function (a,b,c,page) {
            console.log(page);

            currentPage = page 
            render()
          }
        })
      }
    })
  }

  //2模态框显示
  $('#addBtn').click(function () {
    $('#addModal').modal('show')
  })

  //3点击添加按钮,表单效验
  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '请输入一级分类名称'
          }
        }
      }
    }
  })

  //4注册表单效验成给你个事件,阻止浏览器默认行为,ajax提交
  $('#form').on('success.form.bv',function (e) {
    e.preventDefault() //阻止浏览器默认行为

    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function (info) {
        console.log(info);
        //响应成功后,关闭模态框
        //重置表单状态,跳转到第一页渲染,数据添加在第一条
        //,重新渲染页面
        $('#addModal').modal('hide')
        currentPage = 1
        //resetForm(true) : 表示状态和内容都重置 ,不传只重置状态
        $('#form').data('bootstrapValidator').resetForm(true)
        render()
      }
    })

  })


})