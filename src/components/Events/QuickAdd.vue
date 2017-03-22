<template>
  <div class="quick-add" @mouseover="checkOpen" @mouseout="checkOpen" ref="quickAdd">
    <quick-add-item icon="plus" color="primary">New Event</quick-add-item>
    <quick-add-item icon="time" v-if="is_open" color="red" size="small">Log Weight</quick-add-item>
    <quick-add-item icon="date" v-if="is_open" color="green" size="small">Fitness Activity</quick-add-item>
  </div>
</template>

<script>
import QuickAddItem from './QuickAddItem'
export default {
  props: ['events'],
  components: {
    QuickAddItem
  },
  computed: {
  },
  methods: {
    checkOpen() {
      const el = this.$refs.quickAdd
      this.is_open = el.parentElement.querySelector(':hover') === el
    }
  },
  data() {
    return {
      is_open: false
    }
  }
}
</script>

<style>
.quick-add {
  display: flex;
  flex-direction: column-reverse;
  padding: 20px;
  align-items: center;
}
.quick-add > * {
  margin-top: 8px;
}
</style>
