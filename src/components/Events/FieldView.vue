<template>
  <span v-if="has_value" class="field" :class="{row:view==='row'}">
    <duration-minutes v-if="field.type === 'duration_minutes'" :field="field" :view="view"></duration-minutes>
  </span>
</template>

<script>

import DurationMinutes from './FieldTypes/DurationMinutes'

export default {
  props: ['field', 'view'],
  components: {
    DurationMinutes
  },
  computed: {
    has_value() {
      return this.field && this.field.value !== null
    }
  }
}
</script>

<style scoped>
</style>
