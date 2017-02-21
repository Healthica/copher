import API from './API'

export default {
  login (login, password) {
    return API.post('login', {
      login: login,
      password: password
    })
  },
  logout() {
  },
  register() {
  }
}
