import Vue from 'vue'
import ElementUI from 'element-ui'
import './element-theme/theme/index.css'
import App from './App'
import store from './store'

Vue.use(ElementUI)

new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
