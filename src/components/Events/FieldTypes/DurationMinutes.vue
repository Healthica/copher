<template>
  <span>
    <div v-if="view === 'row'" class="event-row-field">
      <div class="event-row-field-header">{{ field.title }}</div>
      {{ formattedHours }}
    </div>
    <div v-else-if="view === 'modal'" class="event-modal-field">
      <div class="event-modal-field-header">{{ field.title }}</div>
      <div class="event-modal-field-content">
        <el-input-number v-model="hours" :min="0" :max="23">
          <template slot="prepend">Hours</template>
        </el-input-number>
        <el-input-number v-model="minutes" :min="0" :max="59">
          <template slot="prepend">Minutes</template>
        </el-input-number>
      </div>
    </div>
    <div v-else-if="view === 'modalEdit'" class="event-modal-field">
      <el-button class="el-button--link" icon="caret-top" size="mini" @click="moveFieldUp"></el-button>
      <el-button class="el-button--link" icon="caret-bottom" size="mini" @click="moveFieldDown"></el-button>
      <el-input v-model="field_type" :disabled="true" style="width:120px;"></el-input>
      <el-input placeholder="Field title" v-model="field.title"></el-input>
      <el-button class="el-button--link" icon="close" size="mini" @click="deleteField"></el-button>
    </div>
  </span>
</template>

<script>

export default {
  props: ['field', 'view'],
  data() {
    return {
      field_type: 'Duration',
      hours: Math.round(this.field.value / 60),
      minutes: Math.round(this.field.value % 60)
    }
  },
  computed: {
    formattedHours() {
      const hours = Math.round(this.field.value / 60)
      const minutes = Math.round(this.field.value % 60)
      return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`
    }
  },
  watch: {
    hours() {
      this.updateModel()
    },
    minutes() {
      this.updateModel()
    }
  },
  methods: {
    updateModel() {
      this.field.value = (this.hours * 60) + this.minutes
    },
    deleteField() {
      this.$emit('deleteField')
    },
    moveFieldUp() {
      this.$emit('moveFieldUp')
    },
    moveFieldDown() {
      this.$emit('moveFieldDown')
    }
  }
}
</script>

<style scoped>
.deleteButton {

}
</style>
