import * as types from '../mutation-types'
import goalsAPI from '../../api/goals'
import Vue from 'vue'
import _ from 'lodash'

const state = {
  goals: []
}

const actions = {
  getGoals({ commit }) {
    goalsAPI.getGoals().then(({ goals }) => {
      commit(types.SET_GOALS, goals)
    })
  },
  addGoal({ commit, dispatch }, goal) {
    commit(types.ADD_GOAL, goal)
  },
  updateGoal({ commit, dispatch }, goal) {
    commit(types.UPDATE_GOAL, goal)
    dispatch('saveGoals')
  },
  deleteGoal({ commit, dispatch }, id) {
    commit(types.DELETE_GOAL, id)
    dispatch('saveGoals')
  },
  saveGoals({ commit, state }) {
    goalsAPI.postGoals(state.goals).then(({ success }) => {
      console.log('API goals saved', success);
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
  [types.UPDATE_GOAL] (state, goal) {
    const i = _.findIndex(state.goals, g => g.id === goal.id)
    if (i > -1) {
      state.goals[i] = goal
    }
  },
  [types.DELETE_GOAL] (state, id) {
    const i = _.findIndex(state.goals, g => g.id === id)
    if (i > -1) {
      state.goals.splice(i, 1)
    }
  }
}

export default {
  state,
  actions,
  mutations
}
