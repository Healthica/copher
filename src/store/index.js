import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import events from './modules/events'
import user from './modules/user'
import dashboard from './modules/dashboard'
import goals from './modules/goals'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    events,
    user,
    dashboard,
    goals
  },
  strict: debug
})
