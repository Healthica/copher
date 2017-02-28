<template>
  <div class="dashboard">
    <el-button @click="addNewChart" class="new-chart-btn" type="success">Create New Chart</el-button>
    <div class="charts-list">
      <el-card class="chart-card" v-for="(c, i) in dashboard.charts">
        <div slot="header" class="header clearfix">
          <span @click="chartZoomin(c)">
            {{ c.title }}
          </span>
          <el-dropdown class="chart-dropdown" trigger="click" @command="dropdownSelect">
            <span class="el-dropdown-link">
              <el-button class="chart-dropdown-trigger" type="text"><i class="el-icon-more"></i></el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="edit">Edit</el-dropdown-item>
              <el-dropdown-item command="duplicate">Duplicate</el-dropdown-item>
              <el-dropdown-item :command="'delete-' + i">Delete</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <events-chart :events="events.data" :options="c" view="preview" @zoom="chartZoomin(c)"></events-chart>
      </el-card>
    </div>
    <el-dialog v-model="chartEditModalVisible" size="tiny">
      Title <el-input v-model="chosenChartCopy.title"></el-input>
      type <el-input v-model="chosenChartCopy.type"></el-input>
      group_by <el-input v-model="chosenChartCopy.group_by"></el-input>
      group_value <el-input v-model="chosenChartCopy.group_value"></el-input>
      range <el-input v-model="chosenChartCopy.range"></el-input>
      {{ chosenChartCopy.datasets }}
      <span slot="footer" class="dialog-footer">
        <el-button @click="chartEditModalVisible = false">Cancel</el-button>
        <el-button type="primary" @click="chartEditModalVisible = false">Save</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EventsChart from './Charts/EventsChart'
export default {
  components: { EventsChart },
  computed: {
    ...mapGetters(['dashboard', 'events']),
    chosenChart() {
      if (this.dashboard.charts[this.chartEditId]) {
        return _.cloneDeep(this.dashboard.charts[this.chartEditId])
      } else {
        return {
          title: '',
          type: 'line',
          group_by: 'day',
          group_value: 'average',
          range: 10,
          datasets: []
        }
      }
    }
  },
  methods: {
    addNewChart() {
      this.$store.dispatch('addEmptyChart').then(() => {
        this.chartZoomin(this.dashboard.charts[0])
      })
    },
    chartZoomin(chart) {
      this.chosenChartCopy = _.cloneDeep(chart)
      this.chartEditModalVisible = true
    },
    dropdownSelect(command, chart) {
      let matches
      if (command === 'edit') {
        this.chartZoomin(chart._self)
      } else if (matches = command.match(/^delete-(\d)+$/)) {
        this.$confirm('This will permenantly remove the chart. Continue?', 'Warning', {
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('deleteChart', parseInt(matches[1], 10))
        }).catch(()=>{})
      } else {
        console.log('command', command)
      }
    }
  },
  data() {
    return {
      chartEditId: null,
      chartEditModalVisible: false,
      chosenChartCopy: {}
    }
  }
}
</script>

<style scoped>
.dashboard {
  height: 100%;
  overflow-y: scroll;
  background-color: #EDEFF4;
}
.new-chart-btn {
  float:right;
  margin: 18px 12px;
}
.charts-list {
  display: flex;
  flex-wrap: wrap;
}
.chart-card {
  max-width: 300px;
  margin: 18px 12px;
  font-size: 12px;
  cursor: zoom-in;
}
.chart-card:hover {
  background-color: #FDFAE5;
}
.chart-card .header {
  font-size: 14px;
}
.chart-card .header > span {
  line-height: 26px;
}
.chart-dropdown {
  float: right;
}
.chart-dropdown-trigger {
  padding: 6px 12px;
}
.chart-dropdown-trigger:not(:hover) {
  color: inherit;
}
</style>
