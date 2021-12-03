<template>
  <div class="sidebar-section">
    <div class="action-wrapper">
      <img class="logo" src="../assets/imgs/logo.png" alt="logo" />
      <ul class="sidebar-list">
        <li class="list-item">
          <router-link
            to="/admin/tweets"
            :class="{ focus: this.$route.path === `/admin/tweets` }"
          >
            <font-awesome-icon class="icon" icon="home" />
            <span>推文清單</span>
          </router-link>
        </li>
        <li class="list-item">
          <router-link
            to="/admin/users"
            :class="{ focus: this.$route.path === `/admin/users` }"
          >
            <font-awesome-icon class="icon" icon="user" />
            <span>使用者清單</span>
          </router-link>
        </li>
      </ul>
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
};
</script>

<style lang="scss" scoped>
$orange: #ff6600;
.sidebar-section {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  /** 高還不確定要寫絕對還是相對% **/
  height: 100vh;
  width: 235px;
}

.action-wrapper {
  flex: 1;
  .logo {
    margin-top: 15px;
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
