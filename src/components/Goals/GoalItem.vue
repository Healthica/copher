<template>
  <div class="goal-item" @click="open">
    <el-card>
      <h3>{{ goal.title }}</h3>
      <p>{{ goal }}</p>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ['goal'],
  methods: {
    open() {
      this.$emit('open', this.goal.id)
    }
  }
}
</script>

<style>
.goal-item {
  max-width: 300px;
  display: inline-block;
  cursor: pointer;
}
</style>
