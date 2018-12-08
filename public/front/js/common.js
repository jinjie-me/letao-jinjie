mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  indicators: false, //是否显示滚动条
});
//获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
  interval:3000//自动轮播周期，若为0则不自动播放，默认为0；
});


//地址栏参数解析
function getSearch( k ) {
  //1.获取地址栏的字符
  var str = location.search
  //2.把截取到的乱码转换成中文
  str = decodeURI(str)
  //3.去掉前面的问号
  //3.1 slice(a,b): 从a开始截取,截取b位 包含a,不包含b,不写b就截取到最后
  str = str.slice(1)
  //4.把字符通过&转换成数组
  var arr = str.split('&')

  var obj = {}
  arr.forEach(function (v,i) {
    //把数组的每一项通过=截取成一个有两个项的数组
    //把第一项赋值给obj的键,第二项赋值给obj的值
    var inarr = v.split('=')
    var key = inarr[0]
    var value = inarr[1]
    obj[key] = value
  })
  //返回你要取的对应键的值
  return obj[k]

}