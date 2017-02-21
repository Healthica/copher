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
        <span class="status-circle" :class="statusClass">&#9679;</span>
        <span class="status-text">{{ statusText }}</span>
      </div>
      <el-popover popper-class="popover-no-padding" ref="profilepop" placement="top" width="160" v-model="profile_menu_visible">
        <div v-if="user.is_guest" class="popover-button" @click="closeProfileMenu">Register</div>
        <div v-if="user.is_guest" class="popover-button" @click="openLoginModal">Login</div>
        <div class="popover-button" @click="closeProfileMenu">Logout</div>
      </el-popover>
      <el-dialog title="Login" v-model="login_modal_visible" size="tiny">
        <el-form label-position="top" label-width="100px" :model="loginForm">
          <el-form-item label="Email">
            <el-input type="email" v-model="loginForm.login" auto-complete="on"></el-input>
          </el-form-item>
          <el-form-item label="Password">
            <el-input type="password" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item label="Move Events" prop="type">
            <el-checkbox-group v-model="loginForm.add_events">
              <el-checkbox label="Add the existing events to the account I'm logging in to" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="login_modal_visible = false">Login</el-button>
        </span>
      </el-dialog>
      <div class="profile-menu" v-popover:profilepop>
        {{ user.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    props: ['default-active'],
    data() {
      return {
        profile_menu_visible: false,
        login_modal_visible: false,
        loginForm: {
          login: '',
          password: '',
          add_events: false
        }
      }
    },
    computed: {
      ...mapGetters(['user']),
      statusText(state) {
        switch(this.user.status) {
          case 'connecting':
            return 'Connecting...'
          case 'syncing':
            return 'Syncing'
          case 'online':
            return 'Online'
          case 'has_updates':
            return 'Updates available'
          case 'disconnected':
            return 'Disconnected'
            break;
          default:
            return 'Offline'
        }
      },
      statusClass(state) {
        return {
          'grey': this.user.status === 'disconnected',
          'green': this.user.status === 'online',
          'yellow': this.user.status === 'syncing' || this.user.status === 'connecting',
          'orange': this.user.status === 'has_updates',
          'red': this.user.status === 'offline'
        }
      }
    },
    methods: {
      onChange(page) {
        this.$emit('changePage', page)
      },
      closeProfileMenu() {
        this.profile_menu_visible = false
      },
      openLoginModal() {
        this.loginForm.login = ''
        this.loginForm.password = ''
        this.loginForm.add_events = false
        this.login_modal_visible = true
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
