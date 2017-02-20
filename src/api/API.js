import axios from 'axios'

const API_BASE_URL = process.env.NODE_ENV === 'production' ? '//' : 'http://localhost:3013/'

export default {
  get(url, params) {
    return new Promise((resolve, reject) => {
      axios.get(API_BASE_URL + url)
        .then(response => {
          if (response.data.success === true) {
            resolve(response.data)
          } else if (response.data) {
            reject(response.data)
          } else {
            reject(response)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  post(url, params) {
    return new Promise((resolve, reject) => {
      axios.post(API_BASE_URL + url, params)
        .then(response => {
          if (response.data.success === true) {
            resolve(response.data)
          } else if (response.data) {
            reject(response.data)
          } else {
            reject(response)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
