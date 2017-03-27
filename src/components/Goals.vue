<template>
  <div class="goals">
    <h2>Goals</h2>
    <el-dialog v-model="goalModalVisible" @close="closeGoalModal">
      <goal-edit-modal :goal="goalCopy" @close="closeGoalModal"></goal-edit-modal>
    </el-dialog>
    <speed-dial class="new-goal" :items="newGoalItems" @open="createGoal"></speed-dial>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GoalEditModal from './Goals/GoalEditModal'
import SpeedDial from './Utils/SpeedDial'

export default {
  components: {
    GoalEditModal,
    SpeedDial
  },
  computed: {
    ...mapGetters([])
  },
  methods: {
    createGoal(goal) {
      //TODO create new goal
      const id = 1234
      this.showGoalModal(id)
    },
    closeGoalModal() {
      this.goalModalVisible = false
    },
    showGoalModal(id) {
      //TODO clone from store
      this.goalCopy = _.cloneDeep({ id: id, title: 'Goal Name' })
      this.openGoalModal()
    },
    openGoalModal() {
      this.goalModalVisible = true
      this.goalCopyUnwatcher = this.$watch('goalCopy', this.onChangeGoal, { deep: true })
    },
    closeGoalModal() {
      this.eventModalVisible = false
    },
    closeGoalModal() {
      this.goalCopyUnwatcher()
      this.goalCopyUnwatcher = null
      if (this.goalCopy._isDeleted !== true) {
        this.$store.dispatch('updateEventAddTransaction', _.cloneDeep(this.goalCopy))
      }
    },
    onChangeGoal(e) {
      this.$store.dispatch('setGoal', e)
    }
  },
  data() {
    return {
      goalModalVisible: false,
      goalCopy: {},
      goalCopyUnwatcher: null,
      newGoalItems: [
        {
          title: 'Add New Goal',
          color: 'primary',
          icon: 'plus',
          data: 1
        }, {
          title: 'Weekly Goal',
          color: 'red',
          icon: 'calendar',
          data: 2
        }, {
          title: 'One-Time Goal',
          color: 'green',
          icon: 'mountain-goal',
          data: 3
        }
      ]
    }
  }
}
</script>

<style>
.goals {
  height: 100%;
  overflow-y: scroll;
  background-color: #EDEFF4;
}
.goals::-webkit-scrollbar {
  display: none;
}
.new-goal {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
