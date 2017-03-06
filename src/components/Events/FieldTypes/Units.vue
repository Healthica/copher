<template>
  <span>
    <div v-if="view === 'row'" class="event-row-field">
      <div class="event-row-field-header">{{ field.title }}</div>
      <div class="event-row-field-value">{{ field.value }} {{ field.options.units }}</div>
    </div>
    <div v-else-if="view === 'modal'" class="event-modal-field">
      <div class="event-modal-field-header">
        <el-input placeholder="Field title" v-model="field.title"></el-input>
      </div>
      <span class="units-field-values-container">
        <el-input-number v-model="field.value" :controls="false"></el-input-number>
        <el-select v-model="field.options.units"
          :filterable="true" :allow-create="true" placeholder="Units">
          <el-option v-for="o in availableUnits" :label="o" :value="o"></el-option>
        </el-select>
      </span>
    </div>
  </span>
</template>

<script>

export default {
  props: ['field', 'view', 'filter'],
  computed: {
    availableUnits() {
      switch (this.filter) {
        case 'weight':
          return [
            'Gram',
            'Kilogram',
            'Ounce',
            'Pound'
          ]
          break;
        case 'length':
          return [
            'Centimeter',
            'Meter',
            'Kilometer',
            'Inch',
            'Foot',
            'Yard',
            'Mile'
          ]
          break;
        default:
          return [
            'Gram',
            'Kilogram',
            'Ounce',
            'Pound',
            'Gallon',
            'Centimeter',
            'Meter',
            'Kilometer',
            'Inch',
            'Foot',
            'Yard',
            'Mile',
            'Teaspoon',
            'Spoon',
            'Cup',
            'Hours',
            'Minutes',
            'Celsius',
            'Fahrenheit'
          ]
      }
    }
  }
}
</script>

<style>
.units-field-values-container {
  display: flex;
}
.units-field-values-container .el-input-number input {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.units-field-values-container .el-select input {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: 0 solid transparent;
}
</style>
