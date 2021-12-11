import { apiHelper } from '../utils/helpers'

export default {
  getPrivateChatRoom({ userId }) {
    return apiHelper.get(`/private/${userId}`)
  },
}
