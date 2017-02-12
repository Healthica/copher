import eventsAPI from '../../api/events'
import * as types from '../mutation-types'

const state = {
  events: []
}

const actions = {
  loadEvents({ commit }) {
    eventsAPI.getEvents(events => {
      commit(types.LOAD_EVENTS, events)
    })
  }
}

const getters = {
  events: state => state.events
}

const mutations = {
  [types.LOAD_EVENTS] (state, events) {
    state.events = events
  },

  [types.ADD_EVENT] (state, event) {
    state.events.push(event)
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
