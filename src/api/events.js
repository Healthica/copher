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
    {
      id: uuid.v4(),
      title: 'Sleep',
      time: moment().subtract(1, 'days').subtract(Math.round(1000 * Math.random()), 'minutes').format(),
      fields: [
        {
          id: '_sleep_duration',
          title: 'Duration',
          type: 'duration_minutes',
          value: 450
        }, {
          id: '_sleep_quality',
          title: 'Quality',
          type: 'rank_stars',
          value: 3
        }
      ],
      views: {
        row_show: ['_sleep_duration']
      }
    }, {
      id: uuid.v4(),
      title: 'Weight Measurement',
      time: moment().subtract(2, 'days').subtract(Math.round(1000 * Math.random()), 'minutes').format(),
      fields: [
        {
          id: '_measurement_weight',
          title: 'Weight',
          type: 'weight',
          value: 85
        }
      ],
      views: {
        row_show: ['_measurement_weight']
      }
    }, {
      id: uuid.v4(),
      title: 'Sleep',
      time: moment().subtract(3, 'days').subtract(Math.round(1000 * Math.random()), 'minutes').format(),
      fields: [
        {
          // id: '_sleep_quality',
          // title: 'Quality',
          // type: 'rank_stars',
          // value: 4.0
        // }, {
          id: '_sleep_duration1',
          title: 'Duration1',
          type: 'duration_minutes',
          value: 600
        }, {
          id: '_sleep_duration2',
          title: 'Duration2',
          type: 'duration_minutes',
          value: 500
        }, {
          id: '_sleep_duration3',
          title: 'Duration3',
          type: 'duration_minutes',
          value: 400
        }
      ],
      views: {
        row_show: ['_sleep_duration', '_sleep_quality', '_sleep_duration1', '_sleep_duration2', '_sleep_duration3']
      }
    }, {
      id: uuid.v4(),
      title: 'Headache',
      time: moment().subtract(4, 'days').subtract(Math.round(1000 * Math.random()), 'minutes').format(),
      fields: [
        {
          id: '_headache_duration',
          title: 'Duration',
          type: 'duration_minutes',
          value: 15
        }, {
          id: '_headache_intensity',
          title: 'Intensity',
          type: 'scale',
          options: {
            min: 1,
            max: 10
          },
          value: 7
        }, {
          id: '_headache_pain_areas',
          title: 'Pain Areas',
          type: 'checkbox',
          options: {
            max: 3,
            options: [
              'Head',
              'Behind the eye',
              'Neck',
              'Back of the head'
            ]
          },
          value: ['Behind the eye', 'Neck']
        }
      ],
      views: {
        row_show: ['_headache_pain_areas', '_headache_duration']
      }
    }
  ]
}
// _events.data = []
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
          } else if (t.type === 'DELETE') {
            const index =  _.findIndex(_events.data, { id: t.event.id })
            _events.data.splice(index, 1)
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
