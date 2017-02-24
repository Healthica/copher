<template>
  <span>
    <div v-if="view === 'row'" class="event-row-field">
      <div class="event-row-field-header">{{ field.title }}</div>
      {{ length }}
    </div>
    <div v-else-if="view === 'modal'" class="event-modal-field">
      <div class="event-modal-field-header">{{ field.title }}</div>
      <div class="event-modal-field-content">
        <el-input-number v-model="field.value" :step="0.5" :min="0"></el-input-number>
        <span class="inches">({{ length_inches }})</span>
      </div>
    </div>
    <div v-else-if="view === 'modalEdit'">
      <a @click="showOptions = !showOptions" class="no-link">
        <i v-if="showOptions" class="el-icon-caret-bottom"></i>
        <i v-else class="el-icon-caret-right"></i>
        Options
      </a>
      <div v-if="showOptions">
        <el-select v-model="field.options.units" placeholder="Select">
          <el-option label="Meters" value="m"></el-option>
          <el-option label="Centimeters" value="cm"></el-option>
          <el-option label="Kilometers" value="km"></el-option>
        </el-select>
      </div>
    </div>
  </span>
</template>

<script>

export default {
  props: ['field', 'view'],
  computed: {
    length() {
      return `${this.field.value}${this.field.options.units || 'm'}`
    },
    length_inches() {
      let meters = this.field.value
      switch (this.field.options.units) {
        case 'm':
          break;
        case 'cm':
        meters /= 100
          break;
        case 'km':
        meters *= 1000
          break;
        default:
      }
      const total_inches = meters / 0.0254
      const feet = Math.floor(total_inches / 12)
      const miles = total_inches / 12 / 5280
      const inch = total_inches  - (feet * 12)
      if (miles > 0) {
        return `${miles.toFixed(1)} miles`
      } else if (feet > 0) {
        return `${feet}" ${Math.round(inch)}'`
      } else if (inch > 5) {
        return `${Math.floor(inch)} inch`
      } else {
        return `${inch.toFixed(1)} inch`
      }
    }
  },
  data() {
    return {
      showOptions: false
    }
  }
}
</script>

<style scoped>
.event-modal-field-header {
  padding-top: 10px;
}
.inches {
  color: #838C91;
  line-height: 30px;
  display: inline-block;
  vertical-align: bottom;
}
</style>
