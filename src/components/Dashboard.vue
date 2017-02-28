<template>
  <div class="dashboard">
    <el-button @click="addNewChart" class="new-chart-btn" type="success">Create New Chart</el-button>
    <div class="charts-list">
      <el-card class="chart-card" v-for="(c, i) in dashboard.charts">
        <div slot="header" class="header clearfix">
          <span @click="chartZoomin(c, i)">
            {{ c.title }}
          </span>
          <el-dropdown class="chart-dropdown" trigger="click" @command="dropdownSelect">
            <span class="el-dropdown-link">
              <el-button class="chart-dropdown-trigger" type="text"><i class="el-icon-more"></i></el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="'edit-' + i">Edit</el-dropdown-item>
              <el-dropdown-item :command="'duplicate-' + i">Duplicate</el-dropdown-item>
              <el-dropdown-item :command="'delete-' + i">Delete</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <events-chart :events="events.data" :options="c" view="preview" @zoom="chartZoomin(c, i)"></events-chart>
      </el-card>
    </div>
    <el-dialog v-model="chartEditModalVisible" size="tiny">
      <el-form label-width="100px" label-position="left">
        <el-form-item label="Title">
          <el-input v-model="chosenChartCopy.title"></el-input>
        </el-form-item>
        <el-form-item label="Chart Type">
          <el-select v-model="chosenChartCopy.type">
            <el-option label="Line" value="line"></el-option>
            <el-option label="Bar" value="bar"></el-option>
            <el-option label="Histogram" value="histogram"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Group By">
          <el-select v-model="chosenChartCopy.group_by">
            <el-option label="Hour" value="hour"></el-option>
            <el-option label="Day" value="day"></el-option>
            <el-option label="Week" value="week"></el-option>
            <el-option label="Month" value="month"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Group Value">
          <el-select v-model="chosenChartCopy.group_value">
            <el-option label="Sum" value="sum"></el-option>
            <el-option label="Average" value="average"></el-option>
            <el-option label="Median" value="median"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Span">
          <el-input v-model="chosenChartCopy.range">
            <template slot="append">{{ chosenChartCopy.group_by }}s</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Datasets">
          <div v-for="(d, m) in chosenChartCopy.datasets" class="chart-edit-dataset-item">
            <el-input v-model="d.label"><template slot="prepend">Label</template></el-input>
            <el-input v-model="d.event_match"><template slot="prepend">Event</template></el-input>
            <el-input v-model="d.field_match"><template slot="prepend">Field</template></el-input>
            <el-button class="chart-delete-dataset-btn el-button--link" icon="close" size="mini" @click="deleteDataset(m)">Delete</el-button>
          </div>
          <el-button class="chart-add-dataset-btn el-button--link" icon="plus" size="mini" @click="addDataset">Add Dataset</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="chartEditModalVisible = false">Cancel</el-button>
        <el-button type="primary" @click="saveChartChanges">Save</el-button>
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
    ...mapGetters(['dashboard', 'events'])
  },
  methods: {
    addNewChart() {
      this.$store.dispatch('addChart').then(() => {
        this.chartZoomin(this.dashboard.charts[0])
      })
    },
    chartZoomin(chart, index) {
      this.chartEditId = parseInt(index, 10)
      this.chosenChartCopy = _.cloneDeep(chart)
      this.chartEditModalVisible = true
    },
    dropdownSelect(command, chart) {
      const matches = command.match(/^(.*)-(\d)+$/)
      const index = parseInt(matches[2], 10)
      if (matches[1] === 'edit') {
        this.chartZoomin(this.dashboard.charts[index], index)
      } else if (matches[1] === 'delete') {
        this.$confirm('This will permenantly remove the chart. Continue?', 'Warning', {
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('deleteChart', index)
        }).catch(()=>{})
      } else if (matches[1] === 'duplicate') {
        this.$store.dispatch('addChart', _.cloneDeep(this.dashboard.charts[index])).then(() => {
          this.chartZoomin(this.dashboard.charts[0])
        })
      } else {
        console.error('Unknown chart command', command)
      }
    },
    addDataset() {
      this.chosenChartCopy.datasets.push({
        label: '',
        event_match: '',
        field_match: ''
      })
    },
    deleteDataset(n) {
      this.chosenChartCopy.datasets.splice(n, 1)
    },
    saveChartChanges() {
      this.$store.dispatch('updateChart', {
        index: this.chartEditId,
        chart: this.chosenChartCopy
      }).then(() => {
        this.chartEditModalVisible = false
      })
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

<style>
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
.chart-edit-dataset-item {
  margin-bottom: 36px;
}
.chart-edit-dataset-item .el-input-group__prepend {
  min-width: 60px;
}
.chart-edit-dataset-item > .el-input:nth-child(2) {
  position: relative;
  top: -1px;
}
.chart-edit-dataset-item > .el-input:nth-child(3) {
  position: relative;
  top: -2px;
}
.chart-edit-dataset-item > .el-input:not(:first-of-type) .el-input-group__prepend {
  border-top-left-radius: 0;
}
.chart-edit-dataset-item > .el-input:not(:first-of-type) .el-input__inner {
  border-top-right-radius: 0;
}
.chart-edit-dataset-item > .el-input:not(:last-of-type) .el-input-group__prepend {
  border-bottom-left-radius: 0;
}
.chart-edit-dataset-item > .el-input:not(:last-of-type) .el-input__inner {
  border-bottom-right-radius: 0;
}
.chart-delete-dataset-btn {
  float: right;
}
.chart-add-dataset-btn, .chart-delete-dataset-btn {
  font-size: 12px;
}
.chart-add-dataset-btn i, .chart-delete-dataset-btn i {
  font-size: 8px;
  position: relative;
  top: -1px;
}
</style>
