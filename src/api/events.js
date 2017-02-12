/**
 * Mocking client-server processing
 */
const _events = [
  {"id": 1, "title": "Headache"},
  {"id": 2, "title": "Weight Measurement"},
  {"id": 3, "title": "Sleep"}
]

export default {
  getEvents (cb) {
    setTimeout(() => cb(_events), 100)
  }
}
