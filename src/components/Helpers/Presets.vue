<template>
  <div class="presets-container">
    <h4 class="text-center text-light">{{ title }}</h4>
    <div class="presets">
      <preset-item v-for="item in items" :item="item" @open="open"></preset-item>
    </div>
  </div>
</template>

<script>
import PresetItem from './PresetItem'

export default {
  props: ['title', 'items'],
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
.presets-container {
  margin-top: 96px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
@media screen and (max-width: 768px) {
  .presets-container {
    margin-top: 48px;
  }
}
.presets {
  max-width: 700px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 0 24px;
}
.presets .preset-item {
  margin: 12px;
}
</style>
