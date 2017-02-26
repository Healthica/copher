<template>
  <div class="">
    <line-chart v-if="options.type === 'line'" :chartData="eventsData"></line-chart>
    <div v-else> Unknown {{ options.type }}</div>
  </div>
</template>

<script>
import LineChart from './LineChart'
import _ from 'lodash'
import moment from 'moment'

export default {
  props: ['events', 'options'],
  components: { LineChart },
  computed: {
    eventsData() {
      const datasets = {}
      const colors = ['#f87979', '#79f879', '#7979f8']
      _.each(this.options.datasets, (d, i) => { datasets[d.label] = {
        label: d.label,
        borderColor: colors[i % colors.length],
        fill: false,
        data: []
      }})
      // Find matching events/fields
      _.each(this.events, e => {
        _.each(this.options.datasets, d => {
          if (e.title.match(new RegExp(d.event_match, 'i'))) {
            _.each(e.fields, f => {
              if (f.title.match(new RegExp(d.field_match, 'i'))) {
                const bucket = this.findLabelBucket(e.time)
                if (!datasets[d.label].data[bucket]) {
                  datasets[d.label].data[bucket] = []
                }
                datasets[d.label].data[bucket].push(f.value)
              }
            })
          }
        })
      })
      // Reduce events to a single value for each bucket
      _.each(datasets, (item, k) => {
        _.each(item.data, (bucket, b) => {
          if (bucket === undefined) {
            // Bucket with no items in it
            datasets[k].data[b] = 0
          } else {
            if (this.options.group_value === 'sum') {
              datasets[k].data[b] = _.reduce(bucket, (sum, n) => { return sum + n }, 0 ).toFixed(1)
            } else {
              // Average
              datasets[k].data[b] = (_.reduce(bucket, (sum, n) => { return sum + n }, 0 ) / (bucket.length || 1)).toFixed(1)
            }
          }
        })
      })
      return {
        labels: this.labels,
        datasets: _.values(datasets)
      }
    },
    labels() {
      let fn
      switch (this.options.group_by) {
        case 'month':
          fn = n => {
            return moment().subtract(this.options.range - n, 'months').format('MMM')
          }
          break;
        case 'week':
          fn = n => {
            return moment().subtract(this.options.range - n, 'weeks').format('w')
          }
          break;
        case 'hour':
          fn = n => {
            return moment().subtract(this.options.range - n, 'hours').format('HH:00')
          }
          break;
        case 'day':
        default:
          fn = n => {
            return moment().subtract(this.options.range - n, 'days').format('D')
          }
      }
      return _.times(this.options.range, fn)
    }
  },
  methods: {
    findLabelBucket(date) {
      const units = {
        hour: 'hours',
        day: 'days',
        week: 'weeks',
        month: 'months'
      }
      return this.options.range - 1 - moment().diff(moment(date), units[this.options.group_by] || 'days')
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
