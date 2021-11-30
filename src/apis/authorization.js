import { apiHelper } from '../utils/helpers'

export default {
  logIn({ email, password }) {
    return apiHelper.post('/signin', {
      email,
      password
    })
  }
}