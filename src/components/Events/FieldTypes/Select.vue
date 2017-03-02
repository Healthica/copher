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
        <el-select v-model="field.value" :popper-class="isDeleteMode ? 'deleteMode' : null"
          :filterable="true" :allow-create="true" placeholder="Select"
          @change="onSelectChange">
          <el-option
            v-for="(o, i) in field.options.options"
            :label="o"
            :value="o">
            {{ o }}
            <span @mouseover="isDeleteMode = true" @mouseout="isDeleteMode = false">
              <el-button class="el-button--link field-options-remove-option-btn" icon="close" size="mini" @click.stop="removeOption(i)"></el-button>
            </span>
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
      if (this.field.value === this.field.options.options[i]) {
        this.field.value = ''
      }
      this.field.options.options.splice(i, 1)
      this.isDeleteMode = false
    },
    onSelectChange(option) {
      if (option === '' || this.isDeleteMode) {
        return
      } else if (_.indexOf(this.field.options.options, option) === -1) {
        this.field.options.options.push(option)
      }
    }
  },
  data() {
    return {
      showOptions: false,
      isDeleteMode: false
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
