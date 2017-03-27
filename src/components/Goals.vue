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
import uuid from 'uuid'

import GoalEditModal from './Goals/GoalEditModal'
import SpeedDial from './Utils/SpeedDial'

export default {
  components: {
    GoalEditModal,
    SpeedDial
  },
  computed: {
    ...mapGetters(['goals'])
  },
  methods: {
    createGoal(goal) {
      const id = uuid.v4()
      this.$store.dispatch('addGoal', Object.assign({
        id: id,
        title: 'New Goal'
      }, goal))
      this.showGoalModal(id)
    },
    showGoalModal(id) {
      this.goalCopy = _.cloneDeep(_.find(this.goals.goals, g => g.id === id ))
      this.openGoalModal()
    },
    openGoalModal() {
      this.goalModalVisible = true
      this.goalCopyUnwatcher = this.$watch('goalCopy', this.onChangeGoal, { deep: true })
    },
    closeGoalModal() {
      if (this.goalCopyUnwatcher) {
        this.goalCopyUnwatcher()
        this.goalCopyUnwatcher = null
      }
      //TODO update API
      this.goalModalVisible = false
    },
    onChangeGoal(e) {
      console.log('onChangeGoal', e)
      // this.$store.dispatch('setGoal', e)
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
          data: {
            title: 'New Goal'
          }
        }, {
          title: 'Weekly Goal',
          color: 'red',
          icon: 'calendar',
          data: {
            title: 'Weekly Goal'
          }
        }, {
          title: 'One-Time Goal',
          color: 'green',
          icon: 'mountain-goal',
          data: {
            title: 'One-Time Goal'
          }
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
