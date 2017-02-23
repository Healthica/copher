import Vue from 'vue'
import App from './App'
import store from './store'

import 'element-ui/lib/theme-default/index.css'
import { Button, Select, Menu, MenuItem, Dialog, Popover, Tooltip, DatePicker, Input, Rate, Checkbox, CheckboxGroup, InputNumber, Switch } from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
locale.use(lang)

Vue.use(Button)
Vue.use(Select)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Dialog)
Vue.use(Popover)
Vue.use(Tooltip)
Vue.use(DatePicker)
Vue.use(Input)
Vue.use(Rate)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(InputNumber)
Vue.use(Switch)

new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
