import { apiHelper } from './../utils/helpers'

export default {
  adminLogin({ account, password }) {
    return apiHelper.post('admin/signin', { account, password })
  },
  getAllUsers() {
    return apiHelper.get('/admin/users')
  },
  getCurrentAdmin() {
    return apiHelper.get('admin/users/currentUser')
  },
  getAllTweets() {
    return apiHelper.get('admin')
  },
  deleteTweet(tweetId) {
    return apiHelper.delete(`admin/tweets/${tweetId}`)
  }
}