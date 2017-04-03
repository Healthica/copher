<template>
  <div class="goal-item" @click="open">
    <el-card>
      <h3>{{ goal.title }}</h3>
      <p>{{ reducedValue }}</p>
      <p>{{ goal }}</p>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['goal'],
  computed: {
    ...mapGetters(['events']),
    filteredEvents() {
      const eventFilter = eval(`(${this.goal.eventFilter})`)
      return this.events.data.filter(eventFilter)
    },
    reducedValue() {
      const iteratee = eval(`(${this.goal.eventReducer.iteratee})`)
      const reducer = eval(`(${this.goal.eventReducer.reducer})`)
      const accumulator = _.cloneDeep(this.goal.eventReducer.accumulator)
      return reducer(_.reduce(this.filteredEvents, iteratee, accumulator))
    }
  },
  methods: {
    open() {
      this.$emit('open', this.goal.id)
    }
  }
}
</script>

<style>
.goal-item {
  max-width: 300px;
  display: inline-block;
  cursor: pointer;
}
</style>
