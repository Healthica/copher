<template>
  <span>
    <div v-if="view === 'row'" class="event-row-field">
      <div class="event-row-field-header">{{ field.title }}</div>
      {{ weight }}
    </div>
  </span>
</template>

<script>

export default {
  props: ['field', 'view'],
  computed: {
    weight() {
      return `${this.field.value}kg`
    }
  }
}
</script>

<style scoped>
</style>
