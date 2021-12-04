<template>
  <div class="page-container">
    <UserSidebar class="mr-2" />
    <UserProfile class="user-profile-section" />
    <Trends class="ml-2" />
  </div>
</template>

<script>
import UserSidebar from "../components/UserSidebar.vue";
import Trends from "../components/Trends.vue";
import UserProfile from "../components/UserProfile.vue";

export default {
  name: "UserPage",
  components: {
    UserSidebar,
    Trends,
    UserProfile,
  },
};
</script>

<style lang="scss" scoped>
.page-container {
  margin: 0 auto;
  display: flex;
  flex: 0 1 auto;
  flex-flow: row nowrap;
  justify-content: center;
  .user-profile-section {
    min-width: 600px;
  }
}
</style>
