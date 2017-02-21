import axios from 'axios'

const API_BASE_URL = process.env.NODE_ENV === 'production' ? '//' : 'http://localhost:3013/'

export default {
  get(url, params) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: API_BASE_URL + url,
        withCredentials: true
      }).then(response => {
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
      axios({
        method: 'post',
        url: API_BASE_URL + url,
        data: params,
        withCredentials: true
      }).then(response => {
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
