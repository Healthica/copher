const predefined_events = {
  coffee: {
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
}

export default (text) => {
  let event = {}
  const fields = []

  if (typeof predefined_events[text.toLowerCase()] !== undefined) {
    event = predefined_events[text.toLowerCase()]
  }

  return event
}
