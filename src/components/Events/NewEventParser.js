// import nlp from 'compromise'

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
  }
}

export default (text) => {
  let event = {}
  const fields = []

  // const r = nlp(text)
  // console.log('verbs', r.verbs().data())
  // console.log('nouns', r.nouns().data())
  // console.log('places', r.places().data())
  // console.log('dates', r.dates().data())
  // console.log('values', r.values().data())
  // console.log('people', r.people().data())

  if (typeof predefined_events[text.toLowerCase()] !== undefined) {
    event = predefined_events[text.toLowerCase()]
  }

  return event
}
