import * as types from '../mutation-types'
import goalsAPI from '../../api/goals'
import Vue from 'vue'
import _ from 'lodash'

const state = {
  goals: []
}

const actions = {
  addGoal({ commit, dispatch }, goal) {
    commit(types.ADD_GOAL, goal)
  },
  deleteGoal({ commit, dispatch }, i) {
    commit(types.DELETE_GOAL, i)
    dispatch('saveGoals')
  },
  updateGoal({ commit, dispatch }, payload) {
    commit(types.UPDATE_GOAL, payload)
    dispatch('saveGoals')
  },
  getGoals({ commit }) {
    goalsAPI.getGoals().then(({ goals }) => {
      commit(types.SET_GOALS, goals)
    })
  },
  saveGoals({ commit, state }) {
    goalsAPI.postGoals(state.goals).then(({ success }) => {
      console.log('goals save', success);
    })
  }
}

const mutations = {
  [types.SET_GOALS] (state, goals) {
    state.goals = goals
  },
  [types.ADD_GOAL] (state, goal) {
    if (!goal) {
      goal = {
        title: 'New Goal',
        type: 'one_time'
      }
    }
    state.goals.unshift(goal)
  },
  [types.DELETE_GOAL] (state, i) {
    if (i < state.goals.length) {
      state.goals.splice(i, 1)
    }
  },
  [types.UPDATE_GOAL] (state, payload) {
    state.goals[payload.index] = payload.goal
  }
}

export default {
  state,
  actions,
  mutations
}
