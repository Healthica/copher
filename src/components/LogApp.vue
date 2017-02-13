<template>
  <div>
    Log
    <el-button @click="addEvent">Add Event</el-button>
    <ul>
      <li v-for="e in events.data">{{ e.id }} - {{ e.title }}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['events'])
  },
  methods: {
    addEvent() {
      this.$store.dispatch('addEvent', { id: 'r4nd0m', title: 'New Event Title'})
    }
  },
  created() {
    this.$store.dispatch('syncEvents')
  }
}
</script>

<style scoped>
</style>
