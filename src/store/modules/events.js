import eventsAPI from '../../api/events'
import * as types from '../mutation-types'
import Vue from 'vue'

const state = {
  version: 0,
  events: []
}

const actions = {
  loadEvents({ commit }) {
    eventsAPI.getEvents(state.version).then((payload) => {
      commit(types.SET_EVENTS_VERSION, payload.version)
      commit(types.LOAD_EVENTS, payload.events)
    })
    .catch((payload) => {
      if (payload.has_new_version === true) {
        Vue.prototype.$notify({
          title: 'Sync',
          message: 'New items exist on the server, reload to sync',
          duration: 0
        })
      } else if (payload.errors) {
        console.error(payload);
        for (let i = 0; i < payload.errors.length; i++) {
          Vue.prototype.$message({
            type: 'error',
            message: payload.errors[i].text,
            duration: 0,
            showClose: true
          })
        }
      }
    })
  }
}

const getters = {
  // events: state => state.events
}

const mutations = {
  [types.LOAD_EVENTS] (state, events) {
    if (events && events.length > 0) {
      state.events = events
    }
  },

  [types.ADD_EVENT] (state, event) {
    state.events.push(event)
  },

  [types.SET_EVENTS_VERSION] (state, version) {
    state.version = version
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
