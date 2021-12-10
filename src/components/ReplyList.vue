<template>
  <div class="reply-main" v-if="tweet && replies && likes">
    <div class="upper">
      <img
        class="arrow"
        src="../assets/imgs/Vector@2x.png"
        alt="Vector"
        @click="$router.go(-1)"
      />
      <span>推文</span>
    </div>
    <hr />
    <div class="self-content">
      <div class="self-info">
        <img
          class="self-photo"
          @click="
            $router
              .push(`/users/${tweet.User ? tweet.User.id : '/'}`)
              .catch(() => {})
          "
          :src="tweet.User ? tweet.User.avatar : ''"
          alt=""
        />
        <div class="wrap">
          <span
            class="name"
            @click="
              $router
                .push(`/users/${tweet.User ? tweet.User.id : '/'}`)
                .catch(() => {})
            "
            >{{ tweet.User ? tweet.User.name : "" }}</span
          >
          <span
            class="account"
            @click="
              $router
                .push(`/users/${tweet.User ? tweet.User.id : '/'}`)
                .catch(() => {})
            "
            >＠{{ tweet.User ? tweet.User.account : "" }}</span
          >
        </div>
      </div>
      <p class="tweet-content">{{ tweet.description }}</p>
      <span class="time">{{ tweet.createdAt | fromNow }}</span>
    </div>
    <hr />
    <div class="counts">
      <span class="reply-counts">{{ replyCount }} 回覆</span>
      <span class="like-counts">{{ likesCount }} 喜歡次數</span>
    </div>
    <hr />
    <div class="icons">
      <img
        class="conversation"
        src="../assets/imgs/conversation@2x.png"
        alt=""
        @click="afterClickNewReply"
      />
      <img
        v-if="!likes.isLiked"
        @click="likeTweet(tweet.id)"
        class="heart"
        src="../assets/imgs/heart@2x.png"
        alt="heart"
      />
      <div
        v-if="likes.isLiked"
        @click="unlikeTweet(tweet.id)"
        class="icon heart liked"
        alt="heart"
      ></div>
    </div>

    <div class="replies">
      <div class="single-reply" v-for="row in replies" :key="row.id">
        <img
          :src="row.User ? row.User.avatar : ''"
          @click="
            $router
              .push(`/users/${row.User ? row.User.id : '/'}`)
              .catch(() => {})
          "
        />
        <div class="reply-content">
          <div class="title">
            <div
              class="name"
              @click="
                $router
                  .push(`/users/${row.User ? row.User.id : '/'}`)
                  .catch(() => {})
              "
            >
              {{ row.User ? row.User.name : "" }}
            </div>
            <span
              class="account"
              @click="
                $router
                  .push(`/users/${row.User ? row.User.id : '/'}`)
                  .catch(() => {})
              "
              >＠{{ row.User ? row.User.account : "" }}</span
            >
            <span class="time">・{{ row.User.createdAt | fromNow }}</span>
          </div>
          <span class="to-whom"
            >回覆
            <span
              class="receiver"
              @click="$router.push(`/users/${tweet.User.id}`)"
            >
              ＠{{ tweet.User ? tweet.User.account : "" }}</span
            ></span
          >
          <p class="reply-item">{{ row.comment }}</p>
        </div>
      </div>
    </div>

    <ModalForReplyTweet
      :tweet="tweet"
      v-if="showNewReplyModal"
      @replyTweet="replyTweet"
      @after-click-cross="afterClickCross"
    />
  </div>
</template>

<script>
import ModalForReplyTweet from "./../components/ModalForReplyTweet";
import { Toast } from "@/utils/helpers";
import likesAPI from "@/apis/likes";
import tweetsAPI from "@/apis/tweets";
import { fromNowFilter } from "../utils/mixins.js";
import { mapState } from "vuex";

