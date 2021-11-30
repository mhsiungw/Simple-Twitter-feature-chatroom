<template>
  <div class="d-flex">
    <UserSidebar />
    <div class="main">
      <UserProfile />
    </div>
    <Trends />
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
