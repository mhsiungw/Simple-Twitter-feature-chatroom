<template>
  <div class="user-page-container">
    <AdminSidebar class="sidebar-section" />
    <AdminUserSection
      :is-loading="isLoading"
      :user-data="userData"
      class="user-section"
    />
  </div>
</template>

<script>
import AdminSidebar from "../../components/AdminSidebar.vue";
import AdminUserSection from "../../components/AdminUserSection.vue";
import adminAPI from "../../apis/admin";
import { Toast } from "../../utils/helpers";

export default {
  components: {
    AdminSidebar,
    AdminUserSection,
  },
  data() {
    return {
      userData: [],
      isLoading: true,
    };
  },
  created() {
    this.fetchAllUsers();
  },
  methods: {
    async fetchAllUsers() {
      try {
        let { data } = await adminAPI.getAllUsers();
        this.userData = data;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: `暫時無法處理請求，請稍後再試。 \n 錯誤原因：${error}`,
        });
      }
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
    position: sticky;
    top: 0;
    width: 26.7%;
    padding-left: 95px;
  }
}
</style>