<template>
  <span v-if="has_value" class="field" :class="{'field-hover-delete': deleteHover}">
    <duration v-if="field.type === 'duration'" :field="field" :view="view"></duration>
    <units-field v-else-if="field.type === 'units'" :field="field" :view="view"></units-field>
    <checkbox v-else-if="field.type === 'checkbox'" :field="field" :view="view"></checkbox>
    <rank-stars v-else-if="field.type === 'rank_stars'" :field="field" :view="view"></rank-stars>
    <weight v-else-if="field.type === 'weight'" :field="field" :view="view"></weight>
    <length v-else-if="field.type === 'length'" :field="field" :view="view"></length>
    <select-field v-else-if="field.type === 'select'" :field="field" :view="view"></select-field>
    <number-field v-else-if="field.type === 'number'" :field="field" :view="view"></number-field>
    <text-field v-else-if="field.type === 'text'" :field="field" :view="view"></text-field>
    <switch-field v-else-if="field.type === 'switch'" :field="field" :view="view"></switch-field>

    <span @mouseover="deleteOnHover" @mouseout="deleteOnOut">
      <el-button v-if="view === 'modal'" class="el-button--link event-field-delete-btn" icon="close" size="mini" @click="deleteField"></el-button>
    </span>
  </span>
</template>

<script>

import Duration from './FieldTypes/Duration'
import UnitsField from './FieldTypes/Units'
import Checkbox from './FieldTypes/Checkbox'
import RankStars from './FieldTypes/RankStars'
import Weight from './FieldTypes/Weight'
import Length from './FieldTypes/Length'
import SelectField from './FieldTypes/Select'
import NumberField from './FieldTypes/Number'
import TextField from './FieldTypes/Text'
import SwitchField from './FieldTypes/Switch'

export default {
  props: ['field', 'view'],
  components: {
    Duration,
    UnitsField,
    Checkbox,
    RankStars,
    Weight,
    Length,
    SelectField,
    NumberField,
    TextField,
    SwitchField
  },
  computed: {
    has_value() {
      return this.field && this.field.value !== null
    },
    deleteHover() {
      return this.isDeleteHover
    }
  },
  methods: {
    deleteField() {
      this.$emit('deleteField')
    },
    deleteOnHover() {
      this.isDeleteHover = true
    },
    deleteOnOut() {
      this.isDeleteHover = false
    }
  },
  data() {
    return {
      isDeleteHover: false
    }
  }
}
</script>

<style>
.field {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.field > span:first-child {
  flex-grow: 2;
}
.field-hover-delete {
  background-color: #FBEDEB;
}
</style>
