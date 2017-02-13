import _ from 'lodash'
import uuid from 'uuid'
import moment from 'moment'

/**
 * Mocking client-server processing
 */
const _events = {
  success: true,
  version: 1,
  data: [
    {"id": uuid.v4(), "title": "Headache", time: moment().subtract(1, 'days').format() },
    {"id": uuid.v4(), "title": "Sleep", time: moment().subtract(1, 'days').format() },
    {"id": uuid.v4(), "title": "Weight Measurement", time: moment().subtract(2, 'days').format() },
    {"id": uuid.v4(), "title": "Sleep", time: moment().subtract(3, 'days').format() },
    {"id": uuid.v4(), "title": "Eat", time: moment().subtract(3, 'days').format() }
  ]
}
const _events_new_version = {
  success: false,
  has_new_version: true,
  errors: [
    { id: 'events_merged_new_version', text: 'New version exists, reload to sync' }
  ]
}
const _events_errors = {
  success: false,
  errors: [
    { id: 'something_went_wrong', text: 'Something went wrong!' },
    { id: 'some_error', text: 'Old server version' }
  ]
}

export default {
  getEvents () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(_.cloneDeep(_events))
        // reject(_events_errors)
      }, 100)
    })
  },
  postEvents (version, transactions) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        _.each(transactions, t => {
          if (t.type === 'ADD') {
            _events.data.push(_.cloneDeep(t).event)
          } else if (t.type === 'UPDATE') {
            const index =  _.findIndex(_events.data, { id: t.event.id })
            _events.data.splice(index, 1, _.cloneDeep(t.event))
          }
        })

        // No new events from other clients since last sync
        _events.version++
        resolve({ success: true, version: _.cloneDeep(_events).version })

        // New events from other clients since last sync
        // _events.version = version + 1
        // _events.data.push({ id: Math.round(100 * Math.random()), title: 'new stuff' })
        // resolve(_.cloneDeep(_events))
      }, 100)
    })
  }
}
