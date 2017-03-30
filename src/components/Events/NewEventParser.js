import uuid from 'uuid'

const predefined_events = {
  coffee: {
    title: 'Coffee',
    fields: [{
      title: 'Type',
      type: 'select',
      value: 'Espresso',
      options: {
        options: [
          'Espresso',
          'Instant',
          'Capsules',
          'Drip/Filtered',
          'French Press',
          'Turkish'
        ]
      }
    }, {
      title: 'Milk',
      type: 'select',
      value: 'None',
      options: {
        options: [
          'None',
          'Cold',
          'Skim',
          'Soy'
        ]
      }
    }, {
      title: 'Size',
      type: 'select',
      value: 'Regular',
      options: {
        options: [
          'Small',
          'Regular',
          'Large',
          'Extra Large'
        ]
      }
    }, {
      title: 'Sugar',
      type: 'weight',
      value: 0,
      options: {
        units: 'Teaspoon'
      }
    }, {
      title: 'Decaffeinated',
      type: 'switch',
      value: false
    }]
  },

  sleep: {
    title: 'Sleep',
    fields: [{
      title: 'Duration',
      type: 'duration',
      value: 420
    }, {
      title: 'Fall Asleep',
      type: 'duration',
      value: 20
    }, {
      title: 'Quality',
      type: 'rank_stars',
      value: 3
    }]
  },

  weight: {
    title: 'Weight Measurement',
    fields: [{
      title: 'Weight',
      type: 'weight',
      value: '70',
      options: {
        units: 'Kilogram'
      }
    }]
  },

  run: {
    title: 'Run',
    fields: [{
      title: 'Time',
      type: 'duration',
      value: 30
    }, {
      title: 'Distance',
      type: 'length',
      value: 4,
      options: {
        units: 'Kilometer'
      }
    }]
  },

  headache: {
    title: 'Headache',
    fields: [{
      title: 'Duration',
      type: 'duration',
      value: 10
    }, {
      title: 'Intensity',
      type: 'select',
      value: 5,
      options: {
        customOptions: false,
        options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      }
    }, {
      title: 'Notes',
      type: 'text',
      value: ''
    }]
  },
}

export default (text) => {
  let event = {}
  const fields = []

  if (typeof predefined_events[text.toLowerCase()] !== undefined) {
    event = predefined_events[text.toLowerCase()]
    if (_.has(event, 'fields')) {
      _.each(event.fields, f => {
        f.id = uuid.v4()
      })
    }
  }

  return event
}
