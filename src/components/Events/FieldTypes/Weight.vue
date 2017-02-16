<template>
  <span>
    <div v-if="view === 'row'" class="event-row-field">
      <div class="event-row-field-header">{{ field.title }}</div>
      {{ weight }}
    </div>
    <div v-else-if="view === 'modal'" class="event-modal-field">
      <div class="event-modal-field-header">{{ field.title }}</div>
      <div class="event-modal-field-content">
        <el-input-number v-model="field.value" :step="0.5"></el-input-number>
        <span class="lbs">({{ weight_lbs }})</span>
      </div>
    </div>
  </span>
</template>

<script>

export default {
  props: ['field', 'view'],
  computed: {
    weight() {
      return `${this.field.value}kg`
    },
    weight_lbs() {
      const nearExact = this.field.value/0.45359237
      const lbs = Math.floor(nearExact)
      const oz = (nearExact - lbs) * 16
      return `${lbs} lb`
    }
  }
}
</script>

<style scoped>
.event-modal-field-header {
  padding-top: 10px;
}
.lbs {
  color: #838C91;
  line-height: 30px;
  display: inline-block;
  vertical-align: bottom;
}
</style>
