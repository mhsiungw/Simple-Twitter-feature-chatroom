<template>
  <div class="d-flex">
    <UserSidebar />
    <div class="main">
      <h4>I'm Main page</h4>
    </div>
    <Trends />
  </div>
</template>

<script>
import UserSidebar from "../components/UserSidebar.vue";
import Trends from "../components/Trends.vue";

export default {
  components: {
    UserSidebar,
    Trends,
  },
};
</script>
