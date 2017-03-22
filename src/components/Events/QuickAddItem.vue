<template>
  <div class="quick-add-item" :class="itemClass" @mouseover="checkIsHover" @mouseout="checkIsHover" ref="button">
    <i :class="'el-icon-' + icon"></i>
    <span v-if="is_hover" class="quick-add-item-title">
      <slot></slot>
    </span>
  </div>
</template>

<script>

export default {
  props: ['icon', 'color', 'size'],
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
.quick-add-item {
  padding: 20px;
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
.quick-add-item.small {
  width: 40px;
  height: 40px;
}
.quick-add-item.primary {
  background-color: #0079BF;
}
.quick-add-item.primary:hover {
  background-color: #298FCA;
}
.quick-add-item.green {
  background-color: #61BD4F;
}
.quick-add-item.green:hover {
  background-color: #7BC86C;
}
.quick-add-item.orange {
  background-color: #FFAB4A;
}
.quick-add-item.orange:hover {
  background-color: #FFB968;
}
.quick-add-item.red {
  background-color: #EB5A46;
}
.quick-add-item.red:hover {
  background-color: #EF7564;
}

.quick-add-item-title {
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
.quick-add-item.small .quick-add-item-title {
  right: 90px;
}
</style>
