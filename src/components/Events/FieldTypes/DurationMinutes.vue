<template>
  <span>
    <div v-if="view === 'row'" class="row">
      <div class="row_header">{{ field.title }}</div>
      {{ hours }}
    </div>
  </span>
</template>

<script>

export default {
  props: ['field', 'view'],
  computed: {
    hours() {
      const hours = Math.round(this.field.value / 60)
      const minutes = Math.round(this.field.value % 60)
      return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`
    }
  }
}
</script>

<style scoped>
.row {
  display: inline-block;
  position: relative;
  color: #BD903C;
}
.row_header {
  font-size: 10px;
  line-height: 10px;
  position: absolute;
  top: 7px;
  left: 50%;
  transform: translateX(-50%);
  color: #CCA42B;
}
</style>
