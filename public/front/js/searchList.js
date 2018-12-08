$(function () {
  var key = getSearch('key')
  $('.search_input').val(key)
  console.log(key);
  render()


  $('.search_btn').click(function () {
    render()
  })

  //判断是否有active类,没有就加上,让他高亮
  //有就切换上下箭头
  $('.lt_sort [data-type]').click(function () {
    if($(this).hasClass('active')) {
      $(this).find('i').toggleClass('fa fa-angle-down').toggleClass('fa fa-angle-up')
    }else {
      $(this).addClass('active').siblings().removeClass('active')
    }

    render()
  })

  function render() {

    //加载中动画
    $('.lt_product').html('<div class="loading"></div>')

   

    //获取参数,发送ajax
    var obj = {}
    obj.proName = $('.search_input').val()
    obj.page = 1
    obj.pageSize = 100
    
    //通过对高亮元素的字体图标来排序
    var $active = $('.lt_sort a.active')
    if($active.length == 1) {
      var sortkey = $active.data('type')
      var sortvalue = $active.find('i').hasClass('fa fa-angle-up') ? 1 : 2

      obj[sortkey] = sortvalue
    }

    setTimeout(function () {
      $.ajax({
        type: 'get',
        url: '/product/queryProduct',
        data: obj ,
        dataType: 'json',
        success: function (info) {
          console.log(info);
          var htmlStr = template('proTpl', info)
          $('.lt_product').html(htmlStr)
        }
      })
    },1000)

  }

})