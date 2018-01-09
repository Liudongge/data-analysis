// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import VueResource from 'vue-resource'
import VCharts from 'v-charts' // 引入v-charts

Vue.use(VueResource)
Vue.use(VCharts)

Vue.config.productionTip = false
// 添加echart的原型调用
Vue.prototype.$echarts = echarts


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
