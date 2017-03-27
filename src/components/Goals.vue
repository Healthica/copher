<template>
  <div class="goals">
    <h2>Goals</h2>
    <speed-dial class="new-goal" :items="newGoalItems" @open="createGoal"></speed-dial>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SpeedDial from './Utils/SpeedDial'

export default {
  components: {
    SpeedDial
  },
  computed: {
    ...mapGetters([])
  },
  methods: {
    createGoal(goal) {
      console.log('goal', goal)
    }
  },
  data() {
    return {
      newGoalItems: [
        {
          title: 'Add New Goal',
          color: 'primary',
          icon: 'plus',
          data: 1
        }, {
          title: 'Weekly Goal',
          color: 'red',
          icon: 'plus',
          data: 2
        }, {
          title: 'One-Time Goal',
          color: 'green',
          icon: 'plus',
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
