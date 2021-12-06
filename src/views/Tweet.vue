<template>
  <div class="row page-container">
    <UserSidebar class="user-sidebar" />
    <ReplyList class="reply-list-section" />
    <Trends class="trend-section" />
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

.page-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  position: relative;
  margin: 0 auto;
  width: 1440px;
  max-width: 1440px;
  .reply-list-section {
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
