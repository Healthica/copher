<template>
  <div class="modal">
    <h2>Goal #{{ goal.id }}</h2>

    <div class="close-modal-button">
      <el-button @click="close" type="primary" size="small" :plain="true">Close</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['goal'],
  data() {
    return {
      editMode: false
    }
  },
  computed: {
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style>
</style>
