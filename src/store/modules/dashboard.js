import * as types from '../mutation-types'
import Vue from 'vue'
import _ from 'lodash'

const state = {
  charts: [
    {
      title: 'Coffee Sugar vs Taste',
      type: 'line', // line/bar/histogram
      group_by: 'day', // none/hour/day/week/month
      group_value: 'average', // sum/average/median
      range: 10, // * group_by
      datasets: [
        {
          label: 'Sugar',
          event_match: 'coffee',
          field_match: 'sugar'
        }, {
          label: 'Taste',
          event_match: 'coffee',
          field_match: 'taste'
        }
      ]
    }, {
      title: 'Coffee Sugar vs Taste',
      type: 'line', // line/bar/histogram
      group_by: 'day', // none/hour/day/week/month
      group_value: 'sum', // sum/average/median
      range: 7, // * group_by
      datasets: [
        {
          label: 'Sugar',
          event_match: 'coffee',
          field_match: 'sugar'
        }, {
          label: 'Taste',
          event_match: 'coffee',
          field_match: 'taste'
        }
      ]
    },
  ]
}

const actions = {
  addChart({ commit }, chart) {
    commit(types.ADD_CHART, chart)
  },
  deleteChart({ commit }, i) {
    commit(types.DELETE_CHART, i)
  },
  updateChart({ commit }, payload) {
    commit(types.UPDATE_CHART, payload)
  }
}

const mutations = {
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
    console.log('pp', payload)
    state.charts[payload.index] = payload.chart
  }
}

export default {
  state,
  actions,
  mutations
}
