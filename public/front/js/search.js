$(function () {


  //1从localstorage获取数据,渲染到页面
  render()

  //1.1先获取localStorage获取数据
  function getHistory() {
    //因为没有数据无法判断数组长度,所以要准备一个空数组,给模板引擎判断用
    var jsonStr = localStorage.getItem('search_list') || '[]' 
    var arr = JSON.parse(jsonStr)
    return arr
  }

  //1.2然后通过模板引擎渲染
  function render() {
    var arr = getHistory()
    var htmlStr = template('historyTpl', { list: arr })
    $('.lt_history').html(htmlStr)
  }

  //2.点击清空按钮,清空所有内容
  //2.1给清空按钮添加点击事件(事件委托)
  $('.lt_history').on('click','.btn_empty',function () {
    //2.2弹出确认对话框
    mui.confirm('你确定要删除所有记录吗?','温馨提示',['取消','确认'],function (e) {
      //e.index: 点击按钮下标, 取消: 0 确认: 1
      console.log(e);
      if(e.index === 1) {
        //2.3localStorage 删除对应的对象
        localStorage.removeItem('search_list')
        //2.4重新渲染页面
        render()
      }
    })
  })

  //3.删除单条记录
  //3.1给每条数据的删除按钮注册点击事件
  $('.lt_history').on('click','.btn_delete',function () {
    
    //3.2获取localStorage的数组
    var arr = getHistory()
    //3.3获取对应条数的下标
    var index = $(this).data('index')
    //3.4把对应下标的数据在数组中删除掉
    arr.splice(index,1)
    //3.5 把处理过的数组重新存储到localStorage中,转成json字符串存入
    localStorage.setItem('search_list',JSON.stringify(arr))
    //3.6 重新渲染页面
    render()

  })

  //4.添加单条历史数据
  //4.1给搜索按钮添加点击事件
  $('.search_btn').click(function() {
    //4.2获取输入框的内容,去除前后空白
    var key = $('.search_input').val().trim()
    //4.2.1如果没有输入内容,弹出一个提示框
    if ( key == '' ) {
      //4.2.2提示框内容设置
      mui.toast('请输入搜索内容',{
        duration: 3000
      })
      return
    }


    //4.3把localStorage里的内容取出来
    var arr = getHistory()
    //4.4判断里面是否有和输入的内容重复的,删除重复内容
    // 4.4.1 indexOf() : 有就返回下标 没有就是-1
    var index = arr.indexOf( key )
    if(index != -1) {
      //4.4.2删除重复内容
      arr.splice(index,1)
    }
    //4.5把搜索历史的数据保持在10条以内
    if(arr.length >= 10) {
      //4.5.1把超过10条的删掉
      arr.pop()
    }
    //4.6把内容存储到数组最前面
    arr.unshift(key)

    //4.7重新把处理好的数组转换成JSON字符串,存储到localStorage中
    localStorage.setItem('search_list',JSON.stringify(arr))

    //4.8重新渲染页面
    render()

    //4.9重置输入框
    $('.search_input').val('')
  })

})