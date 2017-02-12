<template>
  <div id="app">
    <side-bar class="left-nav" :default-active="page" v-on:changePage="changePage"></side-bar>
    <div class="right-pane">
      <div class="right-pane-inner">
        <log-app v-if="page === 'log-app'"></log-app>
        <dashboard v-if="page === 'dashboard'"></dashboard>
        <settings v-if="page === 'settings'"></settings>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from './components/SideBar'
import LogApp from './components/LogApp'
import Dashboard from './components/Dashboard'
import Settings from './components/Settings'

export default {
  name: 'app',
  components: {
    SideBar,
    LogApp,
    Dashboard,
    Settings
  },
  data() {
    return {
      page: 'log-app'
    }
  },
  methods: {
    changePage(newPage) {
      this.page = newPage
    }
  }
}
</script>

<style>
html, body {
  font-family: Helvetica, Arial, sans-serif;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
#app {
  margin: 0;
  height: 100%;
}
.left-nav {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 180px;
  height: 100%;
}
.right-pane {
  margin-left: 180px;
  height: 100%;
}
.right-pane-inner {
  position: relative;
  width: 100%;
  min-height: 100%;
  background-color: #EDEFF4;
}
</style>
