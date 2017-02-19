<template>
  <span>
    <div v-if="view === 'row'" class="event-row-field">
      <div class="event-row-field-header">{{ field.title }}</div>
      {{ text }}
    </div>
    <div v-else-if="view === 'modal'" class="event-modal-field">
      <div class="event-modal-field-header">{{ field.title }}</div>
      <div class="event-modal-field-content">
          <el-switch v-model="field.value" on-text="" off-text=""></el-switch>
      </div>
    </div>
  </span>
</template>

<script>

export default {
  props: ['field', 'view'],
  computed: {
    text() {
      if (this.field.value === true) {
        return 'Yes'
      } else if (this.field.value === false) {
        return 'No'
      } else {
        return ''
      }
    }
  }
}
</script>

<style scoped>
.event-modal-field-header {
  padding-top: 10px;
}
.event-modal-field-content {
  margin-top: 10px;
}
</style>
