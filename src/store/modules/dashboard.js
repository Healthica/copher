import * as types from '../mutation-types'
import chartsAPI from '../../api/charts'
import Vue from 'vue'
import _ from 'lodash'

const state = {
  charts: []
}

const actions = {
  addChart({ commit, dispatch }, chart) {
    commit(types.ADD_CHART, chart)
  },
  deleteChart({ commit, dispatch }, i) {
    commit(types.DELETE_CHART, i)
    dispatch('saveCharts')
  },
  updateChart({ commit, dispatch }, payload) {
    commit(types.UPDATE_CHART, payload)
    dispatch('saveCharts')
  },
  getCharts({ commit }) {
    chartsAPI.getCharts().then(({ charts }) => {
      commit(types.SET_CHARTS, charts)
    })
  },
  saveCharts({ commit, state }) {
    chartsAPI.postCharts(state.charts).then(({ success }) => {
      console.log('charts save', success);
    })
  }
}

const mutations = {
  [types.SET_CHARTS] (state, charts) {
    state.charts = charts
  },
  [types.ADD_CHART] (state, chart) {
    if (!chart) {
      chart = {
        title: 'New Chart',
        type: 'line',
        group_by: 'day',
        group_value: 'average',
        range: 10,
        datasets: []
      }
    }
    state.charts.unshift(chart)
  },
  [types.DELETE_CHART] (state, i) {
    if (i < state.charts.length) {
      state.charts.splice(i, 1)
    }
  },
  [types.UPDATE_CHART] (state, payload) {
    state.charts[payload.index] = payload.chart
  }
}

export default {
  state,
  actions,
  mutations
}
