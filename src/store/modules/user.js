import userAPI from '../../api/user'
import * as types from '../mutation-types'
import Vue from 'vue'
import _ from 'lodash'

const state = {
  id: null,
  name: 'Guest',
  is_guest: true,
  settings: {},
  status: 'offline',
  show_onboarding: false
}

const actions = {
  setStatus({ commit }, status) {
    commit(types.SET_USER_STATUS, status)
  },
  setUser({ commit }, user) {
    commit(types.SET_USER, user)
  },
}

const mutations = {
  [types.SET_USER_STATUS] (state, status) {
    state.status = status
  },
  [types.SET_USER] (state, user) {
    if (user.id) {
      state.id = user.id
    }
    if (user.name) {
      state.name = user.name
    }
    if (user.show_onboarding) {
      state.show_onboarding = user.show_onboarding
    }
    if (_.has(user, 'auth_by')) {
      state.is_guest = user.auth_by !== 'none' ? false : true
    }
  }
}

export default {
  state,
  actions,
  mutations
}
