<template>
  <speed-dial :items="quick_events" @open="open"></speed-dial>
</template>

<script>
import { mapGetters } from 'vuex'
import uuid from 'uuid'
import moment from 'moment'
import SpeedDial from '../Utils/SpeedDial'

export default {
  components: {
    SpeedDial
  },
  computed: {
    ...mapGetters(['events'])
  },
  methods: {
    open(event) {
      this.is_open = false
      const _id = uuid.v4()
      const newEvent = {
        id: _id,
        title: event.title,
        time: moment().format(),
        fields: []
      }
      let last_event = this.findLastEvent(event.title)
      if (event.use_last === true && last_event) {
        _.each(last_event.fields, f => {
          newEvent.fields.push(Object.assign(_.cloneDeep(f), {
            id: uuid.v4()
          }))
        })
      } else {
        _.each(event.fields, f => {
          newEvent.fields.push(Object.assign({
            id: uuid.v4()
          }, f))
        })
      }
      this.$store.dispatch('addEvent', newEvent)
      this.$emit('showEditEventModal', _id)
    },
    findLastEvent(title) {
      return _.maxBy(_.filter(this.events.data, e => e.title === title), e => moment(e.time).valueOf())
    }
  },
  data() {
    return {
      is_open: false,
      quick_events: [
        {
          title: 'New Event',
          color: 'primary',
          icon: 'plus',
          data: false
        }, {
          title: 'Log Weight',
          color: 'red',
          icon: 'weight-scale',
          data: {
            title: 'Weight Measurement',
            use_last: true,
            fields: [{
              title: 'Weight',
              type: 'weight',
              value: '70',
              options: {
                units: 'Kilogram'
              }
            }]
          }
        }, {
          title: 'Workout',
          color: 'orange',
          icon: 'dumbbell',
          data: {
            title: 'Workout',
            fields: [{
              title: 'Duration',
              type: 'duration',
              value: 0
            }, {
              title: 'Type',
              type: 'select',
              value: '',
              options: {
                options: [
                  'Aerobics',
                  'Weight Lifting'
                ]
              }
            }, {
              title: 'Calories',
              type: 'units',
              value: 0,
              options: {
                units: 'Calories'
              }
            }]
          }
        }, {
          title: 'Sleep',
          color: 'primary',
          icon: 'moon',
          data: {
            use_last: true,
            title: 'Sleep',
            fields: [{
              title: 'Duration',
              type: 'duration',
              value: 420
            }, {
              title: 'Fall Asleep',
              type: 'duration',
              value: 20
            }, {
              title: 'Quality',
              type: 'rank_stars',
              value: 3
            }]
          }
        }, {
          title: 'Food',
          color: 'green',
          icon: 'food',
          data: {
            title: 'Food',
            fields: [{
              title: 'Calories',
              type: 'units',
              value: 0,
              options: {
                units: 'Calories'
              }
            }, {
              title: 'Protein',
              type: 'weight',
              value: 0,
              options: {
                units: 'Gram'
              }
            }, {
              title: 'Fat',
              type: 'weight',
              value: 0,
              options: {
                units: 'Gram'
              }
            }, {
              title: 'Carbohydrates',
              type: 'weight',
              value: 0,
              options: {
                units: 'Gram'
              }
            }]
          }
        }
      ]
    }
  }
}
</script>

<style>
</style>
