import eventsAPI from '../../api/events'
import * as types from '../mutation-types'
import Vue from 'vue'
import _ from 'lodash'

const state = {
  version: 0,
  data: [],
  transactions: []
}

const actions = {
  syncEvents({ commit }) {
    if (state.transactions.length === 0) {
      eventsAPI.getEvents().then(({ version, data }) => {
        commit(types.SET_EVENTS, { version, data })
      })
      .catch((payload) => {
        console.error(payload)
        _.each(payload.errors, e => {
          Vue.prototype.$message({
            type: 'error',
            message: e.text,
            duration: 0,
            showClose: true
          })
        })
      })
    } else {
      eventsAPI.postEvents(state.version, state.transactions).then(({ version, data }) => {
        if (data) {
          commit(types.SET_EVENTS, { version, data })
        } else {
          commit(types.SET_EVENTS_VERSION, { version })
          commit(types.CLEAR_EVENTS_TRANSACTIONS)
        }
      })
      .catch((payload) => {
        console.error(payload)
        _.each(payload.errors, e => {
          Vue.prototype.$message({
            type: 'error',
            message: e.text,
            duration: 0,
            showClose: true
          })
        })
      })
    }
  },

  addEvent({ commit }, event) {
    commit(types.ADD_EVENT, event)
  }
}

const getters = {
  // events: state => state.events
}

const mutations = {
  [types.SET_EVENTS] (state, { version, data }) {
    state.version = version
    state.data = data
    state.transactions = []
  },

  [types.SET_EVENTS_VERSION] (state, { version }) {
    state.version = version
  },

  [types.CLEAR_EVENTS_TRANSACTIONS] (state) {
    state.transactions = []
  },

  [types.ADD_EVENT] (state, event) {
    state.data.push(event)
    state.transactions.push({ type: 'ADD', event: event })
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
