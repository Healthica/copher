<template>
  <div class="dashboard">
    <div>Dashboard</div>
    <div v-for="c in dashboard.charts">
      <events-chart v-if="c.type === 'line'" :events="events.data" :options="c"></events-chart>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EventsChart from './Charts/EventsChart'
export default {
  components: { EventsChart },
  computed: {
    ...mapGetters(['dashboard', 'events'])
  }
}
</script>

<style scoped>
.dashboard {
  height: 100%;
  overflow-y: scroll;
}
</style>
