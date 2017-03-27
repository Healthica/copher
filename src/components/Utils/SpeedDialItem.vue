<template>
  <div class="speed-dial-item" :class="itemClass" @click="onClick" @mouseover="checkIsHover" @mouseout="checkIsHover" ref="button">
    <icon :name="icon"></icon>
    <span v-if="is_hover" class="speed-dial-item-title">
      <slot></slot>
    </span>
  </div>
</template>

<script>
import Icon from './Icon'
export default {
  props: ['icon', 'color', 'size', 'data'],
  components: { Icon },
  computed: {
    itemClass() {
      const cls = {}
      if (this.color) {
        cls[this.color] = true
      }
      if (this.size) {
        cls[this.size] = true
      }
      return cls
    }
  },
  methods: {
    checkIsHover() {
      const el = this.$refs.button
      this.is_hover = el.parentElement.querySelector(':hover') === el
    },
    onClick() {
      this.$emit('open', this.data)
    }
  },
  data() {
    return {
      is_hover: false
    }
  }
}
</script>

<style>
.speed-dial-item {
  padding: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  cursor: pointer;
  color: #fff;
  -webkit-box-shadow: 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.4);
  box-shadow: 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.4);
  -webkit-transition: all 0.2s ease-in-out;
  -moz-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
.speed-dial-item.small {
  width: 40px;
  height: 40px;
  padding: 10px;
}
.speed-dial-item.primary {
  background-color: #0079BF;
}
.speed-dial-item.primary:hover {
  background-color: #298FCA;
}
.speed-dial-item.green {
  background-color: #61BD4F;
}
.speed-dial-item.green:hover {
  background-color: #7BC86C;
}
.speed-dial-item.orange {
  background-color: #FFAB4A;
}
.speed-dial-item.orange:hover {
  background-color: #FFB968;
}
.speed-dial-item.red {
  background-color: #EB5A46;
}
.speed-dial-item.red:hover {
  background-color: #EF7564;
}

.speed-dial-item-title {
  display: inline-block;
  white-space: nowrap;
  font-size: 13px;
  position: absolute;
  color: #ececec;
  background-color: rgba(70, 70, 70, 0.9);
  padding: 6px 8px;
  border-radius: 2px;
  right: 96px;
}
.speed-dial-item.small .speed-dial-item-title {
  right: 90px;
}
</style>
