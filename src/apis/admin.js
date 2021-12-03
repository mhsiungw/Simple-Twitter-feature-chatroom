import { apiHelper } from './../utils/helpers'

export default {
  adminLogin({ email, password }) {
    console.log('adminLogin')
    return apiHelper.post('admin/signin', { email, password })
  },
  getAllUsers() {
    return apiHelper.get('/admin/users')
  }
}