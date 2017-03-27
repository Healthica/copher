import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import './element-theme/theme/index.css'
import App from './App'
import store from './store'

import LogApp from './components/LogApp'
import Dashboard from './components/Dashboard'
import Goals from './components/Goals'
import Settings from './components/Settings'
const router = new VueRouter({
  routes: [
    { path: '/', component: LogApp },
    { path: '/dashboard', component: Dashboard },
    { path: '/goals', component: Goals },
    { path: '/settings', component: Settings }
  ]
})

Vue.use(VueRouter)
Vue.use(ElementUI, { locale })

new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App },
  router: router
})
