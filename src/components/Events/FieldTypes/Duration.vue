<template>
  <span>
    <div v-if="view === 'row'" class="event-row-field">
      <div class="event-row-field-header">{{ field.title }}</div>
      <div class="event-row-field-value">{{ formattedHours }}</div>
    </div>
    <div v-else-if="view === 'modal'" class="event-modal-field">
      <div class="event-modal-field-header">
        <el-input placeholder="Field title" v-model="field.title"></el-input>
      </div>
      <div class="duration-field-container">
        <el-select v-model="hours" class="duration-field-hours-select">
          <el-option
            v-for="item in hoursOptions"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <el-select v-model="minutes" class="duration-field-minutes-select">
          <el-option
            v-for="item in minutesOptions"
            :label="item < 10 ? '0' + item : item"
            :value="item">
          </el-option>
        </el-select>
        <label class="duration-field-hours-label">Hours</label>
        <label class="duration-field-separator-label">:</label>
        <label class="duration-field-minutes-label">Minutes</label>
      </div>
    </div>
  </span>
</template>

<script>

export default {
  props: ['field', 'view'],
  data() {
    return {
      field_type: 'Duration',
      hours: Math.floor(this.field.value / 60),
      minutes: Math.round(this.field.value % 60)
    }
  },
  computed: {
    formattedHours() {
      const hours = Math.floor(this.field.value / 60)
      const minutes = Math.round(this.field.value % 60)
      return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`
    },
    hoursOptions() {
      return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    },
    minutesOptions() {
      return [0, 1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
    }
  },
  watch: {
    hours() {
      this.updateModel()
    },
    minutes() {
      this.updateModel()
    }
  },
  methods: {
    updateModel() {
      this.field.value = (this.hours * 60) + this.minutes
    }
  }
}
</script>

<style scoped>
</style>
