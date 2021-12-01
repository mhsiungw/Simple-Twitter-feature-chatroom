<template>
  <div class="page-container">
    <UserSidebar />
    <ReplyList />
    <Trends />
  </div>
</template>

<script>
import UserSidebar from "../components/UserSidebar.vue";
import Trends from "../components/Trends.vue";
import ReplyList from "../components/ReplyList.vue";

export default {
  components: {
    UserSidebar,
    Trends,
    ReplyList,
  },
};
</script>

<style lang="scss">
.page-container {
  height: 100%;

  width: 100%;
  display: flex;
  flex-direction: row;
}
</style>
