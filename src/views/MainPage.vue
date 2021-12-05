<template>
  <div class="mainPage-container">
    <UserSidebar
      @after-tweet-click="handleAfterTweetClick"
      class="user-sidebar"
    />
    <div class="main-secition-container">
      <MainSection
        @after-tweet-submit="handleAfterSubmit"
        @after-like-clicked="handleAfterLikeClick"
        @after-dislike-clicked="handleAfterDislikeClick"
        @after-cancel-click="handleAfterTweetCancel"
        :tweets="reverseTweet"
        :initial-current-user="currentUser"
        :is-tweet-clicked="isTweetClicked"
      />
    </div>

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
import { v4 as uuidv4 } from "uuid";

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
      isTweetClicked: false,
    };
  },
  created() {
    this.fetchTweets();
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
    // 把推文按照發文時間顯示（越近發的越先）
    reverseTweet() {
      console.log("reverseTweet");
      let newTweets = this.tweets;
      return newTweets.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
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
        this.tweets = response.data.sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });
      } catch (error) {
        console.log(error);
        window.alert("無法顯示資料，請稍後再試");
      }
    },
    async handleAfterSubmit(newDescription) {
      try {
        console.log(newDescription);
        let newInput = {
          Likes: [],
          Replies: [],
          User: {
            avatar: this.currentUser.image,
            name: this.currentUser.name,
            account: this.currentUser.name,
          },
          UserId: this.currentUser.id,
          id: uuidv4(),
          createdAt: moment().format(),
          description: newDescription,
        };
        // 發送 API
        let { data } = await tweetsAPI.postTweet({
          UserId: newInput.UserId,
          description: newDescription,
        });
        if (data.status !== "success") {
          throw new Error(data.status);
        }

        //頁面即時更新
        // this.tweets.push(newInput);
        // workaround 如果可以知道我們要穿什麼 id 過去，或者後端的 id 可以由前端傳過去...
        this.$router.go(0);
      } catch (error) {
        console.log(error);
      }
    },
    async handleAfterLikeClick(tweetId) {
      try {
        console.log("handleAfterLikeClick", tweetId);

        // 發送 API
        let response = await likeAPI.likeTweet({ tweetId });
        if (response.statusText !== "OK") {
          throw new Error(response.statusText);
        }
        console.log(response);
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
        // 頁面即時更新;
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
    handleAfterTweetClick() {
      this.isTweetClicked = true;
    },
    handleAfterTweetCancel() {
      this.isTweetClicked = false;
    },
  },
};
</script>

<style scoped lang="scss">
.mainPage-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  .main-secition-container {
    width: 1063px;
    .main-section {
      border: 1px solid #e6ecf0;
      width: 600px;
    }
  }

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
