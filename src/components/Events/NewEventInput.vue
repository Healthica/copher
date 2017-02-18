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
import uuid from 'uuid'
import moment from 'moment'

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
      return state.newEventInputIsFocused && state.newEventTextSuggestionsCache.suggestions.length > 0
    }
  },
  methods: {
    addEvent(ev) {
      if (this.newEventText.length === 0) {
        return
      }
      const _id = uuid.v4()
      this.$store.dispatch('addEvent', {
        id: _id,
        title: this.newEventText,
        time: moment().format(),
        fields: []
      })
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
      const matches = _.groupBy(_.filter(this.events.data, e => e.title.startsWith(this.newEventText)), 'title')
      const suggestions = _.orderBy(_.map(matches, e => {
        return {
          count: e.length,
          latest: _.pick(_.maxBy(e, e => moment(e.time).valueOf()), ['id', 'title', 'time']),
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
        this.$emit('duplicateEvent', _.cloneDeep(event))
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
    suggestionsSet(index) {
      const suggestions = this.newEventTextSuggestionsCache.suggestions
      const i = _.findIndex(suggestions, { active: true })
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

</style>
