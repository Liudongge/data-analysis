<!-- 用户省份分布图 -->
<template>
<div class="echarts">
  <div id="userMap" :style="{width: 'auto', height: '400px'}"></div>
</div>
</template>

<script>
import Vue from 'vue'
import 'echarts/map/js/china.js'
export default {
  // name: 'chart',
  props: {
    pVisitedCounts: {
      type: Object,
      required: true
    },
    visitedTotal: {
      type: Number,
      required: true
    }
  },
  data() {
    return {}
  },
  mounted() {
    setTimeout(() => {
      console.log('asdadasdad:', this.pVisitedCounts, this.visitedTotal)
      const defaultOption = getDefaultOption(this.pVisitedCounts, this.visitedTotal) // 根据省份访问次数渲染
      let userMap = this.$echarts.init(document.getElementById('userMap'))
      userMap.setOption(defaultOption)
    }, 200)
    // console.log('asdadasdad:', this.pVisitedCounts, this.visitedTotal)
    // const defaultOption = getDefaultOption(this.pVisitedCounts, this.visitedTotal) // 根据省份访问次数渲染
    // let userMap = this.$echarts.init(document.getElementById('userMap'))
    // userMap.setOption(defaultOption)

    // const TOPN = 25
    // var option = userMap.getOption()
    // // 修改top
    // option.grid[0].height = TOPN * 20
    // option.yAxis[0].max = TOPN
    // option.yAxis[0].splitNumber = TOPN
    // option.series[0].data[0] = TOPN
    // 排序
    // var sortArr = option.series[0].data.sort(function(a, b) {
    //   return b.value - a.value
    // })
    //
    // var maxValue = sortArr[0].value,
    //   minValue = sortArr.length > TOPN ? sortArr[TOPN - 1].value : sortArr[sortArr.length - 1].value
    //
    // var s = option.visualMap[0].controller.inRange.color[0],
    //   e = option.visualMap[0].controller.inRange.color.slice(-1)[0]
    // var sColor = getGradientColor(s, e, maxValue, minValue)
    // var eColor = getGradientColor(s, e, maxValue, maxValue)

    // option.series[1].itemStyle.normal.color = new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
    //   offset: 1,
    //   color: sColor
    // }, {
    //   offset: 0,
    //   color: eColor
    // }])

    // yAxis
    // var newYAxisArr = []
    // this.$echarts.util.each(data, function(item, i) {
    //   if (i >= TOPN) {
    //     return false
    //   }
    //   var c = getGradientColor(sColor, eColor, maxValue, item.value)
    //   newYAxisArr.push({
    //     value: item.name,
    //     textStyle: {
    //       color: c
    //     }
    //   })
    // })
    // option.yAxis[0].data = newYAxisArr
    // option.yAxis[0].axisLabel.formatter = (function(data) {
    //   return function(value, i) {
    //     if (!value) return ''
    //     return value + ' ' + data[i].value
    //   }
    // })(data)
    // userMap.setOption(option)
    // this.$api.getLogInfo().then(res => {
    //   if (res.data.code === 200) {}
    // }).catch(response => {
    //   console.log(response)
    // })
    /**
     * 自适应屏幕大小，调整echarts图的style
     */
    // let chartBox = document.getElementsByClassName('echarts')[0]
    // let chartDiv = document.getElementById('userMap')
    // // 用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
    // function resizeCharts () {
    //   chartDiv.style.width = chartBox.style.width + 'px'
    //   chartDiv.style.height = chartBox.style.height + 'px'
    // }
    // 设置容器高宽
    // resizeCharts()
  }
}
const provinceArr = ['北京', '天津', '上海', '重庆', '河北', '山西', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建',
  '江西', '山东', '河南', '湖北', '湖南', '广东', '海南', '四川', '贵州', '云南', '陕西', '甘肃', '青海', '台湾', '内蒙古', '广西',
  '西藏', '宁夏', '新疆', '香港', '澳门', '南海诸岛']
