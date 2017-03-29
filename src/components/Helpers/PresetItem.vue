<template>
  <div class="preset-item">
    <el-card>
      <div class="card-preset-img">
        <img v-if="item.img === 'cyclist'" src="../../assets/presets/cyclist.png">
        <img v-else-if="item.img === 'girl_cook'" src="../../assets/presets/girl_cook.png">
      </div>
      <div class="card-preset-content">
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </div>
      <div class="card-preset-buttons">
        <button @click="open">{{ item.openText }}</button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ['item'],
  methods: {
    open() {
      this.$emit('open', this.item)
    }
  }
}
</script>

<style>
.preset-item {
  min-height: 300px;
  max-width: 300px;
  display: inline-block;
}
.preset-item .el-card__body {
  padding: 0;
}
.card-preset-img {
  height: 120px;
  line-height: 120px;
  text-align: center;
  overflow: hidden;
  width: 100%;
}
.card-preset-img img {
  width: 120%;
  margin: -50%;
}
.card-preset-content {
  padding: 18px;
}
.card-preset-content h3 {
  font-size: 20px;
  margin: 0 0 6px 0;
}
.card-preset-content p {
  font-size: 13px;
  line-height: 20px;
  opacity: 0.5;
}
.card-preset-buttons {
  padding: 3px 3px 3px 18px;
  display: flex;
  flex-direction: row-reverse;
}
.card-preset-buttons button {
  color: #0079BF;
  background: transparent;
  padding: 3px 18px;
  text-transform: uppercase;
  border: 0;
  outline: 0;
  cursor: pointer;
  font-size: 14px;
  line-height: 30px;
  vertical-align: middle;
  border-radius: 2px;
}
.card-preset-buttons button:hover {
  background: rgba(0, 121, 191, 0.15);
}
</style>
