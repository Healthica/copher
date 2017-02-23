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
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 300;
  src: local('Open Sans Light'), local('OpenSans-Light'), url(/static/open-sans-latin-300.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
}
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  src: local('Open Sans'), local('OpenSans'), url(/static/open-sans-latin-400.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
}
html, body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
*, :after, :before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
html, body, input, textarea, button, select {
  font-family: 'Open Sans', sans-serif;
}
#app {
  margin: 0;
  height: 100%;
  color: #4D4D4D;
}
.text-light {
  font-weight: 300;
  letter-spacing: 1px;
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
  height: 100%;
  background-color: #EDEFF4;
  overflow: hidden;
}

.el-button--link {
  border: 0 solid transparent;
}

.popover-no-padding {
  padding: 0;
}

.el-dialog--tiny {
  min-width: 360px;
}

@media screen and (max-width: 480px) {
  .el-dialog--tiny {
    min-width: initial;
    width: 100%;
  }
}
.el-dialog--tiny .el-checkbox-group {
  margin-left: 26px;
}
.el-dialog--tiny .el-checkbox__input {
  position: absolute;
  left: -26px;
}
.el-dialog--tiny .el-checkbox {
  white-space: normal;
  line-height: 20px;
}
.el-dialog--tiny .el-checkbox__label {
  padding-left: 0;
}

.eventModal .el-dialog__header {
  display: none;
}
.eventModal .el-dialog__body {
  padding: 0;
}
.eventModal .el-checkbox-group {
  display: flex;
  flex-wrap: wrap;
}
.eventModal .el-checkbox {
  margin: 0 18px 12px 0;
  margin-left: 0;
}

.event-row-field {
  display: inline-block;
  position: relative;
  color: #BD903C;
}
.event-row-field-header {
  font-size: 10px;
  line-height: 10px;
  position: absolute;
  top: 7px;
  left: 50%;
  transform: translateX(-50%);
  color: #CCA42B;
}

.eventModal {
  max-width: 600px;
}
.eventModalTitle {
  font-size: 18px;
}
.eventModalTitle input:not(:focus) {
  border: 1px solid transparent;
}
.event-modal-field {
  display: flex;
  margin: 24px 0;
}
.event-modal-field-header {
  font-weight: bold;
  width: 120px;
  flex: 0 1 auto;
}
.event-modal-field-content {
  flex: 1 1 0%;
}
@media screen and (max-width: 480px) {
  .event-modal-field {
    flex-direction: column
  }
  .event-modal-field-header {
    width: 100%;
    margin-bottom: 6px;
  }
}

/* UI kit */
.uk-dropdown {
  padding: 12px;
}
a.no-link {
  color: inherit;
  text-decoration: none;
  opacity: 0.8;
}
a.no-link:hover {
  opacity: 1;
}

.checkbox-edit-option-input input {
  padding: 12px 6px;
  height: 24px;
  margin-top: -1px;
}
.checkbox-edit-option input {
  border-radius: 0;
}
.checkbox-edit-option:first-child input {
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
.checkbox-edit-option:last-child input {
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}
</style>
