<template>
<div class="echarts">
  <div id="timing" :style="{width: '800px', height: '600px'}">
  </div>
</div>
</template>

<script>
import Vue from 'vue'
const getOption = (timingAnalysis) => {
  return {
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      data: ['白屏时间', '首屏时间', '用户可操作时间', '总下载时间'],
      axisTick: {
        alignWithLabel: true
      }
    }],
    yAxis: [{
      type: 'value'
    }],
    series: [{
      name: '平均时间(毫秒)',
      type: 'bar',
      barWidth: '20%',
      data: timingAnalysis
    }]
  };
}
export default {
  name: 'timingChart',
  data() {
    return {}
  },
  mounted() {
    let ip = window.location.host.split(':')[0]
    let url = `http://${ip}:3000/api/public/data/nginx/logInfo/`
    Vue.http({
      method: 'GET',
      url: url
    }).then(result => {
      if (result.body.code === 200) {
        const timingAnalysis = [
          result.body.logInfo && result.body.logInfo.pageAnalysis && result.body.logInfo.pageAnalysis.whiteScreenTime,
          result.body.logInfo && result.body.logInfo.pageAnalysis && result.body.logInfo.pageAnalysis.firstScreen,
          result.body.logInfo && result.body.logInfo.pageAnalysis && result.body.logInfo.pageAnalysis.readyTime,
          result.body.logInfo && result.body.logInfo.pageAnalysis && result.body.logInfo.pageAnalysis.allloadTime
        ]
        const defaultOption = getOption(timingAnalysis)
        let timing = this.$echarts.init(document.getElementById('timing'))
        timing.setOption(defaultOption)
      }
    }).catch(response => {
      console.error(response)
    })
    Vue.http({
      method: 'GET',
      url: 'http://localhost:3000/api/public/data/sign/'
    }).then(result => {
      if (result.body.code === 200) {
        console.log('success')
      }
    }).catch(response => {
      console.error(response)
    })
  }
}
</script>
