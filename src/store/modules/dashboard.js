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
}

const mutations = {
}

export default {
  state,
  actions,
  mutations
}
