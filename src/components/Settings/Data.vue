<template>
  <div class="settings-section">
    <h2 class="text-light">Download Your Data</h2>
    <el-form label-width="120px">
      <el-checkbox-group v-model="fields">
        <el-checkbox label="Events"></el-checkbox>
        <el-checkbox label="Charts"></el-checkbox>
        <el-checkbox label="Settings"></el-checkbox>
      </el-checkbox-group>
    </el-form>
    <el-button type="default" @click="onDownload">Download</el-button>
    <iframe ref="download_iframe" style="display:none;"></iframe>
  </div>
</template>

<script>
import userAPI from '../../api/user'

export default {
  data() {
    return {
      fields: []
    }
  },
  methods: {
    onDownload() {
      const url = userAPI.downloadDataUrl({ fields: this.fields })
      this.$refs['download_iframe'].src = url
    }
  }
}
</script>

<style>
</style>
