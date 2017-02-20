import API from './API'

export default {
  getEvents () {
    return API.get('events')
  },
  postEvents (version, transactions) {
    return API.post('events', { version, transactions })
  }
}
