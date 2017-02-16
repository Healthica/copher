<template>
  <span>
    <div v-if="view === 'row'" class="event-row-field">
      <div class="event-row-field-header">{{ field.title }}</div>
      <i v-for="s in fullStars" class="el-icon-star-on"></i>
      <i v-for="s in emptyStars" class="el-icon-star-off"></i>
    </div>
    <div v-else-if="view === 'modal'" class="event-modal-field">
      <div class="event-modal-field-header">{{ field.title }}</div>
      <div class="event-modal-field-content">
        <i v-for="s in fullStars" class="el-icon-star-on"></i>
        <i v-for="s in emptyStars" class="el-icon-star-off"></i>
      </div>
    </div>
  </span>
</template>

<script>

export default {
  props: ['field', 'view'],
  computed: {
    fullStars() {
      return Math.floor(this.field.value)
    },
    emptyStars() {
      return 5 - Math.floor(this.field.value)
    }
  }
}
</script>

<style scoped>
</style>
