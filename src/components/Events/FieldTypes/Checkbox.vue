<template>
  <span>
    <div v-if="view === 'row'" class="event-row-field">
      <div class="event-row-field-header">{{ field.title }}</div>
      {{ textValues }}
    </div>
    <div v-else-if="view === 'modal'" class="event-modal-field">
      <div class="event-modal-field-header">{{ field.title }}</div>
      <el-checkbox-group v-model="field.value">
        <el-checkbox :label="o" v-for="o in field.options.options">{{ o }}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div v-else-if="view === 'modalEdit'">
      <a @click="showOptions = !showOptions" class="no-link">
        <i v-if="showOptions" class="el-icon-caret-bottom"></i>
        <i v-else class="el-icon-caret-right"></i>
        Options
      </a>
      <div v-if="showOptions">
        <div v-for="(o, i) in field.options.options" class="checkbox-edit-option">
          <el-input class="checkbox-edit-option-input" v-model="field.options.options[i]"></el-input>
          <el-button class="el-button--link" icon="close" size="mini" @click="removeOption(i)"></el-button>
        </div>
        <el-button class="checkbox-options-add el-button--link" icon="plus" size="mini" @click="addOption">Add Option</el-button>
      </div>
    </div>
  </span>
</template>

<script>

export default {
  props: ['field', 'view'],
  computed: {
    textValues() {
      if (this.field.value.length === this.field.options.options.length) {
        return 'All'
      } else if (this.field.value.length > 0) {
        return this.field.value.join(', ')
      } else {
        return 'None'
      }
    }
  },
  methods: {
    addOption() {
      this.field.options.options.push('')
    },
    removeOption(i) {
      this.field.options.options.splice(i, 1)
    }
  },
  data() {
    return {
      showOptions: false
    }
  }
}
</script>

<style scoped>
.checkbox-edit-option {
  display: flex;
}
.checkbox-edit-option-input {
  font-size: 12px;
  max-width: 200px;
}
.checkbox-edit-option .el-button--link {
  font-size: 8px;
}
.checkbox-options-add {
  margin-top: 6px;
  font-size: 10px;
}
</style>
