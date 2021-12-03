<template>
  <div class="user-page-container">
    <AdminSidebar class="sidebar-section" />
    <AdminUserSection class="user-section" />
  </div>
</template>

<script>
import AdminSidebar from "../../components/AdminSidebar.vue";
import AdminUserSection from "../../components/AdminUserSection.vue";

export default {
  components: {
    AdminSidebar,
    AdminUserSection,
  },
};
</script>

<style scoped lang="scss">
.user-page-container {
  margin: 0 auto;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  height: 100vh;
  .user-section {
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