import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import os from 'os'

library.add(faUser, faSpinner)
Vue.component('fa-icon', FontAwesomeIcon)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false
Vue.prototype.$updateTheme = window.__setTheme = () => {
  const savedTheme = localStorage.theme
  const defaultTheme = 'light'
  const theme = savedTheme || defaultTheme

  document.documentElement.setAttribute(
    'data-theme', theme
  )
  localStorage.setItem('theme', theme)
}

document.documentElement.setAttribute(
  'data-win32',
  os.platform === 'win32'
)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
