import Vue from 'vue'
import Router from 'vue-router'

import Widget from '@/views/Widget'
import Setting from '@/views/Setting'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'widget-view',
      component: Widget
    },
    {
      path: '/setting',
      name: 'setting-view',
      component: Setting
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
