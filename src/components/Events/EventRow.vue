<template>
  <li class="event-row" @click="onEventClick">
    {{ event.title }}
  </li>
</template>

<script>
export default {
  props: ['event', 'clickHandler'],
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
