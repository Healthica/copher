import API from './API'

export default {
  getGoals () {
    // return API.get('goals')
    return new Promise((resolve, reject) => {
      resolve({
        goals: [
          {
            id: 333,
            title: 'GoalGoalGoal'
          }
        ]
      })
    })
  },
  postGoals (goals) {
    // return API.post('goals', { goals })
    return new Promise((resolve, reject) => {
      resolve({
        success: true
      })
    })
  }
}
