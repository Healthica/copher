<template>
  <div class="dashboard">
    <div class="charts-list">
      <el-card class="chart-card" v-for="c in dashboard.charts">
        <div slot="header" class="header clearfix">
          <span>
            {{ c.title }}
          </span>
          <el-dropdown class="chart-dropdown" trigger="click">
            <span class="el-dropdown-link">
              <el-button class="chart-dropdown-trigger" type="text"><i class="el-icon-more"></i></el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>Edit</el-dropdown-item>
              <el-dropdown-item>Delete</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <events-chart :events="events.data" :options="c" view="preview"></events-chart>
      </el-card>
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
  background-color: #EDEFF4;
}
.charts-list {
  display: flex;
  flex-wrap: wrap;
}
.chart-card {
  max-width: 300px;
  margin: 18px 12px;
  font-size: 12px;
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
