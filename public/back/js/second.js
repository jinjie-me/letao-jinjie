$(function () {
  var currentPage = 1
  var pageSize = 5
  //1用模板引擎渲染
  render()
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function(info){
        console.log(info);
        var htmlStr = template('secondTpl',info)
        $('tbody').html(htmlStr)

        //分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3, //版本号
          currentPage: info.page, //当前页
          totalPages: Math.ceil(info.total / info.size), //总页数
          //页码绑定点击事件
          onPageClicked: function (a,b,c,page) {
            console.log(page)
            currentPage = page
            render()
          }
        })

      }
    })
}

//2点击按钮,显示模态框
$('#addBtn').click(function () {
  $('#addModal').modal('show')

  //发送ajax请求,获取一级分类的全部数据
  //写死page和pageSize,获取全部的数据
  $.ajax({
    type: 'get',
    url: '/category/queryTopCategoryPaging',
    data: {
      page: 1,
      pageSize: 99
    },
    dataType: 'json',
    success: function (info) {
      console.log(info);
      var htmlStr = template('dropdownTpl',info)
      $('.dropdown-menu').html(htmlStr)
    }
  })

})

//3.点击下拉选项,把文字赋值按钮,
// 对应的id发送给后台,更新表单的效验状态
//使用事件委托 a 委托给 dropdown-menu
$('.dropdown-menu').on('click','a',function () {
  var txt = $(this).text()
  $('#dropdownText').text(txt)
  //获取当前点击的id,赋值给隐藏域
  var id = $(this).data('id')
  $('[name="categoryId"]').val(id)
  //如果选择了,更改表单效验状态
  $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID')
})


//4配置文件上传插件,让插件发送异步文件上传请求
$('#fileupload').fileupload({
  dataType: 'json',
  //e：事件对象
  //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
  //done 是文件上传完成后的回调函数
  done: function (e,data) {
    console.log(data);
    console.log(data.result);
    var picUrl = data.result.picAddr
    $('#imgBox img').attr('src',picUrl)
    //把图片地址赋值给隐藏域的val属性
    $('[name="brandLogo"]').val(picUrl)
    $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID')
    
  }
})

//5.表单验证
$('#form').bootstrapValidator({
  //指定不效验类型,都效验
  excluded: [],
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
  fields: {
    categoryId: {
      validators: {
        notEmpty: {
          message: '请选择一级分类'
        }
      }
    },
    brandName: {
      validators: {
        notEmpty: {
          message: '请输入二级分类名称'
        }
      }
    },
    brandLogo: {
      validators: {
        notEmpty: {
          message: '请上传图片'
        }
      }
    }
  }
})

//6.表单效验成功后,提交到后台,阻止表单默认提交,用ajax提交
$('#form').on('success.form.bv',function(e){
  e.preventDefault(); //阻止浏览器默认行为
  $.ajax({
    type: 'post',
    url: '/category/addSecondCategory',
    data: $('#form').serialize(),
    dataType: 'json',
    success: function (info) {
      console.log(info);
      if(info.success){
        //成功后关闭模态框,重新渲染页面,第一页
        $('#addModal').modal('hide')
        currentPage = 1
        render()
        
        //重置表单状态,resetForm(true) : 内容和状态都重置
        $('#form').data('bootstrapValidator').resetForm(true)
        //图片和下拉框不是表单,要手动重置
        $('#dropdownText').text('请选择一级分类')
        $('#imgBox img').attr('src','./images/none.png')
      }
    }
  })
  
})


})