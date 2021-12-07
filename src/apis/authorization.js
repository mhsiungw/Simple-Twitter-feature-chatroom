import { apiHelper } from '../utils/helpers'

export default {
  logIn({ account, password }) {
    return apiHelper.post('/signin', {
      account,
      password
    })
  },
  register({ account, name, password, email, checkPassword }) {
    return apiHelper.post('/users', { account, name, password, email, checkPassword })
  }
}