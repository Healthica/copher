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
  getUser() {
    return API.get('user')
  }
}
