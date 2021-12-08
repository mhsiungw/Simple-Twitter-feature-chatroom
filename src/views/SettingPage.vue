<template>
  <div class="setting-page-container">
    <UserSidebar
      @after-tweet-click="handleAfterTweetClick"
      :is-tweet-clicked="isTweetClicked"
      class="sidebar-section"
    />
    <SettingSection
      @after-tweet-submit="handleAfterSubmit"
      @after-cancel-click="handleAfterTweetCancel"
      @after-save="handleAfterSave"
      :is-tweet-clicked="isTweetClicked"
      class="setting-section"
    />
  </div>
</template>

<script>
import UserSidebar from "../components/UserSidebar.vue";
import SettingSection from "../components/SettingSection.vue";
import { mapState } from "vuex";
import tweetsAPI from "../apis/tweets";
import userAPI from "../apis/users";
import { Toast } from "../utils/helpers";

export default {
  name: "Setting",
  components: {
    UserSidebar,
    SettingSection,
  },
  data() {
    return {
      isTweetClicked: false,
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    async handleAfterSubmit(newDescription) {
      try {
        // 發送 API
        let { data } = await tweetsAPI.postTweet({
          UserId: this.currentUser.id,
          description: newDescription,
        });
        if (data.status !== "success") {
          throw new Error(data.status);
        }
        //頁面即時更新
        // this.tweets.push(newInput);
        // workaround 如果可以知道我們要穿什麼 id 過去，或者後端的 id 可以由前端傳過去...
        this.$router.push("/");
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: `暫時無法處理請求，請稍後再試。 \n 錯誤原因：${error}`,
        });
      }
    },
    handleAfterTweetClick() {
      this.isTweetClicked = true;
    },
    handleAfterTweetCancel() {
      this.isTweetClicked = false;
    },
    async handleAfterSave(newInfo) {
      try {
        let { data } = await userAPI.editUserInfo(this.currentUser.id, newInfo);
        if (data.status == "error") {
          throw new Error(data.message);
        } else {
          Toast.fire({
            icon: "success",
            title: `更改成功`,
          });
          return this.$router.go(0);
        }
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
