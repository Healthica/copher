import eventsAPI from '../../api/events'
import * as types from '../mutation-types'
import Vue from 'vue'
import _ from 'lodash'

const state = {
  version: 0,
  events: [],
  transactions: []
}

const actions = {
  syncEvents({ commit }) {
    eventsAPI.syncEvents(state.version, _.clone(state.transactions)).then((payload) => {
      commit(types.SYNC_EVENTS, payload)
    })
    .catch((payload) => {
      if (payload.has_new_version === true) {
        Vue.prototype.$notify({
          title: 'Sync',
          message: 'New items exist on the server, reload to sync',
          duration: 0
        })
      } else if (payload.errors) {
        console.error(payload)
        for (let i = 0; i < payload.errors.length; i++) {
          Vue.prototype.$message({
            type: 'error',
            message: payload.errors[i].text,
            duration: 0,
            showClose: true
          })
        }
      } else {
        console.error(payload)
      }
    })
  },

  addEvent({ commit }, event) {
    commit(types.ADD_EVENT, event)
  }
}

const getters = {
  // events: state => state.events
}

const mutations = {
  [types.SYNC_EVENTS] (state, payload) {
    console.log('payload', payload);
    if (payload.events && payload.events.length > 0) {
      state.events = payload.events
    }
    if (payload.version) {
      state.version = payload.version
      state.transactions = []
    }
  },

  [types.ADD_EVENT] (state, event) {
    state.events.push(event)
    state.transactions.push({ type: 'ADD', event: event })
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
