import eventsAPI from '../../api/events'
import * as types from '../mutation-types'
import Vue from 'vue'
import _ from 'lodash'
import moment from 'moment'

const state = {
  version: 0,
  data: [],
  transactions: [],
  dictionary: {}
}

const actions = {
  syncEvents({ commit }) {
    if (state.transactions.length === 0) {
      eventsAPI.getEvents().then(({ version, data }) => {
        commit(types.SET_EVENTS, { version, data })
        commit(types.BUILD_DICTIONARY)
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
          commit(types.BUILD_DICTIONARY)
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
    commit(types.SET_DICTIONARY_KEY, event)
  },

  setEvent({ commit }, event) {
    commit(types.SET_EVENT_FIELD, event)
    commit(types.SET_DICTIONARY_KEY, event)
  },

  deleteEvent({ commit }, event) {
    commit(types.DELETE_EVENT, event)
    commit(types.UPDATE_DICTIONARY_KEY, event)
  },

  updateEventAddTransaction({ commit }, event) {
    commit(types.UPDATE_EVENT_ADD_TRANSACTION, event)
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
  },

  [types.BUILD_DICTIONARY] (state) {
    const sortedEvents = _.sortBy(state.data, [ o => -moment(o.time).valueOf() ])
    const dict = {}
    _.each(sortedEvents, e => {
      if (!dict[e.title]) {
        dict[e.title] = {
          id: e.id,
          time: e.time
        }
      }
    })
    state.dictionary = dict
  },

  [types.SET_DICTIONARY_KEY] (state, event) {
    if (!state.dictionary[event.title] || moment(state.dictionary[event.title].time) < moment(event.time)) {
      state.dictionary[event.title] = {
        id: event.id,
        time: event.time
      }
    }
  },

  [types.UPDATE_DICTIONARY_KEY] (state, event) {
    if (state.dictionary[event.title] && state.dictionary[event.title].id !== event.id) {
      return
    }
    const latest = _.maxBy(_.filter(state.data, e => e.title === event.title), [ o => moment(o.time).valueOf()])
    if (latest) {
      state.dictionary[latest.title] = {
        id: latest.id,
        time: latest.time
      }
    } else {
      delete state.dictionary[event.title]
    }
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
