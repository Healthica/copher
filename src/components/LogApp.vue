<template>
  <div class="log-app">
    <new-event-input @showEditEventModal="showEditEventModal" @duplicateEvent="duplicateEvent"></new-event-input>
    <ul class="events-day" v-for="day in sortedEvents">
      <li class="events-day-title">
        <el-tooltip v-if="day.title.relative" class="item" effect="light" :content="day.title.relative" placement="top">
          {{ day.title.main }}
        </el-tooltip>
        <div v-else>
          {{ day.title.main }}
        </div>
      </li>
      <event-row v-for="e in day.events" :event="e" :clickHandler="showEditEventModal" @duplicateEvent="duplicateEvent"></event-row>
    </ul>
    <el-dialog custom-class="eventModal" v-model="eventModalVisible" @close="onCloseEditEventModal" size="large">
      <event-edit-modal :event="eventCopy" @close="closeEditEventModal" @duplicateEvent="duplicateEvent"></event-edit-modal>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import uuid from 'uuid/v4'
import moment from 'moment'
import NewEventInput from './Events/NewEventInput'
import EventRow from './Events/EventRow'
import EventEditModal from './Events/EventEditModal'
import _sortBy from 'lodash/sortBy'
import _each from 'lodash/each'
import _cloneDeep from 'lodash/cloneDeep'
import _find from 'lodash/find'

export default {
  components: {
    NewEventInput,
    EventRow,
    EventEditModal
  },
  data() {
    return {
      eventModalVisible: false,
      eventCopy: {},
      eventCopyUnwatcher: null
    }
  },
  computed: {
    ...mapGetters(['events']),
    sortedEvents(state) {
      const sortedEvents = _sortBy(state.events.data, [ o => -moment(o.time).valueOf() ])
      const days = []
      let day = { i: -1, title: '' }
      const dayFormat = (time) => {
        const mt = moment(time)
        if (moment().isSame(mt, 'd')) {
          return { main: 'Today', relative: null }
        } else if (moment().subtract(1, 'days').isSame(mt, 'd')) {
          return { main: 'Yesterday', relative: null }
        }
        return { main: mt.format('ddd, D MMM'), relative: mt.fromNow() }
      }
      _each(sortedEvents, e => {
        if (day.i === -1 || day.title.main !== dayFormat(e.time).main) {
          day.i++
          day.title = dayFormat(e.time)
          days.push({ title: day.title, events: []})
        }
        days[day.i].events.push(e)
      })
      return days
    }
  },
  methods: {
    showEditEventModal(id) {
      this.eventCopy = _cloneDeep(_find(this.$store.state.events.data, o => o.id === id))
      this.openEditEventModal()
    },
    openEditEventModal() {
      this.eventModalVisible = true
      this.eventCopyUnwatcher = this.$watch('eventCopy', this.onChangeEventField, { deep: true })
    },
    closeEditEventModal() {
      this.eventModalVisible = false
    },
    onCloseEditEventModal() {
      this.eventCopyUnwatcher()
      this.eventCopyUnwatcher = null
      if (this.eventCopy._isDeleted !== true) {
        this.$store.dispatch('updateEventAddTransaction', _cloneDeep(this.eventCopy))
      }
    },
    onChangeEventField(e) {
      this.$store.dispatch('setEvent', e)
    },
    duplicateEvent(e) {
      const _id = uuid()
      this.$store.dispatch('addEvent', Object.assign(e, {
        id: _id,
        time: moment().format()
      }))
      this.$store.dispatch('syncEvents')
      this.showEditEventModal(_id)
    }
  },
  created() {
    this.$store.dispatch('syncEvents')
  }
}
</script>

<style scoped>
.log-app {
  padding-bottom: 1px;
  padding-top: 72px;
  height: 100%;
  overflow-y: scroll;
}
.log-app::-webkit-scrollbar {
  display: none;
}

.events-day {
  list-style: none;
  margin: 0;
  padding: 0;
  margin-bottom: 36px;
}
.events-day-title {
  color: #838FB5;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 18px 36px;
  height: 48px;
  font-size: 16px;
  line-height: 24px;
  box-shadow: inset 0 -1px 0 0 #E2E4E6;
}

.eventModal .el-dialog__header {
  display: none;
}
</style>
