<template>
  <div class="mainPage-container">
    <UserSidebar class="user-sidebar" />
    <div class="main">
      <UserProfile />
    </div>
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
