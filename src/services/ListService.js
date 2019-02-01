import * as API from './Api'

export default {
  getTodos () {
    return API.get('todos')
  },
  getUsers () {
    return API.get('users')
  }
}
