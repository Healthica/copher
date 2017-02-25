<template>
  <div class="dashboard">
    <div>Dashboard</div>
    <events-chart :events="events" :options="options"></events-chart>
  </div>
</template>

<script>
import EventsChart from './Charts/EventsChart'
export default {
  components: { EventsChart },
  computed: {
    events(state) {
      return state.$store.getters.events.data
    },
    options() {
      return {
        type: 'line', // line/bar/histogram
        group_by: 'day', // hour/day/week/month
        group_value: 'sum', // sum/average/median
        datasets: [
          {
            label: 'Coffee',
            event_match: 'coffee'
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
.dashboard {
  height: 100%;
  overflow-y: scroll;
}
</style>
