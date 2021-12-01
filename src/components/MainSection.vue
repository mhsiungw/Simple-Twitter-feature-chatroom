<template>
  <div class="main-section">
    <div class="title">首頁</div>
    <div class="part tweet-part">
      <img
        class="avatar"
        src="https://cdn.vox-cdn.com/thumbor/JgCPp2BBxETY596wCp50ccosCfE=/0x0:2370x1574/1200x800/filters:focal(996x598:1374x976)/cdn.vox-cdn.com/uploads/chorus_image/image/68870438/Screen_Shot_2020_07_21_at_9.38.25_AM.0.png"
        alt="avatar"
      />
      <form class="tweet-form">
        <textarea
          name="tweet"
          id="tweet-input"
          placeholder="有什麼新鮮事？"
        ></textarea>
        <button class="tweet-button" type="submit">推文</button>
      </form>
    </div>
    <div v-for="tweet in tweets" :key="tweet.id" class="part post-part">
      <img class="avatar" :src="tweet.User.avatar" alt="avatar" />
      <div class="post">
        <div class="post-title">
          <div class="name">{{ tweet.User.name }}</div>
          <div class="acount-name">@{{ tweet.User.account }}</div>
          <span class="dot">．</span>
          <div class="time">{{ tweet.createdAt | fromNow }}</div>
        </div>
        <p class="post-detail">
          {{ tweet.description }}
        </p>
        <div class="post-actions">
          <div class="action-item action-comment">
            <font-awesome-icon class="icon" :icon="['far', 'comment']" />
            <span>13</span>
          </div>
          <div class="action-item action-like">
            <font-awesome-icon class="icon" :icon="['far', 'heart']" />
            <span>13</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from "../utils/mixins.js";

export default {
  props: {
    tweets: {
      type: Array,
      required: true,
    },
  },
  mixins: [fromNowFilter],
};
</script>


<style scoped lang="scss">
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
  border: 1px solid #e6ecf0;
  width: 600px;
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
      .acount-name,
      .time {
        white-space: nowrap;
        color: #657786;
      }
    }
    .post-detail {
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