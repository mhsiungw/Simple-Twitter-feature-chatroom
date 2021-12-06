<template>
  <div class="main-section">
    <ModalForTweet
      @after-cancel-click="handleAfterTweetCancel"
      @after-tweet-submit="handleAfterTweetSubmit"
      v-if="isTweetClicked"
    />
    <div class="title">首頁</div>
    <div class="part tweet-part">
      <img
        class="avatar"
        :src="initialCurrentUser.image | emptyImage"
        alt="avatar"
        @click="$router.push('/users').catch(() => {})"
      />
      <form @submit.stop.prevent="handleSubmit" class="tweet-form">
        <textarea
          v-model="tweetInput"
          name="tweet"
          id="tweet-input"
          placeholder="有什麼新鮮事？"
          maxlength="140"
        ></textarea>
        <p
          class="word-count"
          :class="{ 'word-limit': tweetInput.length === 140 }"
        >
          {{ tweetInput.length }}/140
        </p>
        <button class="tweet-button" type="submit">推文</button>
      </form>
    </div>
    <div
      v-for="tweet in tweets"
      :key="tweet.id"
      @click.stop.prevent="handleTweetClick(tweet.id)"
      class="part post-part"
    >
      <img
        class="avatar"
        :src="tweet.User.avatar | emptyImage"
        alt="avatar"
        @click.stop="$router.push(`/users/${tweet.UserId}`).catch(() => {})"
      />
      <div class="post">
        <div class="post-title">
          <div class="name">{{ tweet.User.name }}</div>
          <div class="account-name">@{{ tweet.User.account }}</div>
          <span class="dot">．</span>
          <div class="created-time">{{ tweet.createdAt | fromNow }}</div>
        </div>
        <p class="post-desc">
          {{ tweet.description }}
        </p>
        <div class="post-actions">
          <div
            @click.stop.prevent="handleCommentClick(tweet)"
            class="action-item action-comment"
          >
            <font-awesome-icon class="icon" :icon="['far', 'comment']" />
            <span>{{ tweet.Replies.length }}</span>
          </div>
          <div
            v-if="
              tweet.Likes.some((Like) => Like.UserId === initialCurrentUser.id)
            "
            @click.stop.prevent="handleDislikeClick(tweet.id)"
            class="action-item action-like"
          >
            <font-awesome-icon class="icon liked" :icon="['fas', 'heart']" />
            <span>{{ tweet.Likes.length }}</span>
          </div>
          <div
            v-else
            @click.stop.prevent="handleLikeClick(tweet.id)"
            class="action-item action-dislike"
          >
            <font-awesome-icon class="icon" :icon="['far', 'heart']" />
            <span>{{ tweet.Likes.length }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter, emptyImageFilter } from "../utils/mixins.js";
import ModalForTweet from "./ModalForTweet.vue";

export default {
  components: {
    ModalForTweet,
  },
  props: {
    tweets: {
      type: Array,
      required: true,
    },
    initialCurrentUser: {
      type: Object,
      required: true,
    },
    isTweetClicked: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      tweetInput: "",
      showModalForTweet: false,
    };
  },
  mixins: [fromNowFilter, emptyImageFilter],
  methods: {
    handleSubmit() {
      console.log("handleSubmit");
      if (this.tweetInput === "") {
        return window.alert("內容不可空白");
      }
      this.$emit("after-tweet-submit", this.tweetInput);
      this.tweetInput = "";
    },
    handleLikeClick(tweetId) {
      console.log("MainSection handleLikeClick", tweetId);

      //把資料傳到父層，讓父層串 API
      this.$emit("after-like-clicked", tweetId);
    },
    handleDislikeClick(tweetId) {
      console.log("MainSection handleDislikeClick", tweetId);
      //把資料傳到父層，讓父層串 API
      this.$emit("after-dislike-clicked", tweetId);
    },
    handleAfterTweetCancel() {
      this.$emit("after-cancel-click");
    },
    handleAfterTweetSubmit(newTWeet) {
      this.$emit("after-tweet-submit", newTWeet);
    },
    handleTweetClick(tweetId) {
      this.$router.push({ name: "Tweet", params: { id: `${tweetId}` } });
    },
    handleCommentClick(tweet) {
      this.$emit("after-comment-click", tweet);
    },
  },
};
</script>

<style lang="scss" scoped>
.liked {
  color: red;
}

$orange: #ff6600;
.avatar {
  width: 50px;
  min-width: 50px;
  height: 50px;
  min-height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.part {
  padding: 10px 15px 10px 15px;
}

.main-section {
  .title {
    padding: 20px 0 15px 25px;
    font-size: 18px;
    font-weight: 700;
    font-family: monospace;
  }
  .tweet-part {
    border: 1px solid #e6ecf0;
    border-bottom: 10px solid #e6ecf0;
    display: flex;
    width: 100%;
    .tweet-form {
      margin: 0 10px 0 10px;
      display: flex;
      flex-direction: column;
      width: 100%;
      .word-count {
        color: gray;
        font-family: monospace;
        font-size: 12px;
        align-self: flex-end;
        margin: 0;
        margin-right: 14px;
        &.word-limit {
          color: red;
        }
      }
      #tweet-input {
        resize: none;
        height: 100px;
        overflow: auto;
        border: none;
        outline: none;
        font-size: 18px;
        letter-spacing: 2px;
        padding: 5px;
        color: #1c1c1c;
      }
      .tweet-button {
        width: 66px;
        height: 40px;
        background: $orange;
        align-self: flex-end;
        border-radius: 20px;
        border: none;
        outline: none;
        color: white;
        cursor: pointer;
        font-family: monospace;
        padding: 10px 15px;
      }
    }
  }
}

.post-part {
  border: 1px solid #e6ecf0;
  display: flex;
  cursor: pointer;
  .post {
    margin: 0 10px 0 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .post-title {
      display: flex;
      width: 50%;
      font-size: 15px;
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
      width: 100%;
      word-break: break-word;
      // border: 1px solid red;
      margin-top: 6px;
      word-spacing: 1px;
    }
    .post-actions {
      width: 200px;
      justify-content: space-between;
      display: flex;
      .action-item {
        cursor: pointer;
        flex: 1;
        line-height: 13px;
        color: #657786;
        font-size: 14px;
        font-weight: 500;
        .icon {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
