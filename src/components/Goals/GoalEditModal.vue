<template>
  <div class="modal">
    <input type="text" v-model="goal.title" />
    <p class="text-small">{{ goal.id }}</p>

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
