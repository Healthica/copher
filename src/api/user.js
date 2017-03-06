import API from './API'

export default {
  login ({ login, password }) {
    return API.post('login', {
      login: login,
      password: password
    }, true)
  },
  logout() {
    return API.get('logout')
  },
  register({ login, password, name }) {
    return API.post('register', {
      login: login,
      password: password,
      name: name
    }, true)
  },
  update({ name }) {
    return API.post('profile/update', {
      name: name
    })
  },
  getUser() {
    return API.get('user')
  },
  downloadDataUrl(fields) {
    const query = Object.keys(fields)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(fields[k])).join('&')
    return API.baseUrl() + 'download' + '?' + query
  }
}
