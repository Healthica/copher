import * as types from './mutation-types'

export const addEvent = ({ commit }, event) => {
  commit(types.ADD_EVENT, event)
}

export const loadEvents = ({ commit }) => {
  commit(types.LOAD_EVENTS)
}
