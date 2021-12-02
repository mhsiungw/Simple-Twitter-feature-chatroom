import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('simpleTwitter-token')

export default {
  getTweets() {
    return apiHelper.get('/tweets')
  },

  getTweet({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
}
