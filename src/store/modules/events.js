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
  syncEvents({ commit, dispatch }) {
    if (state.transactions.length === 0) {
      dispatch('setStatus', 'connecting')
      eventsAPI.getEvents().then(({ version, data }) => {
        commit(types.SET_EVENTS, { version, data })
        dispatch('setStatus', 'online')
      })
      .catch((payload) => {
        dispatch('setStatus', 'disconnected')
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
      dispatch('setStatus', 'syncing')
      eventsAPI.postEvents(state.version, state.transactions).then(({ success, version, has_new_events }) => {
        if (success) {
          commit(types.CLEAR_EVENTS_TRANSACTIONS)
        }
        if (version) {
          commit(types.SET_EVENTS_VERSION, { version })
        }
        if (has_new_events) {
          // Notify to refresh
          dispatch('setStatus', 'has_updates')
        } else {
          dispatch('setStatus', 'online')
        }
      })
      .catch((payload) => {
        dispatch('setStatus', 'disconnected')
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
  },

  setEvent({ commit }, event) {
    commit(types.SET_EVENT_FIELD, event)
  },

  deleteEvent({ commit }, event) {
    commit(types.DELETE_EVENT, event)
  },

  updateEventAddTransaction({ commit }, event) {
    commit(types.UPDATE_EVENT_ADD_TRANSACTION, event)
  }
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
  },

  [types.SET_EVENT_FIELD] (state, event) {
    const index =  _.findIndex(state.data, { id: event.id })
    state.data.splice(index, 1, _.cloneDeep(event))
  },

  [types.UPDATE_EVENT_ADD_TRANSACTION] (state, event) {
    state.transactions.push({ type: 'UPDATE', event: event })
  },

  [types.DELETE_EVENT] (state, event) {
    const i = _.findIndex(state.data, e => e.id === event.id)
    if (i > -1) {
      state.data.splice(i, 1)
    }
    state.transactions.push({ type: 'DELETE', event: event })
  }
}

export default {
  state,
  actions,
  mutations
}
