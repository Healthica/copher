<template>
  <li class="event-row" @click="onEventClick">
    <span class="event-time">{{ eventTime }}</span>
    <span class="event-title">{{ event.title }}</span>
    <field-view class="event-field" v-for="f in event.fields" :key="f.id" :field="f" view="row" v-if="should_display(f)"></field-view>
    <span class="event-field event-duplicate" @click.stop="duplicateEvent">Copy</span>
  </li>
</template>

<script>
import moment from 'moment'
import FieldView from './FieldView'

export default {
  props: ['event', 'clickHandler'],
  components: {
    FieldView
  },
  computed: {
    eventTime() {
      if (!this.event || !this.event.time) {
        return ''
      }
      return moment(this.event.time).format('hh:mma')
    }
  },
  methods: {
    onEventClick(e) {
      this.clickHandler(this.event.id)
    },
    should_display(field) {
      return true
      if (!this.event.views.row_show) {
        return false
      } else {
        return _.indexOf(this.event.views.row_show, field.id) > -1
      }
    },
    duplicateEvent(e) {
      this.$emit('duplicateEvent', _.cloneDeep(this.event))
    }
  }
}
</script>

<style scoped>
.event-row {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 60px;
  font-size: 14px;
  line-height: 60px;
  background-color: #fff;
  box-shadow: inset 0 -1px 0 0 #E2E4E6;
  padding-left: 36px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
}
.event-row:hover {
  background-color: #FDFAE5;
}
.event-time, .event-field {
  margin-right: 18px;
}
.event-time {
  color: #A5ACB0;
}
.event-row:hover .event-time {
  color: #D9B51C;
}
.event-title {
  margin-right: 30px;
}
.event-field {
  color: #838C91;
}
.event-row:not(:hover) .event-field {
  display: none;
}
.event-duplicate {
  padding: auto 24px;
  margin-left: auto;
}
.event-duplicate:hover {
  color: #0C3953;
}
</style>
