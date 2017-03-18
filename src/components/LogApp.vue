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
      <event-edit-modal :event="eventCopy" @close="closeEditEventModal" @duplicateEvent="duplicateEvent" ref="EventEditModal"></event-edit-modal>
    </el-dialog>
    <el-dialog :custom-class="`onboardingModal ${onboardingModalIndex===0?'hiddenPrev':(onboardingModalIndex===2?'hiddenNext':'')}`" v-model="onboardingModalVisible" @close="closeOnboarding" size="tiny" :close-on-click-modal="false">
      <el-carousel trigger="click" height="500px" :autoplay="false" arrow="always" @change="changeOnboarding" >
        <el-carousel-item>
          <img src="https://d13yacurqjgara.cloudfront.net/users/39185/screenshots/2741760/pi2zza_1x.jpg">
          <h3>Log Everything</h3>
          <p>
            With Veeta you can record any piece of information - just type it and hit Enter
          </p>
        </el-carousel-item>
        <el-carousel-item>
          <img src="https://d13yacurqjgara.cloudfront.net/users/39185/screenshots/2448264/ghost_1x.jpg">
          <h3>Flexible Events</h3>
          <p>
            When viewing an event, everything is editable - add your own fields, and set your own titles
          </p>
        </el-carousel-item>
        <el-carousel-item>
          <img src="https://d13yacurqjgara.cloudfront.net/users/39185/screenshots/3175265/snowman_1x.jpg">
          <h3>Play Around</h3>
          <p>
            Veeta is simple, but powerful. After you get the basics, we highly recommend to watch our Best Practices video.
          </p>
          <el-button type="primary" @click="onboardingModalClose">Okay, let's start!</el-button>
        </el-carousel-item>
        <el-button class="onboardingModalSkip" type="text" @click="onboardingModalClose">Skip</el-button>
      </el-carousel>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import uuid from 'uuid'
import moment from 'moment'
import NewEventInput from './Events/NewEventInput'
import EventRow from './Events/EventRow'
import EventEditModal from './Events/EventEditModal'

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
      eventCopyUnwatcher: null,
      onboardingModalVisible: false,
      onboardingModalIndex: 0
    }
  },
  computed: {
    ...mapGetters(['events', 'user']),
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
    closeOnboarding() {
      this.$store.dispatch('setUser', { show_onboarding: false })
    },
    changeOnboarding(index) {
      this.onboardingModalIndex = index
    },
    onChangeEventField(e) {
      this.$store.dispatch('setEvent', e)
      this.$refs.EventEditModal.blinkSavedText()
    },
    duplicateEvent(e) {
      const _id = uuid.v4()
      this.$store.dispatch('addEvent', Object.assign(e, {
        id: _id,
        time: moment().format()
      }))
      this.$store.dispatch('syncEvents')
      this.showEditEventModal(_id)
    },
    onboardingModalClose(e) {
      this.onboardingModalVisible = false
    }
  },
  watch: {
    eventModalVisible(val) {
      if (val === true) {
        this.$store.dispatch('pauseSync')
      } else {
        this.$store.dispatch('resumeSync')
      }
    }
  },
  mounted() {
    if (this.user.show_onboarding === true) {
      this.onboardingModalVisible = true
    } else {
      this.$store.watch((state) => state.user.show_onboarding, (show_onboarding) => {
        if (show_onboarding === true) {
          this.onboardingModalVisible = true
        }
      })
    }
  }
}
</script>

<style>
.log-app {
  padding-bottom: 1px;
  padding-top: 72px;
  height: 100%;
  overflow-y: scroll;
  background-color: #fff;
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

.onboardingModal {
  text-align: center;
}
.onboardingModal .el-dialog__header {
  display: none;
}
.onboardingModal .el-dialog__body {
  padding: 0;
}
.onboardingModal .el-carousel__item p {
  padding: 0 24px;
}
.onboardingModal.hiddenPrev .el-carousel__arrow--left,
.onboardingModal.hiddenNext .el-carousel__arrow--right {
  display: none;
}
.onboardingModal .el-carousel__item:nth-of-type(1) {
  color: #fff;
  background-color: #0079BF;
}
.onboardingModal .el-carousel__item:nth-of-type(2) {
  color: #fff;
  background-color: #61BD4F;
}
.onboardingModal .el-carousel__item:nth-of-type(3) {
  color: #fff;
  background-color: #A86CC1;
}
.onboardingModal img {
  width: 100%;
  max-height: 270px;
}
.onboardingModalSkip {
  color: #fff;
  opacity: 0.5;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 12px 24px;
}
.onboardingModalSkip:hover {
  opacity: 1;
}
</style>
