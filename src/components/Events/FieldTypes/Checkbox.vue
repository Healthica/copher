<template>
  <span>
    <div v-if="view === 'row'" class="event-row-field">
      <div class="event-row-field-header">{{ field.title }}</div>
      {{ textValues }}
    </div>
    <div v-else-if="view === 'modal'" class="event-modal-field">
      <div class="event-modal-field-header">{{ field.title }}</div>
      <el-checkbox-group v-model="field.value">
        <el-checkbox :label="o.value" v-for="o in field.options.options">{{ o.title }}</el-checkbox>
      </el-checkbox-group>
    </div>
  </span>
</template>

<script>

export default {
  props: ['field', 'view'],
  computed: {
    textValues() {
      const options = {}
      _.each(this.field.options.options, o => {
        options[o.value] = o.title
      })
      if (this.field.value.length === this.field.options.options.length) {
        return 'All'
      } else if (this.field.value.length > 0) {
        return this.field.value.map(k => {return options[k]}).join(', ')
      } else {
        return 'None'
      }
    }
  }
}
</script>

<style scoped>
</style>
