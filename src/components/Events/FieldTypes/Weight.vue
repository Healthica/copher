<template>
  <span>
    <div v-if="view === 'row'" class="event-row-field">
      <div class="event-row-field-header">{{ field.title }}</div>
      {{ weight }}
    </div>
    <div v-else-if="view === 'modal'" class="event-modal-field">
      <div class="event-modal-field-header">{{ field.title }}</div>
      <div class="event-modal-field-content">
        <el-input-number v-model="field.value" :step="0.5" :min="0"></el-input-number>
        <span class="lbs">({{ weight_lbs }})</span>
      </div>
    </div>
    <div v-else-if="view === 'modalEdit'">
      <a @click="showOptions = !showOptions" class="no-link">
        <span v-if="showOptions" uk-icon="icon: triangle-down" key="caret-down"></span>
        <span v-else uk-icon="icon: triangle-right" key="caret-right"></span>
        Options
      </a>
      <div v-if="showOptions">
        <el-select v-model="field.options.units" placeholder="Select">
          <el-option label="Kilograms" value="kg"></el-option>
          <el-option label="Grams" value="g"></el-option>
        </el-select>
      </div>
    </div>
  </span>
</template>

<script>

export default {
  props: ['field', 'view'],
  computed: {
    weight() {
      return `${this.field.value}${this.field.options.units || 'kg'}`
    },
    weight_lbs() {
      const nearExact = (this.field.value * (this.field.options.units === 'kg' ? 1 : 0.01))/0.45359237
      const lbs = Math.floor(nearExact)
      const oz = (nearExact - lbs) * 16
      if (lbs > 10) {
        return `${lbs} lb`
      } else if (lbs > 1) {
        return `${lbs} lb ${oz} oz`
      } else if (oz > 5) {
        return `${Math.floor(oz)} oz`
      } else {
        return `${oz.toFixed(1)} oz`
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
.lbs {
  color: #838C91;
  line-height: 30px;
  display: inline-block;
  vertical-align: bottom;
}
</style>
