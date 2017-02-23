<template>
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
    <el-button class="save-button" @click="newEventSubmit" type="success">Save</el-button>
    <div v-if="showSuggestions" class="newEventSuggestions">
      <div v-for="(s, i) in newEventTextSuggestionsCache.suggestions"
        class="newEventSuggestionsItem"
        :class="{active:s.active}"
        @mouseover="suggestionsSet(i)" @click="newEventSubmit">
        {{ s.latest.title }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import uuid from 'uuid/v4'
import moment from 'moment'
import NewEventParser from './NewEventParser'
import _sortBy from 'lodash/sortBy'
import _each from 'lodash/each'
import _groupBy from 'lodash/groupBy'
import _filter from 'lodash/filter'
import _orderBy from 'lodash/orderBy'
import _map from 'lodash/map'
import _pick from 'lodash/pick'
import _maxBy from 'lodash/maxBy'
import _take from 'lodash/take'
import _findIndex from 'lodash/findIndex'
import _find from 'lodash/find'
import _cloneDeep from 'lodash/cloneDeep'

export default {
  data() {
    return {
      newEventText: '',
      newEventInputIsFocused: false,
      newEventTextSuggestionsCache: { query: '', suggestions: [] }
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
    },
    showSuggestions(state) {
      return state.newEventInputIsFocused && state.newEventTextSuggestionsCache.suggestions.length > 0
    }
  },
  methods: {
    addEvent(ev) {
      if (this.newEventText.length === 0) {
        return
      }
      const _id = uuid()
      const newEvent = Object.assign({
        id: _id,
        title: this.newEventText,
        time: moment().format(),
        fields: []
      }, NewEventParser(this.newEventText))
      this.$store.dispatch('addEvent', newEvent)
      this.newEventText = ''
      this.$refs['newEventInput'].blur()
      if (ev.ctrlKey) {
        this.$emit('showEditEventModal', _id)
      }
    },
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
      const matches = _groupBy(_filter(this.events.data, e => e.title.startsWith(this.newEventText)), 'title')
      const suggestions = _orderBy(_map(matches, e => {
        return {
          count: e.length,
          latest: _pick(_maxBy(e, e => moment(e.time).valueOf()), ['id', 'title', 'time']),
          active: false
        }
      }), 'count', ['desc'])
      const topSuggestions = _take(suggestions, 5)
      this.newEventTextSuggestionsCache.suggestions = topSuggestions
      return topSuggestions
    },
    newEventSubmit(ev) {
      const suggestions = this.newEventTextSuggestionsCache.suggestions
      const i = _findIndex(suggestions, { active: true })
      if (i === -1) {
        this.addEvent(ev)
      } else {
        // Duplicate
        const id = suggestions[i].latest.id
        const event = _find(this.events.data, e => e.id === id)
        this.$emit('duplicateEvent', _cloneDeep(event))
        this.newEventText = ''
        this.$refs['newEventInput'].blur()
      }
    },
    suggestionsUp(ev) {
      ev.preventDefault()
      const suggestions = this.newEventTextSuggestionsCache.suggestions
      const i = _findIndex(suggestions, { active: true })
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
      const i = _findIndex(suggestions, { active: true })
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
    suggestionsSet(index) {
      const suggestions = this.newEventTextSuggestionsCache.suggestions
      const i = _findIndex(suggestions, { active: true })
      if (i > -1) {
        suggestions[i].active = false
      }
      suggestions[index].active = true
    },
    newEventTextFocus() {
      this.newEventInputIsFocused = true
    },
    newEventTextUnfocus() {
      // Clicking on a suggestions triggers blur() before handling the click event
      window.setTimeout(() => {
        if (this.$refs['newEventInput'] !== document.activeElement) {
          this.newEventInputIsFocused = false
          this.calcSuggestions()
        }
      }, 150)
    }
  }
}
</script>

<style scoped>
.new-event-container {
  position: fixed;
  z-index: 900;
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

</style>
