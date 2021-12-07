<template>
  <div class="page-container">
    <UserSidebar
      class="user-sidebar"
      @after-tweet-click="handleAfterTweetClick"
    />
    <UserProfile
      @after-tweet-submit="handleAfterSubmit"
      @after-cancel-click="handleAfterTweetCancel"
      :is-tweet-clicked="isTweetClicked"
      class="user-profile-section"
    />
    <Trends class="trend-section" />
  </div>
</template>

<script>
import UserSidebar from "../components/UserSidebar.vue";
import Trends from "../components/Trends.vue";
import UserProfile from "../components/UserProfile.vue";
import tweetsAPI from "../apis/tweets";
import moment from "moment";
import { mapState } from "vuex";

export default {
  name: "UserPage",
  components: {
    UserSidebar,
    Trends,
    UserProfile,
  },
  data() {
    return {
      isTweetClicked: false,
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    async handleAfterSubmit(newDescription) {
      try {
        console.log("handleAfterSubmit", newDescription);
        let newInput = {
          Likes: [],
          Replies: [],
          User: {
            avatar: this.currentUser.image,
            name: this.currentUser.name,
            account: this.currentUser.name,
          },
          UserId: this.currentUser.id,
          createdAt: moment().format(),
          description: newDescription,
        };
        console.log(newInput);
        // 發送 API
        let { data } = await tweetsAPI.postTweet({
          UserId: newInput.UserId,
          description: newDescription,
        });
        if (data.status !== "success") {
          throw new Error(data.status);
        }
        console.log(data);
        //頁面即時更新
        // this.tweets.push(newInput);
        // workaround 如果可以知道我們要穿什麼 id 過去，或者後端的 id 可以由前端傳過去...
        this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
    handleAfterTweetClick() {
      this.isTweetClicked = true;
    },
    handleAfterTweetCancel() {
      this.isTweetClicked = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.page-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  position: relative;
  margin: 0 auto;
  width: 1440px;
  max-width: 1440px;
  .user-profile-section {
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
