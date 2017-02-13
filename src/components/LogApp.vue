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
    <ul>
      <li v-for="e in sortedEvents" :title="e.id" @click="showEditEventModal(e.id)">{{ e.title }} - {{ timeFromNow(e.time) }}</li>
    </ul>
    <el-dialog :title="eventCopy.title" v-model="eventModalVisible" @close="onCloseEditEventModal">
      {{ eventCopy.id }}
      <p>
        <input type="text" v-model="eventCopy.title" />
      </p>
      <p>
        {{ eventCopy.time }}
      </p>
    </el-dialog>
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
      eventModalVisible: false,
      eventCopy: {},
      eventCopyUnwatcher: null
    }
  },
  computed: {
    ...mapGetters(['events']),
    sortedEvents(state) {
      return _.sortBy(state.events.data, [ o => -moment(o.time).valueOf() ])
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
        time: moment().format()
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
    timeFromNow(time) {
      return moment(time).fromNow()
    },
    openEditEventModal() {
      this.eventModalVisible = true
      this.eventCopyUnwatcher = this.$watch('eventCopy', this.onChangeEventField, { deep: true })
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
  padding-top: 68px;
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
  height: 68px;
  line-height: 68px;
  padding: 0 10px 0 30px;
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
  margin-right: 15px;
}
.edit-button {
  margin-right: 15px;
}
</style>
