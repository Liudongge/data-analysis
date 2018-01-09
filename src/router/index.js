import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'CityInfo',
    //   component: CityMap
    // },
    {
      path: '/cityInfo',
      name: 'CityInfo',
      component: resolve => require(['../views/city-info'], resolve)
    },
    {
      path: '/requestList',
      name: 'RequsetList',
      component: resolve => require(['../views/request-list'], resolve)
    },
    {
      path: '/timeAnalysis',
      name: 'TimeAnalysis',
      component: resolve => require(['../views/time-analysis'], resolve)
    }
  ]
})
