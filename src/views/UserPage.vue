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
