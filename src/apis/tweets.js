import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('simpleTwitter-token')

export default {
  async getTweets() {
    return apiHelper.get('/tweets', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },

  async getTweet({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },

  postTweet({ userId, description }) {
    return apiHelper.post('/tweets', { userId, description })
  }
}
