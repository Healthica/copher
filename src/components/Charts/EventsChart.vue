<template>
  <div class="">
    <line-chart v-if="options.type === 'line'" :chartData="eventsData"></line-chart>
    <div v-else> Unknown {{ options.type }}</div>
  </div>
</template>

<script>
import LineChart from './LineChart'

export default {
  props: ['events', 'options'],
  components: { LineChart },
  computed: {
    eventsData() {
      return {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Label label',
            backgroundColor: '#f87979',
            data: [10, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
          }
        ]
      }
    }
  },
  data() {
    return {
    }
  }
}

</script>

<style scoped>
</style>
