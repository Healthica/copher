<template>
  <div class="log-app">
    <div class="new-event-container">
      <input type="text"
        v-model="newEventText"
        @keyup.enter="newEventSubmit"
        @keyup="calcSuggestions"
        @keydown.up.prevent="suggestionsUp"
        @keydown.down.prevent="suggestionsDown"
        @focus="newEventTextFocus"
        @blur="newEventTextUnfocus"
        class="new-event-input"
        placeholder="What would you like to log?"
        tabindex="1"
        ref="newEventInput"
        />
      <!-- <el-button class="edit-button" @click="editEvent" type="default">+</el-button> -->
      <el-button class="save-button" @click="addEvent" type="success">Save</el-button>
      <div v-if="showSuggestions" class="newEventSuggestions">
        <div v-for="s in newEventTextSuggestionsCache.suggestions" class="newEventSuggestionsItem" :class="{active:s.active}">
          {{ s.latest.title }}
        </div>
      </div>
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
      <event-row v-for="e in day.events" :event="e" :clickHandler="showEditEventModal" @duplicateEvent="duplicateEvent"></event-row>
    </ul>
    <el-dialog custom-class="eventModal" v-model="eventModalVisible" @close="onCloseEditEventModal" size="large">
      <event-edit-modal :event="eventCopy" @close="closeEditEventModal" @duplicateEvent="duplicateEvent"></event-edit-modal>
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
      newEventInputIsFocused: false,
      newEventTextSuggestionsCache: { query: '', suggestions: [] },
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
    },
    showSuggestions(state) {
      return true
      return state.newEventInputIsFocused && state.newEventTextSuggestionsCache.suggestions.length > 0
    }
  },
  methods: {
    calcSuggestions() {
      if (this.newEventText === this.newEventTextSuggestionsCache.query) {
        return
      } else if (this.newEventText.length === 0) {
        this.newEventTextSuggestionsCache = {
          query: '',
          suggestions: []
        }
        return
      }
      this.newEventTextSuggestionsCache.query = this.newEventText
      //TODO improve performance on big number of events, and use something better than startsWith()
      const matches = _.groupBy(_.filter(this.events.data, e => e.title.startsWith(this.newEventText)), 'title')
      const suggestions = _.orderBy(_.map(matches, e => {
        return {
          count: e.length,
          latest: _.pick(_.maxBy(e, moment(e.time)), ['id', 'title', 'time']),
          active: false
        }
      }), 'count', ['desc'])
      const topSuggestions = _.take(suggestions, 5)
      this.newEventTextSuggestionsCache.suggestions = topSuggestions
      return topSuggestions
    },
    newEventSubmit(ev) {
      const suggestions = this.newEventTextSuggestionsCache.suggestions
      const i = _.findIndex(suggestions, { active: true })
      if (i === -1) {
        this.addEvent(ev)
      } else {
        // Duplicate
        const id = suggestions[i].latest.id
        const event = _.find(this.events.data, e => e.id === id)
        this.duplicateEvent(_.cloneDeep(event))
        this.newEventText = ''
        this.$refs['newEventInput'].blur()
      }
    },
    suggestionsUp(ev) {
      ev.preventDefault()
      const suggestions = this.newEventTextSuggestionsCache.suggestions
      const i = _.findIndex(suggestions, { active: true })
      if (i === -1) {
        suggestions[suggestions.length - 1].active = true
      } else if (i === 0) {
        suggestions[i].active = false
        suggestions[suggestions.length - 1].active = true
      } else {
        suggestions[i].active = false
        suggestions[i - 1].active = true
      }
    },
    suggestionsDown() {
      const suggestions = this.newEventTextSuggestionsCache.suggestions
      const i = _.findIndex(suggestions, { active: true })
      if (i === -1) {
        suggestions[0].active = true
      } else if (i === suggestions.length - 1) {
        suggestions[i].active = false
        suggestions[0].active = true
      } else {
        suggestions[i].active = false
        suggestions[i + 1].active = true
      }
    },
    newEventTextFocus() {
      this.newEventInputIsFocused = true
    },
    newEventTextUnfocus() {
      this.newEventText = ''
      this.newEventInputIsFocused = false
      this.calcSuggestions()
    },
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
      this.$refs['newEventInput'].blur()
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
      if (this.eventCopy._isDeleted !== true) {
        this.$store.dispatch('updateEventAddTransaction', _.cloneDeep(this.eventCopy))
      }
    },
    onChangeEventField(e) {
      this.$store.dispatch('setEvent', e)
    },
    duplicateEvent(e) {
      const _id = uuid.v4()
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
.newEventSuggestions {
  position: absolute;
  top: 68px;
  left: 0;
  min-width: 200px;
  background-color: #fff;
  box-shadow: 0 3px 5px 0 rgba(0,0,0,.1);
}
.newEventSuggestionsItem {
  padding: 12px 12px 12px 36px;
}
.newEventSuggestionsItem.active {
  background-color: #298FCA;
  color: #fff;
  cursor: pointer;
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
