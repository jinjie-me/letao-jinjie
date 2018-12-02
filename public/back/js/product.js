$(function () {
  var currentPage = 1
  var pageSize = 5

  var picArr = [] //存放图片对象
  //1根据后台数据渲染页面
  render()
  function render() {
    $.ajax({
      type: 'get',
      url: '/product/queryProductDetailList',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var htmlStr = template('productTpl',info)
        $('tbody').html(htmlStr)

        //分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3, //版本号
          currentPage: info.page, //当前页
          totalPages: Math.ceil(info.total / info.size), //总页数
          //给页码设置点击事件
          onPageClicked: function (a,b,c,page) {
            currentPage = page
            render()
          }
        })

      }
    })
  }
 
  //2点击按钮显示模态框
  $('#addProduct').click(function () {
    $('#productModal').modal('show')
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: 1,
        pageSize: 99
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var htmlStr = template('secondTpl',info)
        $('.dropdown-menu').html(htmlStr)
      }
    })
  })
    //3.点击下拉框内容,把值赋给下拉框,把id赋给隐藏域的input
    $('.dropdown-menu').on('click','a',function () {
       var txt = $(this).text()
       $('#dropdownText').text(txt)

       //把id提交到隐藏域的val
       var id = $(this).data('id')
       $('[name="brandId"]').val(id)
       $('#form').data('bootstrapValidator').updateStatus('brandId','VALID')
    })

    //4.配置文件上传插件
    $('#fileupload').fileupload({
      dataType: 'json',
      done: function (e,data) {
        console.log(data.result); //后台返回的图片名,和地址
        var picObj = data.result
        picArr.unshift(picObj) //每次添加的图片,添加到数组最前面

        var picUrl = picObj.picAddr //图片地址

        $('#imgBox').prepend('<img src="'+ picUrl +'" style="width: 100px">')

        console.log(picArr);
        if(picArr.length > 3) {
          picArr.pop() //删除最后一张数据
          $('#imgBox img:last-of-type').remove() //删除最后一张图片
        }
        if(picArr.length === 3) {
          $('#form').data('bootstrapValidator').updateStatus('picStatus','VALID')
        }
      }
    })

    //5.添加表单验证
    $('#form').bootstrapValidator({
      excluded: [], //任何类型都验证
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      //设置效验字段
      fields: {
        brandId: {
          validators: {
            notEmpty: {
              message: '请选择第二分类'
            }
          }
        },
        proName: {
          validators: {
            notEmpty: {
              message: '请输入商品名称'
            }
          }
        },
        proDesc: {
          validators: {
            notEmpty: {
              message: '请输入商品描述'
            }
          }
        },
        num: {
          validators: {
            notEmpty: {
              message: '请输入商品库存'
            },
            regexp: {
              regexp: /^[1-9]\d*$/,
              message: '商品库存格式,必须是非零数字开头的'
            }
          }
        },
        size: {
          validators: {
            notEmpty: {
              message: '请输入商品尺码'
            },
            regexp: {
              regexp: /^\d{2}-\d{2}$/,
              message: '尺码必须是两位数字开头,如xx-xx格式,xx为两位数字'
            }
          }
        },
        oldPrice: {
          validators: {
            notEmpty: {
              message: '请输入商品原价'
            }
          }
        },
        price: {
          validators: {
            notEmpty: {
              message: '请输入商品现价'
            }
          }
        },
        picStatus: {
          validators: {
            notEmpty: {
              message: '请上传3张图片'
            }
          }
        },
      }
    })
    
    //6.注册一个表单验证成功事件,阻止表单提交,用ajax提交
    $('#form').on('success.form.bv',function (e) {
      
      e.preventDefault();

      var paramsStr = $('#form').serialize()
      //key=name&key=name
      paramsStr += "&picAddr1=" + picArr[0].picAddr + "&picName1=" + picArr[0].picName 
      paramsStr += "&picAddr1=" + picArr[1].picAddr + "&picName1=" + picArr[1].picName 
      paramsStr += "&picAddr1=" + picArr[2].picAddr + "&picName1=" + picArr[2].picName 


      $.ajax({
        type: 'post',
        url: '/product/addProduct',
        data: paramsStr,
        dataType: 'json',
        success: function (info) {
          console.log(info);
          if(info.success) {
            //如果成功之后,关闭模态框
            $('#productModal').modal('hide')
            //跳转第一页,重新渲染页面
            currentPage = 1
            render()
            //重置表单 resetForm(true): 表示内容和状态都重置
            $('#form').data('bootstrapValidator').resetForm(true)

            //下拉框和图片上传得手动重置,数据重置了,结构没有
            $('#dropdownText').text('请选择二级分类')
            $('#imgBox img').remove()
            picArr = []
          }
        }
      })

    })

})