const getDefaultOption = (provinceCount, visitedTotal) => {
  return {
    // backgroundColor: '#',
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        return `省份名称: ${params.name} </br> 玩家数: &nbsp&nbsp&nbsp${params.value} </br> 总玩家数: ${visitedTotal}`
      }
    },
    visualMap: {
      type: 'piecewise',
      show: false, // 是否显示 visualMap-piecewise 组件。如果设置为 false，不会显示，但是数据映射的功能还存在。
      seriesIndex: 0,
      min: 0,
      max: 10, // 组件允许的最大值，视觉映射的『定义域』
      left: 0,
      top: 'auto',
      text: ['高', '低'], // 文本,默认为数值文本
      calculable: true,
      inRange: { // 浅蓝到深蓝
        color: ['rgba(109, 193, 255, 1)', 'rgba(0, 112, 231, 1)']
      },
      outOfRange: {
        color: ['rgba(109, 193, 255, 1)', 'rgba(0, 112, 231, 1)']
      }
    },
    grid: {
      height: 400,
      width: 100,
      right: 10,
      bottom: 10
    },
    xAxis: {
      type: 'category',
      data: [],
      splitNumber: 1,
      show: false
    },
    yAxis: {
      position: 'right',
      min: 0,
      max: 20,
      splitNumber: 20,
      inverse: true,
      axisLabel: {
        show: true
      },
      axisLine: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      data: []
    },
    geo: {
      map: 'china', // 地图类型为中国地图
      regions: [{name: '南海诸岛', value: 0, itemStyle: {normal: {opacity: 0, label: {show: false}}}}], // 去除南海诸岛的显示
      left: '0',
      right: '5%'
    },
    series: [{
      zlevel: 1,
      name: '访问次数',
      type: 'map',
      selectedMode: 'multiple', // 选中模式，表示是否支持多个选中，默认关闭，支持布尔值和字符串，字符串取值可选'single'表示单选，或者'multiple'表示多选。
      roam: false, // 是否开启鼠标缩放扩大
      // left: '0',
      // right: '0', // 使用geo组件后，不再有效
      geoIndex: 0, // 指定使用的geo组件，当设定了 geoIndex 后，series-map.map 属性，以及 series-map.itemStyle 等样式配置不再起作用，而是采用 geo 中的相应属性。
      // label: {
      //   normal: {
      //     show: true
      //   },
      //   emphasis: {
      //     show: true
      //   }
      // },
      data: formatProvince(provinceCount)
    }]
    // }, {
    //   zlevel: 2,
    //   name: '地图指示',
    //   type: 'bar',
    //   barWidth: 5,
    //   itemStyle: {
    //     normal: {
    //       color: undefined,
    //       shadowColor: 'rgba(0, 0, 0, 0.1)',
    //       shadowBlur: 10
    //     }
    //   },
    //   data: [20]
    // }]
  }
}
/**
 * 格式化省份数据信息
 * @param  {object} provinceCount 各省份访问次数：key为省份，value为访问次数
 * @return {array}                数组，每一项为{name: 省份， value: 访问次数}
 */
function formatProvince(provinceCount) {
  let parsedArr = []
  provinceArr.forEach(province => {
    parsedArr.push({
      name: province,
      value: provinceCount[province] > 0 ? provinceCount[province] : 0
    })
  })
  return parsedArr
}
/**
 * 根据传参获取线性渐变颜色
 * @param  {String} start 起始颜色
 * @param  {String} end   结束颜色
 * @param  {Number} max   最多分成多少分
 * @param  {Number} val   渐变取值
 * @return {String}       颜色
 */
// function getGradientColor(start, end, max, val) {
//   console.log(`1111111: ${start}........${end}`)
//   var rgb = /#((?:[0-9]|[a-fA-F]){2})((?:[0-9]|[a-fA-F]){2})((?:[0-9]|[a-fA-F]){2})/;
//   var sM = start.match(rgb);
//   console.log(`start: ${sM}`)
//   var eM = end.match(rgb);
//   console.log(`end: ${eM}`)
//   var err = '';
//   max = max || 1
//   val = val || 0
//   if (sM === null) {
//     err = 'start';
//   }
//   if (eM === null) {
//     err = 'end';
//   }
//   if (err.length > 0) {
//     throw new Error('Invalid ' + err + ' color format, required hex color');
//   }
//   var sR = parseInt(sM[1], 16),
//     sG = parseInt(sM[2], 16),
//     sB = parseInt(sM[3], 16);
//   var eR = parseInt(eM[1], 16),
//     eG = parseInt(eM[2], 16),
//     eB = parseInt(eM[3], 16);
//   var p = val / max;
//   var gR = Math.round(sR + (eR - sR) * p).toString(16),
//     gG = Math.round(sG + (eG - sG) * p).toString(16),
//     gB = Math.round(sB + (eB - sB) * p).toString(16);
//   console.log('finalColor: ' + '#' + gR + gG + gB)
//   return '#' + gR + gG + gB;
// }
</script>
