<template>
  <span>
    <div v-if="view === 'row'" class="event-row-field">
      <div class="event-row-field-header">{{ field.title }}</div>
      {{ field.value }}
    </div>
    <div v-else-if="view === 'modal'" class="event-modal-field">
      <div class="event-modal-field-header">{{ field.title }}</div>
      <el-select v-model="field.value" placeholder="Select">
        <el-option
          v-for="o in field.options.options"
          :label="o"
          :value="o">
        </el-option>
      </el-select>
    </div>
    <div v-else-if="view === 'modalEdit'" class="select-options">
      <div>
        <div v-for="(o, i) in field.options.options" class="select-edit-option">
          <el-input class="select-edit-option-input" v-model="field.options.options[i]"></el-input>
          <el-button class="el-button--link" icon="close" size="mini" @click="removeOption(i)"></el-button>
        </div>
      </div>
      <el-button class="select-options-add el-button--link" icon="plus" size="mini" @click="addOption">Add Option</el-button>
    </div>
  </span>
</template>

<script>

export default {
  props: ['field', 'view'],
  methods: {
    addOption() {
      this.field.options.options.push('')
    },
    removeOption(i) {
      this.field.options.options.splice(i, 1)
    }
  }
}
</script>

<style scoped>
.select-options {
  margin-top: 6px;
  margin-left: 50px;
}
.select-edit-option {
  display: flex;
}
.select-edit-option-input {
  font-size: 12px;
  max-width: 200px;
}
.select-edit-option .el-button--link {
  font-size: 8px;
}
.select-options-add {
  margin-top: 6px;
  font-size: 10px;
}
</style>
