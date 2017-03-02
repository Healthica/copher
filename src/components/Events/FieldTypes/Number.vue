<template>
  <span>
    <div v-if="view === 'row'" class="event-row-field">
      <div class="event-row-field-header">{{ field.title }}</div>
      {{ field.value }}
    </div>
    <div v-else-if="view === 'modal'" class="event-modal-field">
      <div class="event-modal-field-header">
        <el-input placeholder="Field title" v-model="field.title"></el-input>
      </div>
      <div class="event-modal-field-content">
        <el-input-number v-model="field.value" :step="1"></el-input-number>
      </div>
    </div>
  </span>
</template>

<script>

export default {
  props: ['field', 'view']
}
</script>

<style scoped>
</style>
