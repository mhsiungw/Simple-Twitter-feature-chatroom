<template>
  <div class="mainPage-container">
    <UserSidebar class="user-sidebar" />
    <MainSection
      @after-tweet-submit="handleAfterSubmit"
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
    };
  },
  created() {
    console.log(this.currentUser);
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
        console.log(response);
        this.tweets = response.data;
      } catch (error) {
        console.log(error);
        window.alert("無法顯示資料，請稍後再試");
      }
    },
    async handleAfterSubmit(newDescription) {
      try {
        console.log("handleAfterSubmit", newDescription);
        let newInput = {
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
