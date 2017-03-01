import API from './API'

export default {
  getCharts () {
    return API.get('charts')
  },
  postCharts (charts) {
    return API.post('charts', { charts })
  }
}
