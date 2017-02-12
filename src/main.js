// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import './element-theme/theme/index.css'
import App from './App'
import Vuex from 'vuex'

Vue.use(ElementUI)
Vue.use(Vuex)

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
