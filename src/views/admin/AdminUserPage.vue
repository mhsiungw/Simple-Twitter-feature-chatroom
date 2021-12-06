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
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  position: relative;
  margin: 0 auto;
  width: 1440px;
  max-width: 1440px;
  .user-section {
    flex: 1;
  }
  .sidebar-section {
    width: 26.7%;
    padding-left: 95px;
  }
}
</style>