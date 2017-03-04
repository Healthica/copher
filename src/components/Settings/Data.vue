<template>
  <div class="settings-section">
    <h2 class="text-light">Download Your Data</h2>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Data Collections">
        <el-checkbox-group v-model="form.data">
          <el-checkbox label="Events"></el-checkbox>
          <el-checkbox label="Charts"></el-checkbox>
          <el-checkbox label="Settings"></el-checkbox>
          <el-checkbox label="Profile"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <el-button type="default" @click="onDownload">Download</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          data: []
        }
      }
    },
    methods: {
      onDownload() {
        console.log('download!', this.form);
      }
    }
  }
</script>

<style>
</style>
