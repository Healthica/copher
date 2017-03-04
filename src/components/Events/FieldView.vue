<template>
  <span v-if="has_value" class="field" :class="{'field-hover-delete': deleteHover}">
    <text-field   v-if      = "field.type === 'text'"       :field="field" :view="view"></text-field>
    <duration     v-else-if = "field.type === 'duration'"   :field="field" :view="view"></duration>
    <select-field v-else-if = "field.type === 'intensity'"  :field="field" :view="view"></select-field>
    <units-field  v-else-if = "field.type === 'weight'"     :field="field" :view="view" filter="weight"></units-field>
    <units-field  v-else-if = "field.type === 'length'"     :field="field" :view="view" filter="length"></units-field>
    <rank-stars   v-else-if = "field.type === 'rank_stars'" :field="field" :view="view"></rank-stars>
    <switch-field v-else-if = "field.type === 'switch'"     :field="field" :view="view"></switch-field>
    <select-field v-else-if = "field.type === 'select'"     :field="field" :view="view"></select-field>
    <units-field  v-else-if = "field.type === 'units'"      :field="field" :view="view"></units-field>

    <span @mouseover="deleteOnHover" @mouseout="deleteOnOut">
      <el-button v-if="view === 'modal'" class="el-button--link event-field-delete-btn" icon="close" size="mini" @click="deleteField"></el-button>
    </span>
  </span>
</template>

<script>

import TextField from './FieldTypes/Text'
import Duration from './FieldTypes/Duration'
import RankStars from './FieldTypes/RankStars'
import SwitchField from './FieldTypes/Switch'
import SelectField from './FieldTypes/Select'
import UnitsField from './FieldTypes/Units'

export default {
  props: ['field', 'view'],
  components: {
    TextField,
    Duration,
    RankStars,
    SwitchField,
    SelectField,
    UnitsField
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
