<template>
  <div class="page-container">
    <UserSidebar class="user-sidebar" />
    <UserProfile class="user-profile-section" />
    <Trends class="trend-section" />
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
