<template>
  <div class="settings-section">
    <h2 class="text-light">Profile</h2>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="default" @click="onSubmit">Save</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!', this.form);
      }
    }
  }
</script>

<style>
</style>
