<template>
  <div class="sidebar-section">
    <div class="action-wrapper">
      <img class="logo" src="../assets/imgs/logo.png" alt="logo" />
      <ul class="sidebar-list">
        <li class="list-item">
          <router-link to="/" :class="{ focus: this.$route.path === '/' }">
            <font-awesome-icon class="icon" icon="home" />
            <span>首頁</span>
          </router-link>
        </li>
        <li class="list-item">
          <router-link
            :to="{ name: 'UserPage', params: { id: currentUser.id } }"
            :class="{ focus: this.$route.path === `/users/${currentUser.id}` }"
          >
            <font-awesome-icon class="icon" icon="user" />
            <span>個人資料</span>
          </router-link>
        </li>
        <li class="list-item">
          <router-link
            :to="{ name: 'SettingPage', params: { id: currentUser.id } }"
            :class="{
              focus: this.$route.path === `/${currentUser.id}/setting`,
            }"
          >
            <font-awesome-icon class="icon" icon="cog" />
            <span>設定</span>
          </router-link>
        </li>
      </ul>
      <button class="tweet-button">推文</button>
    </div>
    <button class="logout-button">
      <img class="logout" src="../assets/imgs/logout.png" alt="logout" />
      <span>登出</span>
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    console.log(this.$route.path);
  },
};
</script>


<style lang="scss" scoped>
$orange: #ff6600;
.sidebar-section {
  margin-top: 15px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  /** 高還不確定要寫絕對還是相對% **/
  height: 98vh;
  width: 235px;
}

.action-wrapper {
  flex: 1;
  .logo {
    width: 30px;
    height: 30px;
  }
  .sidebar-list {
    list-style: none;
    padding-left: 0;
    .list-item {
      margin-top: 31px;
      .icon {
        width: 20px;
        height: 20px;
        margin-right: 24px;
      }
      a {
        text-decoration: none;
        color: black;
        display: flex;
        align-items: center;
        &.focus {
          color: $orange;
        }
      }
    }
  }
  .tweet-button {
    margin-top: 24px;
    width: 210px;
    height: 38px;
    border-radius: 10px;
    background: $orange;
    border: none;
    outline: none;
    color: white;
    font-weight: 800;
    font-family: "Noto Sans TC";
    cursor: pointer;
  }
}

.logout-button {
  outline: none;
  border: none;
  background: white;
  display: flex;
  align-items: center;
  cursor: pointer;
  .logout {
    width: 24px;
    height: 24px;
    margin-right: 20px;
  }
  &span {
    font-weight: 800;
    font-family: "Noto Sans TC";
  }
}
</style>
