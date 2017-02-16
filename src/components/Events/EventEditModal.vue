<template>
  <div class="modal" @keyup.enter="close">
    <div class="headerButtons">
      <div class="editFields">Edit Fields</div>
      <div class="closeButton" @click="close">&times;</div>
    </div>
    <el-input class="eventModalTitle" placeholder="Event title" v-model="event.title"></el-input>
    <p>
      <el-date-picker
        v-model="event.time"
        type="datetime"
        :clearable="false">
      </el-date-picker>
    </p>
    <field-view class="event-field" v-for="f in event.fields" :field="f" view="modal"></field-view>
  </div>
</template>

<script>
import FieldView from './FieldView'

export default {
  props: ['event'],
  components: {
    FieldView
  },
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
  position: relative;
  top: 2px;
}
.closeButton {
  font-size: 20px;
}
</style>
