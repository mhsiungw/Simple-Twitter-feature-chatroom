import { apiHelper } from './../utils/helpers'

export default {
  likeTweet({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/like`)
  },
  unlikeTweet({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/unlike`)
  }
}
