<template>
  <div class="mainPage-container">
    <UserSidebar class="user-sidebar" />
    <MainSection
      @after-tweet-submit="handleAfterSubmit"
      :tweets="reverseTweet"
      :current-user="currentUser"
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

let newInput = {
  id: 1100,
  UserId: 11,
  description:
    "Iusto deserunt dolor quis consequatur aut officiis blanditiis placeat est.",
  createdAt: "2021-12-01T08:01:27.000Z",
  updatedAt: "2021-12-01T08:01:27.000Z",
  User: {
    id: 11,
    email: "user1@example.com",
    password: "$2a$10$odYzbNBo7tderndCxwWRweOoS8xC.sr6UAhhmBpiIaQDuF6AxnZJa",
    name: "user1",
    account: "user1",
    cover: "https://cdn.stocksnap.io/img-thumbs/280h/hands-open_J1KUHXEDB9.jpg",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    introduction: "Inventore quos quo aut sapiente.",
    role: "user",
    createdAt: "2021-12-01T08:01:27.000Z",
    updatedAt: "2021-12-01T08:01:27.000Z",
  },
};

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
      reverseTweets: [],
    };
  },
  created() {
    this.fetchTweets();
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
    reverseTweet() {
      return this.tweets.slice().reverse();
    },
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
    handleAfterSubmit(data) {
      console.log("handleAfterSubmit", data);
      newInput.description = data;
      this.tweets.push(newInput);
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
