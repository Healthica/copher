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
        title: 'Coffee Sugar vs Taste',
        type: 'line', // line/bar/histogram
        group_by: 'day', // none/hour/day/week/month
        group_value: 'average', // sum/average/median
        range: 7, // * group_by
        datasets: [
          {
            label: 'Sugar',
            event_match: 'coffee',
            field_match: 'sugar'
          }, {
            label: 'Taste',
            event_match: 'coffee',
            field_match: 'taste'
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
