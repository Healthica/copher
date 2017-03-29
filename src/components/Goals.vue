<template>
  <div class="goals">
    <div v-if="goals.goals.length === 0" class="goals-empty-message">
      <p>Goals track events in your log and show your progress.</p>
      <p>For a quick start, select one of the presets below.</p>
    </div>
    <div class="goal-items-container">
      <goal-item v-for="g in goals.goals" :goal="g" @open="showGoalModal"></goal-item>
    </div>
    <el-dialog custom-class="modalContainer" v-model="goalModalVisible" @close="closeGoalModal" size="large" :close-on-click-modal="false">
      <goal-edit-modal :goal="goalCopy" @save="saveGoalModal" @close="closeGoalModal" @deleteGoal="deleteGoalModal"></goal-edit-modal>
    </el-dialog>
    <div class="margin-top-120">
      <h4>Goal Presets</h4>
      <presets :items="goalPresets" @open="presetOpen"></presets>
    </div>
    <speed-dial class="new-goal" :items="newGoalItems" @open="createGoal"></speed-dial>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import uuid from 'uuid'
import moment from 'moment'

import GoalEditModal from './Goals/GoalEditModal'
import GoalItem from './Goals/GoalItem'
import Presets from './Helpers/Presets'
import SpeedDial from './Utils/SpeedDial'

export default {
  components: {
    GoalEditModal,
    GoalItem,
    Presets,
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
        title: 'New Goal',
        type: 'one_time',
        time_end: moment().add(1, 'month').endOf('month'),
        recurring_period: 'daily'
      }, goal))
      this.showGoalModal(id)
    },
    showGoalModal(id) {
      this.goalCopy = _.cloneDeep(_.find(this.goals.goals, g => g.id === id ))
      this.goalModalVisible = true
    },
    saveGoalModal() {
      this.$store.dispatch('updateGoal', this.goalCopy)
    },
    deleteGoalModal() {
      this.$store.dispatch('deleteGoal', this.goalCopy.id)
    },
    closeGoalModal() {
      this.goalModalVisible = false
      this.goalCopy = {}
    },
    presetOpen(goal) {
      this.createGoal(goal.goal)
    }
  },
  data() {
    return {
      goalModalVisible: false,
      goalCopy: {},
      goalPresets: [
        {
          title: 'Lose Weight',
          description: 'Set your target weight you want to reach in 30 days',
          img: 'girl_cook',
          openText: 'Add This Goal',
          goal: {
            title: 'Lose Weight'
          }
        }, {
          title: 'Exercise twice a week',
          description: 'Maintaining an active lifestyle has many benefits',
          img: 'cyclist',
          openText: 'Add This Goal',
          goal: {
            title: 'Exercise'
          }
        }
      ],
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
  padding: 24px;
}
.goals::-webkit-scrollbar {
  display: none;
}
.new-goal {
  position: absolute;
  bottom: 0;
  right: 0;
}
.goal-items-container {
  display: flex;
  flex-wrap: wrap;
}
@media screen and (max-width: 768px) {
  .goal-items-container {
    margin-top: 48px;
  }
}
.goal-items-container .goal-item {
  margin-right: 24px;
  margin-bottom: 24px;
}
.goals-empty-message {
  text-align: center;
  padding: 24px;
}
</style>
