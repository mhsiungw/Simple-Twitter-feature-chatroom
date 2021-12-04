<template>
  <div class="setting-page-container">
    <UserSidebar class="sidebar-section" />
    <SettingSection @after-submit="handleAfterSubmit" class="setting-section" />
  </div>
</template>

<script>
import UserSidebar from "../components/UserSidebar.vue";
import SettingSection from "../components/SettingSection.vue";
export default {
  name: "Setting",
  components: {
    UserSidebar,
    SettingSection,
  },
  methods: {
    handleAfterSubmit(data) {
      console.log("handleAfterSubmit", data);
    },
  },
};
</script>

<style scoped lang="scss">
.setting-page-container {
  margin: 0 auto;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  height: 100vh;
  .setting-section {
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
