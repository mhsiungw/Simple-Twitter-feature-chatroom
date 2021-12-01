import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('simpleTwitter-token')

export default {
  getProfile({ userId }) {
    return apiHelper.get(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getUserTweets({ userId }) {
    return apiHelper.get(`/users/${userId}/tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
}
