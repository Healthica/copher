/**
 * Mocking client-server processing
 */
const _events = {
  success: true,
  version: 1,
  events: [
    {"id": 1, "title": "Headache"},
    {"id": 2, "title": "Weight Measurement"},
    {"id": 3, "title": "Sleep"}
  ]
}
const _events_new_version = {
  success: false,
  has_new_version: true,
  errors: [
    { id: 'events_merged_new_version', text: 'New version exists, reload to sync' }
  ]
}
const _events_errors = {
  success: false,
  errors: [
    { id: 'something_went_wrong', text: 'Something went wrong!' },
    { id: 'some_error', text: 'Old server version' }
  ]
}

export default {
  getEvents (version) {
    return new Promise((resolve, reject) => {
      console.log('Requesting events since version ' + version);
      setTimeout(() => {
        resolve(Object.assign(_events, { version: version + 1 }))
        // reject(_events_new_version)
        // reject(_events_errors)
      }, 100)
    })
  }
}
