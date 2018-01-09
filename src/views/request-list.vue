<template>
  <div class="echarts">
    <div id="browser" :style="{width: '800px', height: '600px'}">
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
const getOption = (browserCounts)=> {
  return {
    title : {
        text: '用户所使用浏览器分析',
        subtext: '浏览器使用量',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['Mac Chrome','Windows Chrome']
    },
    series : [
      {
        name: '浏览器',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        data: browserCounts,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
}
export default {
  name: 'chart',
  data() {
    return {}
  },
  mounted() {
    let ip = window.location.host.split(':')[0]
    let url = `http://${ip}:3000/api/public/data/nginx/logInfo/`
    Vue.http({
      method: 'GET',
      url: url
    }).then(result=> {
      if (result.body.code === 200) {
        const browserCounts= [
          {
            'name': 'Mac Chrome',
            'value': result.body.logInfo && result.body.logInfo.browserCounts['Mac Chrome']
          },
          {
            'name': 'Windows Chrome',
            'value': result.body.logInfo && result.body.logInfo.browserCounts['Windows Chrome']
          }
        ]
        const defaultOption = getOption(browserCounts)
        let browser = this.$echarts.init(document.getElementById('browser'))
        browser.setOption(defaultOption)
      }
    }).catch(response => {
      console.error(response)
    })
  }
}
</script>
