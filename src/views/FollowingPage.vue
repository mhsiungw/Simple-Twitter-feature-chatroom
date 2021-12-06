<template>
  <div class="page-container">
    <UserSidebar class="user-sidebar" />
    <FollowList
      class="follow-list"
      v-if="$route.path === `/users/${userId}/followers`"
      :initialFollowers="followers"
      :nowUser="user"
    />
    <FollowList
      class="follow-list"
      v-if="$route.path === `/users/${userId}/followings`"
      :initialFollowers="followings"
      :nowUser="user"
    />
    <Trends class="trend-section" />
  </div>
</template>

<script>
import FollowList from "../components/FollowList.vue";
import UserSidebar from "../components/UserSidebar.vue";
import Trends from "../components/Trends.vue";
import { Toast } from "@/utils/helpers";
import usersAPI from "@/apis/users";
import { mapState } from "vuex";

export default {
  name: "FollowingPage",
  components: {
    UserSidebar,
    Trends,
    FollowList,
  },
  data() {
    return {
      followers: [],
      followings: [],
      user: {},
      userId: "",
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  created() {
    this.userId = this.$route.params.id;
    this.fetchFollowList(this.userId);
    this.fetchProfile(this.userId);
    this.fetchUserTweets(this.userId);
  },
  methods: {
    async fetchProfile(userId) {
      try {
        const getProfile = await usersAPI.getProfile({ userId });
        this.user = { ...getProfile.data };
      } catch (error) {
        console.log(error);
      }
    },
    async fetchUserTweets(userId) {
      try {
        const userTweets = await usersAPI.getUserTweets({ userId });
        this.user.tweets = userTweets.data;
        //console.log("this.user.tweets===>", this.user.tweets);
        this.user.tweets = this.user.tweets.map((tweet) => ({
          id: tweet.User.id,
          UserId: tweet.UserId,
          name: tweet.User.name,
          avatar: tweet.User.avatar,
          account: tweet.User.account,
          createdAt: tweet.createdAt,
          description: tweet.description,
          likeTweetCount: tweet.Like ? tweet.Like.length : 0,
          replyTweetCount: tweet.Replies ? tweet.Replies.length : 0,
          isLiked: tweet.isLiked ? tweet.isLiked : true,
        }));
        this.tabOption = "推文";
      } catch (error) {
        console.log(error);
      }
    },
    async fetchFollowList() {
      const userId =
        this.$route.path === "/users"
          ? this.currentUser.id
          : this.$route.params.id;

      try {
        const followersData = await usersAPI.getFollowers({ userId });
        this.followers = followersData.data;
        console.log("followersData", this.followers);

        this.followers = this.followers.map((user) => {
          if (user.Followship.followingId === this.currentUser.id) {
            return {
              ...user,
              followerCount: user.followerCount + 1,
              isFollowed: true,
            };
          } else {
            return {
              ...user,
              followerCount: user.followerCount - 1,
              isFollowed: false,
            };
          }
        });

        const followingsData = await usersAPI.getFollowings({ userId });
        // console.log("followingsData", followingsData);
        this.followings = followingsData.data;

        this.followings = this.followings.map((user) => {
          if (user.Followship.followingId !== this.currentUser.id) {
            return {
              ...user,
              followerCount: user.followerCount + 1,
              isFollowed: true,
            };
          } else {
            return {
              ...user,
              followerCount: user.followerCount - 1,
              isFollowed: false,
            };
          }
        });
      } catch (err) {
        console.log(err);
        Toast.fire({
          icon: "error",
          title: "無法取得資料，請稍後再試",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.page-container {
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