export default {
  name: "ReplyList",
  components: {
    ModalForReplyTweet,
  },
  mixins: [fromNowFilter],
  data() {
    return {
      showNewReplyModal: false,
      tweetId: "",
      tweet: {},
      replies: {},
      likes: {},
      comments: {},
      replyCount: 0,
      likesCount: 0,
    };
  },
  watch: {
    "$route.params.id": function () {
      this.fetchTweet();
    },
    deep: true,
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  created() {
    this.tweetId = this.$route.params.id;
    this.fetchTweet(this.tweetId);
  },
  methods: {
    afterClickCross() {
      this.showNewReplyModal = false;
    },
    afterClickNewReply() {
      this.showNewReplyModal = true;
    },
    async fetchTweet(tweetId) {
      try {
        const { data } = await tweetsAPI.getTweet({ tweetId });

        this.tweet = { ...data, currentUser: this.currentUser };
        this.likes = { ...data.Likes, isLiked: data.isLiked };
        this.replies = { ...data.Replies };
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得tweet，請稍後再試",
        });
      }
      this.replyCount = Object.keys(this.replies).length;
      this.likesCount = Object.keys(this.likes).length - 1;
    },
    async replyTweet(comment) {
      const tweetId = this.$route.params.id;
      try {
        if (!comment) {
          Toast.fire({
            icon: "error",
            title: "請輸入內容",
          });
          return;
        }

        const { data } = await tweetsAPI.addReply({ tweetId, comment });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        await this.fetchTweet(this.tweetId);
        this.showNewReplyModal = false;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: `無法註冊，請稍後再試 \n 錯誤原因：${error}`,
        });
      }
    },
    async likeTweet(tweetId) {
      try {
        const { data } = await likesAPI.likeTweet({ tweetId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.likes.isLiked = true;
        this.fetchTweet(this.tweetId);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: `無法處理請求，請稍後再試 \n 錯誤原因：${error}`,
        });
      }
      await this.fetchTweet(this.tweetId);
    },
    async unlikeTweet(tweetId) {
      try {
        const { data } = await likesAPI.unlikeTweet({ tweetId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.likes.isLiked = false;
        this.fetchTweet(this.tweetId);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: `無法處理請求，請稍後再試 \n 錯誤原因：${error}`,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$orange: #ff6600;
$deeporange: #f34a16;
$lightgray: #f5f8fa;
$bitdark: #657786;
$divider: #e6ecf0;
.reply-main {
  overflow-y: hidden;
  overflow-x: hidden;
  width: 600px;
  height: 100%;
  border-right: 1px solid #e6ecf0;
  border-left: 1px solid #e6ecf0;
  display: flex;
  flex-direction: column;
  padding: 0;
  .upper {
    // outline: red solid;
    height: 55px;
    display: flex;
    flex-direction: row;
    .arrow {
      cursor: pointer;
      width: 17px;
      height: 14px;
      margin: 20px 43px 20px 20px;
    }
    span {
      font-family: Noto Sans TC;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 55px;
      align-self: center;
    }
  }
  hr {
    margin: 0;
  }
  .self-content {
    width: 100%;
    // outline: red solid;
    display: flex;
    flex-direction: column;
    .self-info {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      // outline: red solid;
      .self-photo {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin: 13px 10px 15px 15px;
        object-fit: cover;
        cursor: pointer;
        &:hover {
          filter: brightness(0.9);
        }
        // outline: red solid;
      }
      .wrap {
        // outline: red solid;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        margin: 18px 0 0 0;
        height: 44px;

        .name {
          font-family: Noto Sans TC;
          font-style: normal;
          font-weight: 700;
          font-size: 15px;
          line-height: 15px;
          text-align: start;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
          // height: 22px;
        }
        .account {
          font-family: Noto Sans TC;
          font-style: normal;
          font-weight: 500;
          font-size: 15px;
          line-height: 15px;
          text-align: start;
          color: $bitdark;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
          // height: 22px;
        }
      }
    }
    .tweet-content {
      width: 510px;
      height: auto;
      font-family: Noto Sans TC;
      font-style: normal;
      font-weight: 500;
      font-size: 23px;
      line-height: 34px;
      text-align: start;
      margin: 0 75px 0 15px;
      word-break: break-all;
    }
    .time {
      width: 600px;
      height: auto;
      // outline: red solid;
      font-family: Noto Sans TC;
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      line-height: 22px;
      color: #657786;
      text-align: start;
      margin: 15px;
    }
  }
  .counts {
    // outline: red solid;
    margin: 20px;
    text-align: start;
    font-family: Noto Sans TC;
    font-style: normal;
    font-weight: bold;
    font-size: 19px;
    line-height: 28px;
    .like-counts {
      margin-left: 20px;
    }
  }
  .icons {
    display: flex;
    flex-direction: row;

    // outline: red solid;
    margin: 21px 17px 21px 17px;
    .heart,
    .conversation {
      height: 25px;
      width: 25px;
      // outline: red solid;
      margin: 0 155px 0 0;
      cursor: pointer;
    }
    .heart {
      margin-right: 377px;
      cursor: pointer;
    }
    .icon.liked {
      width: 100%;
      min-height: 25px;
      min-width: 25px;
      mask: url(../assets/svgs/icon_liked.svg) no-repeat center;
      mask-size: contain;
      background-color: #e0245e;
    }
  }
  .replies {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    border-top: 1px solid #e6ecf0;
    border-bottom: 1px solid #e6ecf0;

    .single-reply {
      display: flex;
      flex-direction: row;
      border-bottom: 1px solid #e6ecf0;
      word-break: break-all;
      img {
        min-width: 50px;
        height: 50px;
        width: 50px;
        border-radius: 50%;
        object-fit: cover;
        margin: 18px 10px 37px 15px;
        cursor: pointer;
        &:hover {
          filter: brightness(0.9);
        }
      }
      .reply-content {
        margin: 15px 0 0 0;
        text-align: start;
        .title {
          margin-bottom: 4px;
          .name {
            margin-right: 5px;
            font-weight: 500;
            cursor: pointer;
            &:hover {
              font-weight: 500;
              text-decoration: underline;
            }
          }
          .account {
            color: $bitdark;
            cursor: pointer;
            white-space: nowrap;
            &:hover {
              text-decoration: underline;
            }
          }
          .time {
            font-weight: 500;
            font-size: 15px;
            line-height: 22px;
            color: #657786;
            text-align: start;
            white-space: nowrap;
          }
        }
        .to-whom {
          margin-bottom: 5px;
          text-align: start;
          margin-bottom: 23px;
          font-family: Noto Sans TC;
          font-style: normal;
          font-weight: 500;
          font-size: 13px;
          line-height: 13px;
          .receiver {
            color: #ff6600;
          }
        }
        .reply-item {
          margin: 5px 15px 15px 0;
          font-style: normal;
          font-weight: normal;
          font-size: 15px;
          line-height: 22px;
        }
      }
    }
  }
}
</style>
