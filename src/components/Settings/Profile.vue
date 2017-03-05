<template>
  <div class="settings-section">
    <h2 class="text-light">Profile</h2>
    <el-form label-width="120px">
      <el-form-item label="Name">
        <el-input :value="user.name" ref="username"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="default" @click="onSubmit" :loading="is_loading">Save</el-button>
        <span v-if="save_success" class="text-success"><i class="el-icon-check"></i> Saved</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import User from '../../api/user'

export default {
  computed: {
    ...mapGetters(['user'])
  },
  data() {
    return {
      is_loading: false,
      save_success: false
    }
  },
  methods: {
    onSubmit() {
      const name = this.$refs['username'].$el.querySelector('input').value
      this.is_loading = true
      this.save_success = false
      User.update({
        name: name
      }).then(({ success }) => {
        this.$store.dispatch('setUser', { name: name })
        this.is_loading = false
        this.save_success = true
        window.setTimeout(() => {
          this.save_success = false
        }, 2500)
      }).catch(payload => {
        this.is_loading = false
        if (payload.errors && payload.errors.length > 0) {
          this.$message.error(payload.errors[0])
        } else {
          this.$message.error('Aw, something went wrong!')
        }
      })
    }
  }
}
</script>

<style>
.text-success {
  color: #61BD4F;
}
</style>
