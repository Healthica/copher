<template>
  <span v-if="has_value" class="field">
    <duration-minutes v-if="field.type === 'duration_minutes'" :field="field" :view="view"></duration-minutes>
    <checkbox v-else-if="field.type === 'checkbox'" :field="field" :view="view"></checkbox>
    <rank-stars v-else-if="field.type === 'rank_stars'" :field="field" :view="view"></rank-stars>
    <weight v-else-if="field.type === 'weight'" :field="field" :view="view"></weight>
  </span>
</template>

<script>

import DurationMinutes from './FieldTypes/DurationMinutes'
import Checkbox from './FieldTypes/Checkbox'
import RankStars from './FieldTypes/RankStars'
import Weight from './FieldTypes/Weight'

export default {
  props: ['field', 'view'],
  components: {
    DurationMinutes,
    Checkbox,
    RankStars,
    Weight
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
