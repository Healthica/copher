<template>
  <div class="settings">
    <profile></profile>
    <data-section></data-section>
  </div>
</template>

<script>
import Profile from './Settings/Profile'
import DataSection from './Settings/Data'

export default {
  components: { Profile, DataSection }
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
