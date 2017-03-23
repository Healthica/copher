<template>
  <div id="app">
    <side-bar class="left-nav"></side-bar>
    <router-view class="right-pane"></router-view>
  </div>
</template>

<script>
import SideBar from './components/SideBar'

export default {
  name: 'app',
  components: {
    SideBar
  },
  created() {
    this.$store.dispatch('syncEvents')
    window.setInterval(() => {
      if (this.$store.state.events.pause_sync !== true) {
        this.$store.dispatch('syncEvents')
      }
    }, 10000)
  }
}
</script>

<style>
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 300;
  src: local('Open Sans Light'), local('OpenSans-Light'), url(../static/open-sans-latin-300.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
}
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  src: local('Open Sans'), local('OpenSans'), url(../static/open-sans-latin-400.woff2) format('woff2');
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
  transition: none !important;
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
a.no-link {
  cursor: pointer;
  color: inherit;
  text-decoration: none;
  opacity: 0.8;
}
a.no-link:hover {
  opacity: 1;
}
@media screen and (max-width: 768px) {
  .left-nav {
    z-index: 1100;
    left: -182px;
    transition: left 0.1s ease-in-out !important;
    will-change: left;
  }
  .left-nav.open {
    left: 0;
  }
  .right-pane {
    margin-left: 0;
  }
}

.el-button--link {
  border: 0 solid transparent;
}
.el-button i {
  font-size: 0.75em;
  position: relative;
  top: -0.12em;
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

.el-dropdown-menu__item {
  font-size: 14px;
  line-height: 14px;
  padding: 12px;
  min-width: 120px;
}
.el-dropdown-menu__item i {
  margin-right: 6px;
}

.el-card__header, .el-card__body {
  padding: 12px 18px;
}

.event-row-field {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  position: relative;
  color: #BD903C;
  height: 100%;
}
.event-row-field-header {
  font-size: 10px;
  line-height: 10px;
  opacity: 0.5;
}
.event-row-field-value {
  height: 36px;
  line-height: 36px;
}

.eventModal {
  max-width: 600px;
}
.eventModalTitle {
  font-size: 18px;
}
.eventModalTitle input:not(:focus), .eventModalHeader .el-date-editor input:not(:focus) {
  border: 1px solid transparent;
}
.eventModalTitle input:not(:focus):hover, .eventModalHeader .el-date-editor input:not(:focus):hover {
  border: 1px solid #D2D7E5;
}
.eventModalHeader .el-date-editor {
  width: 160px;
}
.eventModalHeader .el-date-editor i {
  display: none;
}
.eventModalHeader .el-date-editor input {
  padding-right: 10px;
}
.event-modal-field {
  display: flex;
  padding: 12px 6px;
}
.event-modal-field-header {
  width: 120px;
  flex: 0 1 auto;
  margin-right: 6px;
}
.event-modal-field-header input:not(:focus) {
  border: 1px solid transparent;
  background: none;
}
.event-modal-field-header input:not(:focus):hover {
  border: 1px solid #D2D7E5;
}
.event-modal-field-header input{
  font-weight: bold;
}
.event-modal-field-content {
  flex: 1 1 0%;
}
.event-field-delete-btn {
  background: none;
  opacity: 0.35;
  padding: 12px;
}
.event-field-delete-btn:hover {
  opacity: 1;
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

.field-options-remove-option-btn {
  background: none;
  float: right;
  opacity: 0.5;
}
.field-options-remove-option-btn:hover {
  opacity: 1;
  color: #6E2F1A;
}
.el-select-dropdown.deleteMode .el-select-dropdown__item:hover {
  background-color: #6E2F1A;
  color: #FBEDEB;
  text-decoration: line-through;
}
.el-select-dropdown .el-select-dropdown__item.selected .field-options-remove-option-btn,
.el-select-dropdown.deleteMode .el-select-dropdown__item.hover .field-options-remove-option-btn {
  color: #fff;
}

.duration-field-container {
  display: flex;
  position: relative;
}
.duration-field-hours-select, .duration-field-minutes-select {
  max-width: 120px;
}
.duration-field-hours-select i, .duration-field-minutes-select i {
  display: none;
}
.duration-field-hours-select input {
  text-align: right;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  padding-right: 10px !important;
  border-right: 0 solid transparent;
}
.duration-field-minutes-select input {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: 0 solid transparent;
  padding-right: 10px !important;
}
.duration-field-container:not(:hover):not(:focus) .duration-field-hours-label,
.duration-field-container:not(:hover):not(:focus) .duration-field-minutes-label {
  display: none;
}
.duration-field-hours-label, .duration-field-minutes-label, .duration-field-separator-label {
  position: absolute;
  height: 100%;
  line-height: 36px;
  pointer-events: none;
}
.duration-field-hours-label, .duration-field-minutes-label {
  font-size: 12px;
  color: #838C91;
}
.duration-field-hours-label {
  left: 10px;
}
.duration-field-minutes-label {
  right: 10px;
}
.duration-field-separator-label {
  left: 50%;
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
