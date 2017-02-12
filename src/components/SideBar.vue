<template>
  <el-menu class="el-menu" theme="dark" @select="onChange">
    <div class="logo">
      <img src="../assets/copher_logo.svg">
      <span>Copher</span>
    </div>
    <el-menu-item index="log-app">Log</el-menu-item>
    <el-menu-item index="dashboard">Dashboard</el-menu-item>
    <el-menu-item index="settings">Settings</el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    props: ['default-active'],
    methods: {
      onChange(page) {
        this.$emit('changePage', page)
      }
    }
  }
</script>

<style scoped>
  .el-menu {
    border-radius: 0;
  }
  .logo {
    padding: 20px;
    display: flex;
    align-items: center;
  }
  .logo img {
    height: 40px;
  }
  .logo span {
    color: #E4F0F6;
    margin-left: 10px;
    font-size: 14px;
    font-weight: bold;
    position: relative;
    top: -4px;
  }
</style>
