<template>
  <div class="user-page-container">
    <AdminSidebar class="sidebar-section" />
    <AdminUserSection :user-data="userData" class="user-section" />
  </div>
</template>

<script>
import AdminSidebar from "../../components/AdminSidebar.vue";
import AdminUserSection from "../../components/AdminUserSection.vue";
import adminAPI from "../../apis/admin";

export default {
  components: {
    AdminSidebar,
    AdminUserSection,
  },
  data() {
    return {
      userData: [],
    };
  },
  created() {
    this.fetchAllUsers();
  },
  methods: {
    async fetchAllUsers() {
      let { data } = await adminAPI.getAllUsers();
      this.userData = data;
    },
  },
};
</script>

<style scoped lang="scss">
.user-page-container {
  margin: 0 auto;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  height: 100vh;
  .user-section {
    width: 1063px;
  }
  .sidebar-section {
    position: fixed;
    left: 100px;
  }
}
</style>