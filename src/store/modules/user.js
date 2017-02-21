import userAPI from '../../api/user'
import * as types from '../mutation-types'
import Vue from 'vue'
import _ from 'lodash'

const state = {
  id: null,
  name: 'Guest',
  is_logged_in: false,
  settings: {},
  status: 'offline'
}

const actions = {
  setStatus({ commit }, status) {
    commit(types.ADD_EVENT, event)
  }
}

const getters = {
  // events: state => state.events
}

const mutations = {
  [types.SET_USER_STATUS] (state, status) {
    state.status = status
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
