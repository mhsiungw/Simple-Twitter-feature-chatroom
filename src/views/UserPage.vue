<template>
  <div class="row page-container">
    <UserSidebar class="col-3" />
    <UserProfile />
    <Trends class="col-4 ml-4" />
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
}
</style>
