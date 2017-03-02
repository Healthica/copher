<template>
  <span>
    <div v-if="view === 'row'" class="event-row-field">
      <div class="event-row-field-header">{{ field.title }}</div>
      {{ field.value }}
    </div>
    <div v-else-if="view === 'modal'" class="event-modal-field">
      <div class="event-modal-field-header">
        <el-input placeholder="Field title" v-model="field.title"></el-input>
      </div>
      <span ref="selectContainer">
        <el-select v-model="field.value" :popper-class="isCtrlSelect ? 'deleteMode' : null"
          :filterable="!isCtrlSelect" :allow-create="true" placeholder="Select"
          @change="onSelectChange" @visible-change="onSelectToggle">
          <el-option
            v-for="o in field.options.options"
            :label="o"
            :value="o">
          </el-option>
        </el-select>
      </span>
    </div>
  </span>
</template>

<script>

export default {
  props: ['field', 'view'],
  methods: {
    removeOption(i) {
      this.field.options.options.splice(i, 1)
    },
    onSelectChange(option) {
      if (option === '') {
        return
      } else if (this.isCtrlSelect) {
        this.removeOption(_.indexOf(this.field.options.options, option), 1)
        this.field.value = ''
      } else if (_.indexOf(this.field.options.options, option) === -1) {
        this.field.options.options.push(option)
      }
    },
    onSelectToggle(is_open) {
      if (is_open) {
        this.$refs['selectContainer'].addEventListener("click", this.handleClick, false)
      } else {
        this.$refs['selectContainer'].removeEventListener("click", this.handleClick)
        this.isCtrlSelect = false
      }
    },
    handleClick(e) {
      if (e.ctrlKey === true) {
        this.isCtrlSelect = true
      } else {
        this.isCtrlSelect = false
      }
    }
  },
  data() {
    return {
      showOptions: false,
      isCtrlSelect: false
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
