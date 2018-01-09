<template>
  <ve-pie :data="chartData" :settings="chartSettings"></ve-pie>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'RequestList',
  created: function () {
    let _self = this
    this.chartData = {
      columns: [],
      rows: []
    }
    this.chartSettings = {
      limitShowNum: 5
      // legendName: {
      //   '其他': 'qita'
      // }
    }
    let ip = window.location.host.split(':')[0]
    let url = `http://${ip}:3000/api/public/data/nginx/logInfo/`
    Vue.http({
      method: 'GET',
      url: url
    }).then(result=> {
      if (result.body.code === 200) {
        _self.chartData.columns = ['浏览器', '数量']
        _self.chartData.rows = [
          {
            '浏览器': 'Mac Chrome',
            '数量': 10
          },
          {
            '浏览器': 'Windows Chrome',
            '数量': 22
          }
          // {
          //   '浏览器': 'Mac Chrome',
          //   '数量': result.body.logInfo && result.body.logInfo.browserCounts['Mac Chrome']
          // },
          // {
          //   '浏览器': 'Windows Chrome',
          //   '数量': result.body.logInfo && result.body.logInfo.browserCounts['Windows Chrome']
          // }
        ]
        _self.chartData.rows = result.body.logInfo && result.body.logInfo.browserCounts
        console.log(this)
        console.log(_self)
      }
    }).catch(response => {
      console.error(response)
    })
    // this.chartData = {
    //   columns: ['日期', '成本', '利润'],
    //   rows: [
    //     { '日期': '1月1号', '成本': 123, '利润': 3 },
    //     { '日期': '1月2号', '成本': 1223, '利润': 6 },
    //     { '日期': '1月3号', '成本': 2123, '利润': 90 },
    //     { '日期': '1月4号', '成本': 4123, '利润': 12 },
    //     { '日期': '1月5号', '成本': 3123, '利润': 15 },
    //     { '日期': '1月6号', '成本': 7123, '利润': 20 }
    //   ]
    // }
    // this.chartSettings = {
    //   limitShowNum: 5,
    //   legendName: {
    //     '其他': '别的时间的时候biu~'
    //   }
    // }
  },
  watch: {
    activeName (v) {
      this.$nextTick(_ => {
        this.$refs[`chart${v}`].echarts.resize()
      })
    }
  }
}
</script>
