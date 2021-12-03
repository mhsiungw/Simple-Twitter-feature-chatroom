<template>
  <div class="row page-container">
    <UserSidebar class="col-3" />
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
    <Trends class="col-4 ml-4" />
  </div>
</template>

<script>
import FollowList from "../components/FollowList.vue";
import UserSidebar from "../components/UserSidebar.vue";
import Trends from "../components/Trends.vue";
import { Toast } from "@/utils/helpers";
import usersAPI from "@/apis/users";

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
  
  created() {
    this.userId = this.$route.params.id;
    this.fetchFollowList(this.userId);
    this.fetchProfile(this.userId);
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
    async fetchFollowList() {
      const userId =
        this.$route.path === "/users"
          ? this.currentUser.id
          : this.$route.params.id;

      try {
        const followersData = await usersAPI.getFollowers({ userId });
        console.log("followersData", followersData);
        this.followers = followersData.data;
        const followingsData = await usersAPI.getFollowings({ userId });
        console.log("followingsData", followingsData);
        this.followings = followingsData.data;
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

  .follow-list {
    border-right: 1px solid lightgray;
    border-left: 1px solid lightgray;
  }
}
</style>
