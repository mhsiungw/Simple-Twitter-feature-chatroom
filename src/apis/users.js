import { apiHelper } from './../utils/helpers'

export default {
  getProfile({ userId }) {
    return apiHelper.get(`/users/${userId}`)
  },
  getUserTweets({ userId }) {
    return apiHelper.get(`/users/${userId}/tweets`)
  },
  getUserReplies({ userId }) {
    return apiHelper.get(`/users/${userId}/replied_tweets`)
  },
  getUserLikes({ userId }) {
    return apiHelper.get(`/users/${userId}/likes`)
  },
  updateUser({ userId, formData }) {
    return apiHelper.put(`/users/${userId}`, formData)
  },
  getCurrentUser() {
    return apiHelper.get('/users/currentUser')
  },
  getFollowings({ userId }) {
    return apiHelper.get(`/users/${userId}/followings`)
  },
  getFollowers({ userId }) {
    return apiHelper.get(`/users/${userId}/followers`)
  },
  getTopUsers() {
    return apiHelper.get('/users/topUsers')
  },
  editUserInfo(userId, newUserInfo) {
    //console.log("editUserInfo", userId, { ...newUserInfo });
    return apiHelper.put(`/users/${userId}/edit `, { ...newUserInfo })
  }
}
