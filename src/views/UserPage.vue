<template>
  <div class="page-container">
    <UserSidebar class="user-sidebar" />
    <div class="user-profile-container">
      <UserProfile class="user-profile-section" />
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

<style lang="scss" scoped>
.page-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  .user-profile-container {
    width: 1063px;
    .user-profile-section {
      border: 1px solid #e6ecf0;
      width: 600px;
    }
  }

  .trend-section,
  .user-sidebar {
    position: fixed;
  }
  .trend-section {
    right: 82px;
  }

  .user-sidebar {
    left: 100px;
  }
}
</style>
