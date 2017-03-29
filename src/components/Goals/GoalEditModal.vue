<template>
  <div class="modal">
    <div class="headerButtons">
      <el-dropdown class="modalEditActionsDropdown" trigger="click" @command="goalAction">
        <el-button class="el-button--link" size="small">
          <i class="el-icon-more"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="delete"><i class="el-icon-delete"></i>Delete</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="eventModalHeader">
      <el-input class="eventModalTitle" placeholder="Goal title" v-model="goal.title"></el-input>
    </div>
    <p class="text-small">{{ goal.id }}</p>
    <div>
      Type
      <el-select v-model="goal.type" placeholder="Select">
        <el-option label="One Time" value="one_time"></el-option>
        <el-option label="Recurring" value="recurring"></el-option>
      </el-select>
    </div>
    <div v-if="goal.type === 'one_time'">
      Deadline
      <el-date-picker
        v-model="goal.time_end"
        type="date"
        placeholder="Pick a day">
      </el-date-picker>
    </div>
    <div v-if="goal.type === 'recurring'">
      Start Over
      <el-select v-model="goal.recurring_period" placeholder="Select">
        <el-option label="Daily" value="daily"></el-option>
        <el-option label="Weekly" value="weekly"></el-option>
        <el-option label="Monthly" value="monthly"></el-option>
      </el-select>
    </div>
    <div>
      Goal
      Event/Field
      Operator
      Value
    </div>
    <div class="close-modal-button">
      <el-button @click="close" type="text" size="small" :plain="true">Cancel</el-button>
      <el-button @click="save" type="success">Save</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['goal'],
  data() {
    return {
      editMode: false
    }
  },
  computed: {
  },
  methods: {
    save() {
      this.$emit('save')
      this.close()
    },
    deleteGoal() {
      this.$emit('deleteGoal')
      this.close()
    },
    close() {
      this.$emit('close')
    },
    goalAction(action) {
      switch(action) {
        case 'delete':
          this.deleteGoal()
          break;
        default:
          console.error('Unknown action', action)
      }
    }
  }
}
</script>

<style>
</style>
