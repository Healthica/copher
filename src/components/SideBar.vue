<template>
  <div class="side-nav">
    <el-menu class="el-menu" theme="dark" @select="onChange">
      <div class="logo">
        <img src="../assets/copher_logo.svg">
        <span>Copher</span>
      </div>
      <el-menu-item index="log-app" class="text-light">Log</el-menu-item>
      <el-menu-item index="dashboard" class="text-light">Dashboard</el-menu-item>
      <el-menu-item index="settings" class="text-light">Settings</el-menu-item>
    </el-menu>
    <div>
      <div class="status-indicator">
        <span class="status-circle green">&#9679;</span>
        <span class="status-text">Online</span>
      </div>
      <el-popover popper-class="popover-no-padding" ref="profilepop" placement="top" width="160" v-model="profile_menu_visible">
        <div class="popover-button" @click="closeProfileMenu">Register</div>
        <div class="popover-button" @click="closeProfileMenu">Login</div>
        <div class="popover-button" @click="closeProfileMenu">Logout</div>
      </el-popover>
      <div class="profile-menu" v-popover:profilepop>
        Guest
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['default-active'],
    data() {
      return {
        profile_menu_visible: false
      }
    },
    methods: {
      onChange(page) {
        this.$emit('changePage', page)
      },
      closeProfileMenu() {
        this.profile_menu_visible = false
      }
    }
  }
</script>

<style scoped>
  .side-nav {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #36405F;
    color: #B2B9D0;
  }
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
  .status-indicator {
    padding: 12px;
  }
  .status-circle {
    font-size: 18px;
  }
  .status-circle.grey {
    color: #6170A1;
  }
  .status-circle.green {
    color: #99D18F;
  }
  .status-circle.yellow {
    color: #F3E260;
  }
  .status-circle.orange {
    color: #FDC788;
  }
  .status-circle.red {
    color: #EC9488;
  }
  .status-text {
    font-size: 12px;
  }
  .profile-menu {
    text-align: center;
    font-size: 14px;
    padding: 12px 6px;
    border-top: 1px solid #3A476F;
    cursor: pointer;
  }
  .profile-menu:hover {
    background-color: #3A476F;
  }
  .popover {
    padding: 0;
  }
  .popover-button {
    width: 100%;
    padding: 12px;
    cursor: pointer;
    font-size: 14px;
  }
  .popover-button:hover {
    background-color: #EDEFF4;
  }
</style>
