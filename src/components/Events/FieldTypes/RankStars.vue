<template>
  <span>
    <div v-if="view === 'row'" class="event-row-field">
      <div class="event-row-field-header">{{ field.title }}</div>
      <el-rate v-model="field.value" :allow-half="true" disabled :colors="['#BD903C','#BD903C','#BD903C']"></el-rate>
    </div>
    <div v-else-if="view === 'modal'" class="event-modal-field">
      <div class="event-modal-field-header">{{ field.title }}</div>
      <div class="event-modal-field-content">
        <el-rate v-model="field.value" :allow-half="true"></el-rate>
      </div>
    </div>
  </span>
</template>

<script>

export default {
  props: ['field', 'view'],
  computed: {
    fullStars() {
      return Math.floor(this.field.value)
    },
    emptyStars() {
      return 5 - Math.floor(this.field.value)
    }
  }
}
</script>

<style scoped>
.event-row-field-header {
  top: -15px;
}
</style>
