<template>
  <div class="mainPage-container">
    <UserSidebar class="user-sidebar" />
    <SettingSection class="setting-section" />
  </div>
</template>

<script>
import UserSidebar from "../components/UserSidebar.vue";
import SettingSection from "../components/SettingSection.vue";
export default {
  name: "UserPage",
  components: {
    UserSidebar,
    SettingSection,
  },
};
</script>


<style scoped lang="scss">
.mainPage-container {
  margin: 0 auto;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  .user-sidebar {
    position: fixed;
    left: 100px;
  }
}
</style>