import userAPI from '../../api/user'
import * as types from '../mutation-types'
import Vue from 'vue'
import _has from 'lodash/has'

const state = {
  id: null,
  name: 'Guest',
  is_guest: true,
  settings: {},
  status: 'offline'
}

const actions = {
  setStatus({ commit }, status) {
    commit(types.SET_USER_STATUS, status)
  },
  setUser({ commit }, user) {
    commit(types.SET_USER, user)
  },
}

const getters = {
  // events: state => state.events
}

const mutations = {
  [types.SET_USER_STATUS] (state, status) {
    state.status = status
  },
  [types.SET_USER] (state, user) {
    state.id = user.id
    state.name = user.name
    state.is_guest = (_has(user, 'auth_by') && user.auth_by !== 'none') ? false : true
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
