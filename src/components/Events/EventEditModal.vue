<template>
  <div class="modal">
    <div class="headerButtons">
      <div class="editFields">Edit Fields</div>
      <div class="closeButton" @click="close">&times;</div>
    </div>
    {{ event.id }}
    <p>
      <input type="text" v-model="event.title" />
    </p>
    <p>
      <el-date-picker
        v-model="event.time"
        type="datetime"
        placeholder="Select date and time">
      </el-date-picker>
    </p>
  </div>
</template>

<script>
export default {
  props: ['event'],
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal {
  padding: 36px 24px;
  position: relative;
}
.headerButtons {
  position: absolute;
  top: 0;
  right: 0;
}
.headerButtons > div {
  display: inline-block;
  padding: 6px 12px;
  opacity: 0.8;
  vertical-align: middle;
  cursor: pointer;
}
.headerButtons > div:hover {
  opacity: 1;
}
.editFields {
  font-size: 14px;
}
.closeButton {
  font-size: 20px;
}
</style>
