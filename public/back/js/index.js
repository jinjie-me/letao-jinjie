$(function () {
  //柱状图
  var echarts_left = echarts.init(document.querySelector('.echarts_left'));

// 指定图表的配置项和数据
var option1 = {
  //标题
    title: {
        text: '2018年注册人数'
    },
    //悬停显示文本
    tooltip: {},
    legend: {
        data:['人数','销量']
    },
    xAxis: {
        data: ["1月","2月","3月","4月","5月","6月"]
    },
    yAxis: {},
    series: [{
        name: '人数',
        type: 'bar',
        data: [53, 250, 300, 100, 140, 110]
    },{
      name: '销量',
      type: 'line',
      data: [50, 200, 360, 80, 90, 120]
  }]
};

// 使用刚指定的配置项和数据显示图表。
echarts_left.setOption(option1);

//饼图
var echarts_right = echarts.init(document.querySelector('.echarts_right'))

var Option2 = {
  //标题
  title : {
      text: '热门品牌销售',
      subtext: '2018年11月',
      x:'center'
  },
  //悬停提示文本
  tooltip : {
    //提示文本触发类型 
    //item 数据项触发  axis 坐标轴触发 none 什么都不触发
      trigger: 'item',
      //a:系列名称 b:每一项数据名称 c:每一项数值 d:百分比
      formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  //图例布局
  legend: {
    //布局朝向 horizontal: 水平 vertical: 垂直
      orient: 'vertical',
      left: 'left',
      data: ['耐克','阿迪','新百伦','李宁','鸿星尔克']
  },
  //系列列表
  series : [
      {
          name: '访问来源',
          type: 'pie',
          //饼图大小
          radius : '55%',
          //圆心到left top 距离
          center: ['50%', '60%'],
          data:[
            //value/total(总数)= 百分比(保留两位)
              {value:335, name:'耐克'},
              {value:310, name:'阿迪'},
              {value:234, name:'新百伦'},
              {value:135, name:'李宁'},
              {value:1548, name:'鸿星尔克'}
          ],
          itemStyle: {
              emphasis: {
                  shadowBlur: 100,//阴影大小
                  shadowOffsetX: 0,//水平方向偏移
                  shadowColor: 'rgba(0, 0, 0, 0.5)'//颜色
              }
          }
      }
  ]
};


echarts_right.setOption(Option2)

})