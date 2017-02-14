import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import './element-theme/theme/index.css'
import App from './App'
import store from './store'

Vue.use(ElementUI, { locale })

new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
