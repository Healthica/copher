<template>
  <div class="side-nav" :class="{open: mobile_navbar_open}">
    <div class="mobile-toggler" @click="mobile_navbar_open = !mobile_navbar_open">
      <img class="hamburger-icon" src="../assets/menu.svg">
      <img class="arrow-left-icon" src="../assets/arrow-pointing-to-left.svg">
    </div>
    <div class="navbar text-light">
      <div class="logo">
        <img src="../assets/veeta_logo.svg">
        <span>Veeta</span>
      </div>
      <router-link to="/" exact>Log</router-link>
      <router-link to="/dashboard">Dashboard</router-link>
      <router-link to="/settings">Settings</router-link>
    </div>
    <div>
      <div class="status-indicator">
        <span class="status-circle" :class="statusClass">&#9679;</span>
        <span class="status-text">{{ statusText }}</span>
      </div>
      <el-popover popper-class="popover-no-padding" ref="profilepop" placement="top" width="160" v-model="profile_menu_visible">
        <div v-if="user.is_guest" class="popover-button" @click="openRegisterModal">Register</div>
        <div v-if="user.is_guest" class="popover-button" @click="openLoginModal">Login</div>
        <div class="popover-button" @click="logout">Logout</div>
      </el-popover>
      <el-dialog title="Create Account" v-model="registerForm.visible" size="tiny">
        <el-form label-position="top" label-width="100px" :model="registerForm">
          <el-form-item label="Email">
            <el-input type="email" v-model="registerForm.login" auto-complete="on"></el-input>
          </el-form-item>
          <el-form-item label="Strong Password">
            <el-input type="password" v-model="registerForm.password"></el-input>
          </el-form-item>
          <el-form-item label="Your Name">
            <el-input type="text" v-model="registerForm.name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitRegisterModal" :disabled="registerForm.loading">Submit</el-button>
        </span>
      </el-dialog>
      <el-dialog title="Login" v-model="loginForm.visible" size="tiny">
        <el-form label-position="top" label-width="100px" :model="loginForm">
          <el-form-item label="Email">
            <el-input type="email" v-model="loginForm.login" auto-complete="on"></el-input>
          </el-form-item>
          <el-form-item label="Password">
            <el-input type="password" v-model="loginForm.password"></el-input>
          </el-form-item>
          <!-- <el-form-item label="Move Events" prop="type">
            <el-checkbox-group v-model="loginForm.add_events">
              <el-checkbox label="Add the existing events to the account I'm logging in to" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitLoginModal">Login</el-button>
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
import User from '../api/user'

  export default {
    data() {
      return {
        profile_menu_visible: false,
        loginForm: {
          visible: false,
          loading: false,
          login: '',
          password: '',
          add_events: false,
          errors: []
        },
        registerForm: {
          visible: false,
          loading: false,
          login: '',
          password: '',
          name: '',
          errors: []
        },
        mobile_navbar_open: false
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
      closeProfileMenu() {
        this.profile_menu_visible = false
      },
      logout() {
        this.profile_menu_visible = false
        User.logout().then(({ success }) => {
          location.href = '/'
        }).catch(payload => {
          console.log('payload', payload)
        })
      },
      getUser() {
        this.profile_menu_visible = false
        User.getUser().then(({ success, user }) => {
          this.$store.dispatch('setUser', user)
          this.$store.dispatch('setStatus', 'online')
        }).catch(payload => {
          this.$store.dispatch('setStatus', 'disconnected')
          console.log('payload', payload)
        })
      },
      openLoginModal() {
        this.loginForm.login = ''
        this.loginForm.password = ''
        this.loginForm.add_events = false
        this.loginForm.visible = true
        this.profile_menu_visible = false
      },
      submitLoginModal() {
        this.loginForm.loading = true
        User.login({
          login: this.loginForm.login,
          password: this.loginForm.password
        }).then(({success, user}) => {
          this.loginForm.visible = false
          this.$store.dispatch('setUser', user)
          this.$store.dispatch('syncEvents')
        }).catch(payload => {
          console.log('payload', payload);
          this.loginForm.errors = payload.errors
        })
      },
      openRegisterModal() {
        this.registerForm.login = ''
        this.registerForm.password = ''
        this.registerForm.name = ''
        this.registerForm.loading = false
        this.registerForm.visible = true
        this.profile_menu_visible = false
      },
      submitRegisterModal() {
        this.registerForm.loading = true
        User.register({
          login: this.registerForm.login,
          password: this.registerForm.password,
          name: this.registerForm.name
        }).then(({success, user}) => {
          this.registerForm.visible = false
          this.$store.dispatch('setUser', user)
          this.$store.dispatch('syncEvents')
        }).catch(payload => {
          console.log('payload', payload);
          this.registerForm.errors = payload.errors
        })
      }
    },
    created() {
      this.getUser()
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
  .navbar {
    display: flex;
    flex-direction: column;
  }
  .mobile-toggler {
    display: none;
    position: absolute;
    padding: 12px;
    cursor: pointer;
  }
  .mobile-toggler img {
    width: 20px;
  }
  @media screen and (max-width: 768px) {
    .mobile-toggler {
      display: block;
      top: 12px;
      right: -44px;
    }
    .side-nav.open .mobile-toggler .hamburger-icon,
    .side-nav:not(.open) .mobile-toggler .arrow-left-icon {
      display: none;
    }
    .side-nav.open .mobile-toggler {
      right: 0;
    }
  }
  .navbar a {
    font-size: 14px;
    padding: 12px 18px;
    color: #fff;
    text-decoration: none;
    border-left: 3px solid transparent;
    cursor: default;
  }
  .navbar a:not(.router-link-active) {
    cursor: pointer;
    opacity: 0.8;
  }
  .navbar a:hover {
    opacity: 1;
  }
  .navbar a.router-link-active {
    color: #BCD9EA;
    border-left: 3px solid #BCD9EA;
    background-color: #3A476F;
  }
  .logo {
    padding: 20px;
    display: flex;
    align-items: center;
  }
  .logo img {
    height: 36px;
  }
  .logo span {
    color: #E4F0F6;
    margin-left: 10px;
    font-size: 16px;
    position: relative;
    top: 2px;
    line-height: 36px;
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
