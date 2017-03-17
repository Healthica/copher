import axios from 'axios'

const API_BASE_URL = process.env.NODE_ENV === 'production' ? '/api/' : 'http://localhost:3013/'

export default {
  baseUrl() {
    return API_BASE_URL
  },
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
  post(url, params, wwwFormUrlEncode) {
    return new Promise((resolve, reject) => {
      const formParams = new URLSearchParams()
      for (let k in params) {
        formParams.append(k, params[k])
      }
      axios({
        method: 'post',
        url: API_BASE_URL + url,
        data: wwwFormUrlEncode === true ? formParams : params,
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
