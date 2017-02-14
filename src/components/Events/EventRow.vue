<template>
  <li class="event-row" @click="onEventClick">
    {{ eventTime }}
    {{ event.title }}
  </li>
</template>

<script>
import moment from 'moment'

export default {
  props: ['event', 'clickHandler'],
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
}
.event-row:hover {
  background-color: #FDFAE5;
}
</style>
