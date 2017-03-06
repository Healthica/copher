<template>
  <div class="settings">
    <profile></profile>
    <data-download></data-download>
  </div>
</template>

<script>
import Profile from './Settings/Profile'
import DataDownload from './Settings/DataDownload'

export default {
  components: { Profile, DataDownload }
}
</script>

<style>
.settings {
  min-height: 100%;
  overflow-y: scroll;
  background-color: #F8F9F9;
  padding: 24px;
}
.settings-section {
  max-width: 450px;
  margin-bottom: 90px;
}
</style>
