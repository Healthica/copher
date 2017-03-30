<template>
  <div class="preset-item" @click="open">
    <div class="preset-icon">
      <icon :name="item.icon"></icon>
    </div>
    <h3 class="preset-title">{{ item.title }}</h3>
  </div>
</template>

<script>
import Icon from '../Utils/Icon'

export default {
  props: ['item'],
  components: { Icon },
  methods: {
    open() {
      this.$emit('open', this.item)
    }
  }
}
</script>

<style>
.preset-item {
  width: 144px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}
.preset-icon {
  height: 72px;
  width: 72px;
  padding: 21px;
  background-color: #0079BF;
  color: #fff;
  border-radius: 50%;
}
.preset-item:nth-child(2n) .preset-icon {
  background-color: #61BD4F;
}
.preset-item:nth-child(3n) .preset-icon {
  background-color: #FFAB4A;
}
.preset-item:nth-child(4n) .preset-icon {
  background-color: #EB5A46;
}
.preset-item:nth-child(5n) .preset-icon {
  background-color: #F2D600;
}
.preset-item:nth-child(6n) .preset-icon {
  background-color: #C377E0;
}
.preset-item:hover .preset-icon {
  -webkit-box-shadow: 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.2);
  box-shadow: 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.2);
  transition: box-shadow .2s !important;
}
.preset-title {
  font-size: 16px;
  color: #000;
  text-align: center;
}
</style>
