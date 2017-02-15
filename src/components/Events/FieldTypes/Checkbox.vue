<template>
  <span>
    <div v-if="view === 'row'" class="event-row-field">
      <div class="event-row-field-header">{{ field.title }}</div>
      {{ textValues }}
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
      return this.field.value.length > 0 ? this.field.value.map(k => {return options[k]}).join(', ') : 'None'
    }
  }
}
</script>

<style scoped>
</style>
