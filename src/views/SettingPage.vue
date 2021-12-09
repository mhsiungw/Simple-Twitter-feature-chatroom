<template>
  <div class="setting-page-container">
    <UserSidebar :is-tweet-clicked="isTweetClicked" class="sidebar-section" />
    <SettingSection @after-save="handleAfterSave" class="setting-section" />
  </div>
</template>

<script>
import UserSidebar from "../components/UserSidebar.vue";
import SettingSection from "../components/SettingSection.vue";
import { mapState } from "vuex";
import userAPI from "../apis/users";
import { Toast } from "../utils/helpers";

export default {
  name: "Setting",
  components: {
    UserSidebar,
    SettingSection,
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    async handleAfterSave(newInfo) {
      try {
        let { data } = await userAPI.editUserInfo(this.currentUser.id, newInfo);
        if (data.status == "error") {
          throw new Error(data.message);
        }
        Toast.fire({
          icon: "success",
          title: `更改成功`,
        });
        return this.$router.go(0);
      } catch (error) {
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
.setting-page-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  position: relative;
  margin: 0 auto;
  width: 1440px;
  max-width: 1440px;
  .setting-section {
    flex: 1;
  }
  .sidebar-section {
    width: 26.7%;
    padding-left: 95px;
  }
}
</style>
