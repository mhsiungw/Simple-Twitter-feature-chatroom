<template>
  <div class="row page-container">
    <UserSidebar class="col-3" />
    <ReplyList />
    <Trends class="col-4 ml-4" />
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

<style lang="scss" scoped>
.page-container {
  margin: 0 auto;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}
</style>
