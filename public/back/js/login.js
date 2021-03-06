$(function () {
 /**
  *  1. 进行表单校验配置
     校验要求:
         (1) 用户名不能为空, 长度为2-6位
         (2) 密码不能为空, 长度为6-12位
  */
  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //校验字段
    fields: {
      //效验用户名
      username : {
        //效验规则
        validators: {
          //非空效验
          notEmpty: {
            message : '请输入用户名'
          },
          //长度效验
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名必须是2-6位'
          },
          callback : {
            message: '用户名不存在'
          }
        }
      },
      //效验密码
      password : {
        //效验规则
        validators: {
          notEmpty: {
            message : '请输入密码'
          },
          stringLength: {
            min:6,
            max:12,
            message: '密码必须是6-12位'
          },
          callback: {
            message: '密码错误'
          }
        }
      }
    }
  })


  /**
   * 2.验证成功后,默认是会把表单提交的,
   * 要用ajax提交表单
   */
  $('#form').on('success.form.bv',function (e) {
    //阻止浏览器默认行为
    e.preventDefault();
    console.log('阻止了');

    $.ajax({
      type: 'post',
      url: '/employee/employeeLogin',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function (info) {
        console.log(info);
        if (info.error === 1000){
          /**
           * 更新当前输入框的效验状态
           * updateStatus(1,2,3) 
           * 参数1 : field 字段名称
           * 参数2 : status 状态 NOT_VALIDATED,VALIDATING,INVALID,VALID
           * 参数3 : validator 配置效验规则
           */
          $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback')
          return
        }
        if (info.error === 1001){
          $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback')
          return
        }
        if(info.success){
          location.href= 'index.html'
        }
      }
    })

  })

  //3.重置功能
  $('[type="reset"]').on('click',function () {
    $('#form').data('bootstrapValidator').resetForm()
  })

})