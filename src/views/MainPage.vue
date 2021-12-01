<template>
  <div class="mainPage-container">
    <UserSidebar class="user-sidebar" />
    <MainSection :tweets="tweets" />
    <Trends class="trend-section" />
  </div>
</template>

<script>
import UserSidebar from "../components/UserSidebar.vue";
import Trends from "../components/Trends.vue";
import MainSection from "../components/MainSection.vue";
import tweetsAPI from "../apis/tweets";

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
    this.fetchTweets();
  },
  methods: {
    async fetchTweets() {
      // API
      try {
        let response = await tweetsAPI.getTweets();
        console.log(response);
        if (response.statusText !== "OK") {
          throw new Error(response.status);
        }
        this.tweets = response.data;
      } catch (error) {
        console.log(error);
        window.alert("無法顯示資料，請稍後再試");
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
  border: 1px solid red;
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
