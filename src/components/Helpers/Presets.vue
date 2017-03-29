<template>
  <div class="presets">
    <preset-item v-for="item in items" :item="item" @open="open"></preset-item>
  </div>
</template>

<script>
import PresetItem from './PresetItem'

export default {
  props: ['items'],
  components: {
    PresetItem
  },
  methods: {
    open(item) {
      this.$emit('open', item)
    }
  }
}
</script>

<style>
.presets {
  display: flex;
  flex-wrap: wrap;
}
.presets .preset-item {
  margin-right: 24px;
  margin-bottom: 24px;
}
</style>
