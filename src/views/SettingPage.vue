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
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

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
        console.log("handleAfterSubmit", newDescription);
        let newInput = {
          Likes: [],
          Replies: [],
          User: {
            avatar: this.currentUser.image,
            name: this.currentUser.name,
            account: this.currentUser.name,
          },
          UserId: this.currentUser.id,
          id: uuidv4(),
          createdAt: moment().format(),
          description: newDescription,
        };
        console.log(newInput);
        // 發送 API
        let { data } = await tweetsAPI.postTweet({
          UserId: newInput.UserId,
          description: newDescription,
        });
        if (data.status !== "success") {
          throw new Error(data.status);
        }
        console.log(data);
        //頁面即時更新
        // this.tweets.push(newInput);
        // workaround 如果可以知道我們要穿什麼 id 過去，或者後端的 id 可以由前端傳過去...
        this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
    handleAfterTweetClick() {
      this.isTweetClicked = true;
    },
    handleAfterTweetCancel() {
      this.isTweetClicked = false;
    },
    async handleAfterSave(newInfo) {
      console.log("handleAfterSave", newInfo);
      try {
        let response = await userAPI.editUserInfo(this.currentUser.id, newInfo);
        console.log("response", response);
        if (response.statusText !== "OK") {
          throw new Error(response.statusText);
        } else {
          window.alert("更改成功");
          return this.$router.go(0);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.setting-page-container {
  margin: 0 auto;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  height: 100vh;
  .setting-section {
    width: 1063px;
  }
  .sidebar-section {
    // width: 378px;
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    position: fixed;
    left: 100px;
  }
}
</style>
