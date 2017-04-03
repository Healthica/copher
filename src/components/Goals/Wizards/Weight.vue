<template>
  <div>
    <h3 class="text-center text-light">{{ goal.title }}</h3>
    <el-form label-position="left" label-width="150px">
      <el-form-item class="goal-wizard-modal-row" label="Current weight">
        <el-input v-model="goal.startingValue"></el-input>
        <el-select v-model="goal.valueUnits" placeholder="Select">
          <el-option label="Kilogram" value="Kilogram"></el-option>
          <el-option label="Pounds" value="Pounds"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="goal-wizard-modal-row" label="Target weight">
        <el-input v-model="goal.targetValue"></el-input>
        <el-select v-model="goal.valueUnits" placeholder="Select">
          <el-option label="Kilogram" value="Kilogram"></el-option>
          <el-option label="Pounds" value="Pounds"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Reach this weight by">
        <el-date-picker
          v-model="goal.time_end"
          type="date"
          placeholder="Pick a day">
        </el-date-picker>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['goal']
}
</script>

<style>
</style>
