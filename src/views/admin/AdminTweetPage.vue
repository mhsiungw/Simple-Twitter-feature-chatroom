<template>
  <div class="tweet-page-container">
    <AdminSidebar class="sidebar-section" />
    <AdminTweetSection
      :tweets="tweets"
      @after-delete-click="adminDeleteTweet"
      class="tweet-section"
    />
  </div>
</template>

<script>
import AdminSidebar from "../../components/AdminSidebar.vue";
import AdminTweetSection from "../../components/AdminTweetSection.vue";
import adminAPI from "../../apis/admin";

export default {
  name: "AdminTweetPage",
  components: {
    AdminSidebar,
    AdminTweetSection,
  },
  data() {
    return {
      tweets: [],
    };
  },
  created() {
    this.fetchAllTweets();
  },
  methods: {
    async fetchAllTweets() {
      try {
        let response = await adminAPI.getAllTweets();
        if (response.statusText !== "OK") {
          throw new Error(response.statusText);
        }
        this.tweets = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async adminDeleteTweet(tweetId) {
      try {
        console.log(tweetId);
        // 發送 API，後端刪除推文
        let response = await adminAPI.deleteTweet(tweetId);
        console.log(response);
        // // 如果刪除失敗
        if (response.statusText !== "OK") {
          throw new Error(response.statusText);
        }
        // 如果刪除成功，即時改變使用者的畫面
        this.tweets = this.tweets.filter((tweet) => {
          return tweetId !== tweet.id;
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.tweet-page-container {
  margin: 0 auto;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  height: 100vh;
  .tweet-section {
    flex: 1;
  }
  .sidebar-section {
    width: 378px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
