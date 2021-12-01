import { apiHelper } from '../utils/helpers'

export default {
  logIn({ email, password }) {
    return apiHelper.post('/signin', {
      email,
      password
    })
  },
  register({ account, name, password, email, checkPassword }) {
    console.log('register API')
    return apiHelper.post('/users', { account, name, password, email, checkPassword })
  }
}