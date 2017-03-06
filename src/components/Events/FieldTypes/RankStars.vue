<template>
  <span>
    <div v-if="view === 'row'" class="event-row-field">
      <div class="event-row-field-header">{{ field.title }}</div>
      <div class="event-row-field-value"><el-rate v-model="field.value" :allow-half="true" disabled :colors="['#BD903C','#BD903C','#BD903C']"></el-rate></div>
    </div>
    <div v-else-if="view === 'modal'" class="event-modal-field">
      <div class="event-modal-field-header">
        <el-input placeholder="Field title" v-model="field.title"></el-input>
      </div>
      <div class="event-modal-field-content">
        <el-rate v-model="field.value" :allow-half="true" :colors="['#838C91','#838C91','#838C91']"></el-rate>
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
  pointer-events: none;
}
.event-row-field-value {
  padding-top: 8px;
}
</style>
