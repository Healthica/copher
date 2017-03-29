<template>
  <div class="modal">
    <input type="text" v-model="goal.title" />
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
      <el-button @click="deleteGoal" type="danger" size="small">Delete</el-button>
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
    }
  }
}
</script>

<style>
</style>
