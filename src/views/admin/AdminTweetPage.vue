<template>
  <div class="tweet-page-container">
    <AdminSidebar class="sidebar-section" />
    <AdminTweetSection class="tweet-section" />
  </div>
</template>

<script>
import AdminSidebar from "../../components/AdminSidebar.vue";
import AdminTweetSection from "../../components/AdminTweetSection.vue";

export default {
  components: {
    AdminSidebar,
    AdminTweetSection,
  },
};
</script>

<style scoped lang="scss">
.tweet-page-container {
  margin: 0 auto;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  height: 100vh;
  .tweet-section {
    flex: 1;
  }
  .sidebar-section {
    width: 378px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
