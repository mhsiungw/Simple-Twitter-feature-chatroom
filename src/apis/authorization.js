import { apiHelper } from '../utils/helpers'

export default {
  logIn({ account, password }) {
    return apiHelper.post('/signin', {
      account,
      password
    })
  },
  register({ account, name, password, email, checkPassword }) {
    //console.log('register API')
    return apiHelper.post('/users', { account, name, password, email, checkPassword })
  }
}