<template>
  <div class="mainPage-container">
    <UserSidebar class="user-sidebar" />
    <MainSection
      @after-tweet-submit="handleAfterSubmit"
      @after-like-clicked="handleAfterLikeClick"
      @after-dislike-clicked="handleAfterDislikeClick"
      :tweets="reverseTweet"
      :initial-current-user="currentUser"
      :is-authenticatd="isAuthenticated"
    />
    <Trends class="trend-section" />
  </div>
</template>

<script>
import UserSidebar from "../components/UserSidebar.vue";
import Trends from "../components/Trends.vue";
import MainSection from "../components/MainSection.vue";
import tweetsAPI from "../apis/tweets";
import likeAPI from "../apis/likes";
import { mapState } from "vuex";
import moment from "moment";

export default {
  name: "MainPage",
  components: {
    UserSidebar,
    Trends,
    MainSection,
  },
  data() {
    return {
      tweets: [],
      showTweetModal: false,
    };
  },
  created() {
    this.fetchTweets();
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
    // 把推文以倒序顯示
    reverseTweet() {
      return this.tweets.slice().reverse();
    },
  },
  methods: {
    async fetchTweets() {
      // API
      try {
        let response = await tweetsAPI.getTweets();
        if (response.statusText !== "OK") {
          throw new Error(response.status);
        }
        this.tweets = response.data;
      } catch (error) {
        console.log(error);
        window.alert("無法顯示資料，請稍後再試");
      }
    },
    async handleAfterSubmit(newDescription) {
      try {
        let newInput = {
          Likes: [],
          Replies: [],
          User: {
            avatar: this.currentUser.image,
            name: this.currentUser.name,
            account: this.currentUser.name,
          },
          UserId: this.currentUser.id,
          id: this.tweets.length + 2,
          createdAt: moment().format(),
          description: newDescription,
        };
        // 發送 API
        let { data } = await tweetsAPI.postTweet({
          UserId: newInput.UserId,
          description: newDescription,
        });
        if (data.status !== "successful") {
          throw new Error(data.status);
        }

        //頁面即時更新
        this.tweets.push(newInput);
      } catch (error) {
        console.log(error);
      }
    },
    async handleAfterLikeClick(tweetId) {
      try {
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
            } else {
              return;
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async handleAfterDislikeClick(tweetId) {
      try {
        // 發送 API
        let response = await likeAPI.unlikeTweet({ tweetId });
        if (response.statusText !== "OK") {
          throw new Error(response.statusText);
        }
        console.log("handleAfterDislikeClick", tweetId);
        //頁面即時更新
        this.tweets.filter((tweet) => {
          if (tweet.id === tweetId) {
            tweet.Likes = tweet.Likes.filter((Like) => {
              return Like.UserId !== this.currentUser.id;
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.mainPage-container {
  margin: 0 auto;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  .trend-section,
  .user-sidebar {
    position: fixed;
  }
  .trend-section {
    right: 12px;
  }

  .user-sidebar {
    left: 100px;
  }
}
</style>
