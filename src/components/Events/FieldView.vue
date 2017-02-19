<template>
  <span v-if="has_value" class="field">
    <duration v-if="field.type === 'duration'" :field="field" :view="view"></duration>
    <checkbox v-else-if="field.type === 'checkbox'" :field="field" :view="view"></checkbox>
    <rank-stars v-else-if="field.type === 'rank_stars'" :field="field" :view="view"></rank-stars>
    <weight v-else-if="field.type === 'weight'" :field="field" :view="view"></weight>
    <length v-else-if="field.type === 'length'" :field="field" :view="view"></length>
    <select-field v-else-if="field.type === 'select'" :field="field" :view="view"></select-field>
    <number-field v-else-if="field.type === 'number'" :field="field" :view="view"></number-field>
    <text-field v-else-if="field.type === 'text'" :field="field" :view="view"></text-field>
    <switch-field v-else-if="field.type === 'switch'" :field="field" :view="view"></switch-field>
  </span>
</template>

<script>

import Duration from './FieldTypes/Duration'
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
    }
  }
}
</script>

<style scoped>
</style>
