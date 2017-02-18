<template>
  <div class="log-app">
    <div class="new-event-container">
      <input type="text"
        v-model="newEventText"
        @keyup.enter="addEvent"
        class="new-event-input"
        placeholder="What would you like to log?"
        tabindex="1"
        />
      <el-button class="edit-button" @click="editEvent" type="default">+</el-button>
      <el-button class="save-button" @click="addEvent" type="success">Save</el-button>
    </div>
    <ul class="events-day" v-for="day in sortedEvents">
      <li class="events-day-title">
        <el-tooltip v-if="day.title.relative" class="item" effect="light" :content="day.title.relative" placement="top">
          {{ day.title.main }}
        </el-tooltip>
        <div v-else>
          {{ day.title.main }}
        </div>
      </li>
      <event-row v-for="e in day.events" :event="e" :clickHandler="showEditEventModal"></event-row>
    </ul>
    <el-dialog custom-class="eventModal" v-model="eventModalVisible" @close="onCloseEditEventModal" size="large">
      <event-edit-modal :event="eventCopy" @close="closeEditEventModal"></event-edit-modal>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import uuid from 'uuid'
import moment from 'moment'
import EventRow from './Events/EventRow'
import EventEditModal from './Events/EventEditModal'

export default {
  components: {
    EventRow,
    EventEditModal
  },
  data() {
    return {
      newEventText: '',
      eventModalVisible: false,
      eventCopy: {},
      eventCopyUnwatcher: null
    }
  },
  computed: {
    ...mapGetters(['events']),
    sortedEvents(state) {
      const sortedEvents = _.sortBy(state.events.data, [ o => -moment(o.time).valueOf() ])
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
      _.each(sortedEvents, e => {
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
    addEvent(ev, options) {
      if (!options) {
        options = {}
      }
      if (this.newEventText.length === 0 && options.allow_empty !== true && ev.ctrlKey !== true) {
        return
      }
      const _id = uuid.v4()
      this.$store.dispatch('addEvent', {
        id: _id,
        title: this.newEventText,
        time: moment().format(),
        fields: []
      })
      this.$store.dispatch('syncEvents')
      this.newEventText = ''
      if (ev.ctrlKey) {
        this.showEditEventModal(_id)
      }
      return _id
    },
    editEvent(ev) {
      const _id = this.addEvent(ev, { allow_empty: true })
      this.showEditEventModal(_id)
    },
    showEditEventModal(id) {
      this.eventCopy = _.cloneDeep(_.find(this.$store.state.events.data, o => o.id === id))
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
      this.$store.dispatch('updateEventAddTransaction', _.cloneDeep(this.eventCopy))
    },
    onChangeEventField(e) {
      this.$store.dispatch('setEvent', e)
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
.new-event-container {
  position: fixed;
  z-index: 2000;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 68px;
  right: 0;
  top: 0;
  left: 180px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  background: #fff;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,.1);
  min-width: 600px;
}
.new-event-input {
  font-size: 18px;
  width: 100%;
  height: 72px;
  line-height: 72px;
  padding: 0 12px 0 36px;
  border: 0;
  overflow: hidden;
  white-space: nowrap;
  background: 0 0;
}
.new-event-input:focus {
  outline: 0;
  box-shadow: none;
}
.new-event-input:focus::-webkit-input-placeholder { color: transparent; }
.new-event-input:focus:-moz-placeholder { color: transparent; }
.new-event-input:focus::-moz-placeholder { color: transparent; }
.new-event-input:focus:-ms-input-placeholder { color: transparent; }

.save-button {
  margin-right: 18px;
}
.edit-button {
  margin-right: 18px;
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
