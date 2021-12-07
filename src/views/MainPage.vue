<template>
  <div class="mainPage-container">
    <ModalForReplyTweet
      @after-click-cross="handleAfterTweetCancel"
      @replyTweet="handleAfterReplyTweet"
      :tweet="clickedTweet"
      v-if="isPostClicked"
    />
    <UserSidebar
      @after-tweet-click="handleAfterTweetClick"
      class="user-sidebar"
    />
    <MainSection
      @after-tweet-submit="handleAfterSubmit"
      @after-like-clicked="handleAfterLikeClick"
      @after-dislike-clicked="handleAfterDislikeClick"
      @after-cancel-click="handleAfterTweetCancel"
      @after-comment-click="handleAfterCommentClicked"
      :tweets="tweets"
      :initial-current-user="currentUser"
      :is-tweet-clicked="isTweetClicked"
    />
    <Trends
      @after-following="handleAfterFollowing"
      @after-cancel-following="handleAfterCacenlFollowing"
      class="trend-section"
    />
  </div>
</template>

<script>
import UserSidebar from "../components/UserSidebar.vue";
import Trends from "../components/Trends.vue";
import MainSection from "../components/MainSection.vue";
import ModalForReplyTweet from "../components/ModalForReplyTweet.vue";
import tweetsAPI from "../apis/tweets";
import likeAPI from "../apis/likes";
// import usersAPI from "../apis/users";
import { mapState } from "vuex";
import { Toast } from "../utils/helpers";

export default {
  name: "MainPage",
  components: {
    UserSidebar,
    Trends,
    MainSection,
    ModalForReplyTweet,
  },
  data() {
    return {
      tweets: [],
      newTweets: [],
      followings: [],
      isTweetClicked: false,
      isPostClicked: false,
      clickedTweet: {},
    };
  },
  async created() {
    await this.fetchTweets();
    // this.followingsFilter();
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
    // 把推文按照發文時間顯示（越近發的越先顯示）
    // reverseTweet() {
    //   return [...this.newTweets].sort((a, b) => {
    //     return (
    //       new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    //     );
    //   });
    // },
  },
  methods: {
    async fetchTweets() {
      // API
      try {
        let tweetResponse = await tweetsAPI.getTweets();
        // let userResponse = await usersAPI.getFollowings({
        //   userId: this.currentUser.id,
        // });
        if (tweetResponse.statusText !== "OK") {
          throw new Error(tweetResponse.status);
        }
        console.log(tweetResponse);
        // if (userResponse.statusText !== "OK") {
        //   throw new Error(userResponse.status);
        // }
        // for (let user of userResponse.data) {
        //   this.followings.push({ userId: user.followingId });
        // }
        return (this.tweets = tweetResponse.data);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法顯示資料，請稍後再試",
        });
      }
    },

    async handleAfterSubmit(newDescription) {
      try {
        // let newInput = {
        //   Likes: [],
        //   Replies: [],
        //   User: {
        //     avatar: this.currentUser.image,
        //     name: this.currentUser.name,
        //     account: this.currentUser.name,
        //   },
        //   UserId: this.currentUser.id,
        //   id: uuidv4(),
        //   createdAt: moment().format(),
        //   description: newDescription,
        // };
        // console.log(newDescription);
        // 發送 API
        let { data } = await tweetsAPI.postTweet({
          UserId: this.currentUser.id,
          description: newDescription,
        });
        if (data.status !== "success") {
          throw new Error(data.status);
        }

        //頁面即時更新
        //this.tweets.push(newInput);
        // workaround 如果可以知道我們要穿什麼 id 過去，或者後端的 id 可以由前端傳過去...
        this.$router.go(0);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: `暫時無法處理請求，請稍後再試。 \n 錯誤原因：${error}`,
        });
      }
    },
    async handleAfterLikeClick(tweetId) {
      try {
        // console.log("handleAfterLikeClick", tweetId);

        // 發送 API
        let response = await likeAPI.likeTweet({ tweetId });
        if (response.statusText !== "OK") {
          throw new Error(response.statusText);
        }
        //頁面即時更新
        // 先 render 找出符合 tweetId 的 tweet
        this.tweets.filter((tweet) => {
          if (tweet.id === tweetId) {
            // 找到 tweet 後，判斷如果使用者還沒按過讚就把使用者 id push Likes 陣列裡
            if (
              !tweet.Likes.some((Like) => Like.UserId === this.currentUser.id)
            ) {
              tweet.Likes.push({ UserId: this.currentUser.id });
              //如果使用者按過讚，就 return
            }
          }
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: `暫時無法處理請求，請稍後再試。 \n 錯誤原因：${error}`,
        });
      }
    },
    async handleAfterDislikeClick(tweetId) {
      try {
        // 發送 API
        let response = await likeAPI.unlikeTweet({ tweetId });
        if (response.statusText !== "OK") {
          throw new Error(response.statusText);
        }
        // 頁面即時更新;
        this.tweets.filter((tweet) => {
          if (tweet.id === tweetId) {
            tweet.Likes = tweet.Likes.filter((Like) => {
              return Like.UserId !== this.currentUser.id;
            });
          }
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: `暫時無法處理請求，請稍後再試。錯誤原因：${error}`,
        });
      }
    },
    handleAfterTweetClick() {
      this.isTweetClicked = true;
    },
    handleAfterTweetCancel() {
      this.isTweetClicked = false;
      this.isPostClicked = false;
    },
    handleAfterCommentClicked(clickedComment) {
      this.isPostClicked = true;
      this.clickedTweet = clickedComment;
    },
    async handleAfterReplyTweet(comment) {
      const tweetId = this.clickedTweet.id.toString();
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
        this.isPostClicked = false;
        this.$router.go(0);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: `回覆推文失敗，請稍後再試。錯誤原因：${error}`,
        });
      }
    },
    //同步更新
    handleAfterFollowing(userId) {
      for (let tweet of this.tweets) {
        if (tweet.UserId == userId) {
          this.newTweets.push(tweet);
        }
      }
    },
    handleAfterCacenlFollowing(userId) {
      this.newTweets = this.newTweets.filter((tweet) => {
        return tweet.UserId !== userId;
      });
    },
    // created
    followingsFilter() {
      let newTweet = [];
      for (let tweet of this.tweets) {
        if (tweet.UserId == this.currentUser.id) {
          newTweet.push(tweet);
        }
        for (let user of this.followings) {
          if (tweet.UserId == user.userId) {
            newTweet.push(tweet);
          }
        }
      }
      this.newTweets = newTweet;
    },
  },
};
</script>

<style scoped lang="scss">
.mainPage-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  position: relative;
  margin: 0 auto;
  width: 1440px;
  max-width: 1440px;
  .main-section {
    border: 1px solid #e6ecf0;
    width: 40%;
    margin-left: 55px;
    margin-right: 30px;
  }

  .trend-section,
  .user-sidebar {
    position: sticky;
  }
  .trend-section {
    top: 15px;
    right: 0%;
  }

  .user-sidebar {
    top: 0;
    left: 0%;
  }
}
</style>