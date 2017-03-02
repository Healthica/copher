<template>
  <span>
    <div v-if="view === 'row'" class="event-row-field">
      <div class="event-row-field-header">{{ field.title }}</div>
      {{ field.value.replace("\n", ' ') }}
    </div>
    <div v-else-if="view === 'modal'" class="event-modal-field">
      <div class="event-modal-field-header">
        <el-input placeholder="Field title" v-model="field.title"></el-input>
      </div>
      <div class="event-modal-field-content">
        <el-input type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          v-model="field.value">
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
.event-row-field {
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
