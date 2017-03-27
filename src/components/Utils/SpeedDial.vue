<template>
  <div class="speed-dial" @mouseover="checkOpen" @mouseout="checkOpen" ref="mainItem">
    <speed-dial-item
      @open="open"
      :icon="mainItem.icon"
      :color="mainItem.color"
      :data="mainItem.data">
        {{ mainItem.title }}
    </speed-dial-item>
    <speed-dial-item v-for="i in secondaryItems" v-if="is_open"
      @open="open"
      size="small"
      :data="i.data"
      :icon="i.icon"
      :color="i.color">
        {{ i.title }}
    </speed-dial-item>
  </div>
</template>

<script>
import SpeedDialItem from './SpeedDialItem'

export default {
  props: ['items'],
  components: {
    SpeedDialItem
  },
  computed: {
    mainItem() {
      return this.items[0]
    },
    secondaryItems() {
      return _.tail(this.items)
    }
  },
  methods: {
    checkOpen() {
      const el = this.$refs.mainItem
      this.is_open = el.parentElement.querySelector(':hover') === el
    },
    open(event) {
      this.$emit('open', event)
    }
  },
  data() {
    return {
      is_open: false
    }
  }
}
</script>

<style>
.speed-dial {
  display: flex;
  flex-direction: column-reverse;
  padding: 20px;
  align-items: center;
}
.speed-dial > * {
  margin-top: 8px;
}
</style>
