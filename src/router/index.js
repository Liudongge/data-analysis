import Vue from 'vue'
import Router from 'vue-router'
import CityMap from '@/components/city-info'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CityInfo',
      component: CityMap
    },
    {
      path: '/cityInfo',
      name: 'CityInfo',
      component: CityMap
    }
  ]
})
