import { apiHelper } from './../utils/helpers'

export default {
  addFollowing({ userId }) {
    return apiHelper.post('/followships', { id: userId })
  },
  deleteFollowing({ userId }) {
    return apiHelper.delete(`/followships/${userId}`)
  }
}
