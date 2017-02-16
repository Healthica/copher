<template>
  <span>
    <div v-if="view === 'row'" class="event-row-field">
      <div class="event-row-field-header">{{ field.title }}</div>
      {{ hours }}
    </div>
    <div v-else-if="view === 'modal'" class="event-modal-field">
      <div class="event-modal-field-header">{{ field.title }}</div>
      <div class="event-modal-field-content">
        {{ hours }}
      </div>
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
</style>
