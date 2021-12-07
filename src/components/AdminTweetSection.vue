<template>
  <div class="tweet-section">
    <div class="title">推文清單</div>
    <div class="tweet-list">
      <div v-for="tweet in tweets" :key="tweet.id" class="list-item">
        <img class="avatar" :src="tweet.User.avatar" alt="avatar" />
        <div class="post">
          <div class="post-title">
            <p class="name">{{ tweet.User.name }}</p>
            <p class="account-name">@{{ tweet.User.account }}</p>
            <span class="dot">．</span>
            <p class="created-time">{{ tweet.createdAt | fromNow }}</p>
          </div>
          <div class="post-desc">{{ tweet.description }}</div>
        </div>

        <button
          class="delelte-button"
          @click.stop.prevent="handleDeleteClick(tweet.id)"
        >
          X
        </button>
      </div>
    </div>
  </div>
</template>
  
<script>
import { mapState } from "vuex";
import { fromNowFilter } from "../utils/mixins";

export default {
  computed: {
    ...mapState(["currentUser"]),
  },
  props: {
    tweets: {
      type: Array,
      required: true,
    },
  },
  mixins: [fromNowFilter],
  methods: {
    handleDeleteClick(tweetId) {
      this.$emit("after-delete-click", tweetId);
    },
  },
};
</script>

  <style scoped lang="scss">
.tweet-section {
  border: 1px solid #e6ecf0;
  .title {
    padding: 14px 0 14px 20px;
    border-bottom: 1px solid #e6ecf0;
    font-size: 18px;
    font-weight: 700;
    font-family: monospace;
  }
  .tweet-list {
    border-bottom: 1px solid #e6ecf0;
    display: flex;
    flex-direction: column;
    .list-item {
      // 用來推 border
      border-bottom: 1px solid #e6ecf0;
      padding-top: 20px;
      padding-bottom: 15px;
      padding-left: 20px;
      // 用來推 border
      display: flex;
      align-items: center;
      .avatar {
        width: 50px;
        min-width: 50px;
        height: 50px;
        min-height: 50px;
        border-radius: 50%;
        object-fit: cover;
      }
      .post {
        // border: 1px solid red;
        margin: 0 10px 0 10px;
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: flex-start;
        .post-title {
          // border: 1px solid red;
          display: flex;
          font-size: 15px;
          height: 24px;
          .name {
            font-weight: 500;
            margin-right: 5px;
          }
          .account-name,
          .created-time {
            white-space: nowrap;
            color: #657786;
          }
        }
        .post-desc {
          width: 80%;
          word-break: break-word;
          // border: 1px solid red;
        }
      }
      .delelte-button {
        width: 40px;
        height: 25px;
        align-self: flex-start;
        text-align: center;
        line-height: 12.5px;
        font-size: 20px;
        font-weight: 500;
        background: #fff;
        color: #657786;
        border: none;
      }
    }
  }
}
</style>