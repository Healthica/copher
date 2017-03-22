<template>
  <div class="quick-add" @mouseover="checkOpen" @mouseout="checkOpen" ref="quickAdd">
    <quick-add-item icon="plus" color="primary" @open="open" :data="false">New Event</quick-add-item>
    <quick-add-item v-for="e in quick_events" v-if="is_open" size="small" @open="open"
      :data="e.data" :icon="e.icon" :color="e.color">{{ e.title }}</quick-add-item>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import uuid from 'uuid'
import moment from 'moment'
import QuickAddItem from './QuickAddItem'

export default {
  components: {
    QuickAddItem
  },
  computed: {
    ...mapGetters(['events'])
  },
  methods: {
    checkOpen() {
      const el = this.$refs.quickAdd
      this.is_open = el.parentElement.querySelector(':hover') === el
    },
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
          title: 'Log Weight',
          color: 'red',
          icon: 'time',
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
        }
      ]
    }
  }
}
</script>

<style>
.quick-add {
  display: flex;
  flex-direction: column-reverse;
  padding: 20px;
  align-items: center;
}
.quick-add > * {
  margin-top: 8px;
}
</style>
