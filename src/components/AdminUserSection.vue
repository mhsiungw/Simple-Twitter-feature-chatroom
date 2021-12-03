<template>
  <div class="user-section">
    <div class="title">使用者列表</div>
    <div class="user-cards">
      <div class="card-item">
        <img :src="currentUser.cover" alt="cover" class="cover" />
        <img :src="currentUser.image" alt="avatar" class="avatar" />
        <div class="title">
          <p class="name">{{ currentUser.name }}</p>
          <p class="name">@{{ currentUser.account }}</p>
        </div>
        <div class="detail">
          <div class="chat-like">
            <div class="chat">
              <font-awesome-icon class="icon" :icon="['far', 'comment']" />
              <span>13</span>
            </div>
            <div class="like">
              <font-awesome-icon class="icon" :icon="['far', 'heart']" />
              <span>13</span>
            </div>
          </div>
          <div class="following-followers">
            <div class="following">
              <p>34 個跟隨中</p>
            </div>
            <div class="followers">
              <p>34 個跟隨者</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["currentUser"]),
  },
};
</script>

<style scoped lang="scss">
.user-section {
  border: 1px solid #e6ecf0;
  .title {
    padding: 14px 0 14px 20px;
    border-bottom: 1px solid #e6ecf0;
    font-size: 18px;
    font-weight: 700;
    font-family: monospace;
  }
  .user-cards {
    border: 1px solid red;
    margin-top: 30px;
    margin-left: 20px;
  }
}
</style>