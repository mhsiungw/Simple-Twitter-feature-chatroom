<template>
  <div class="sign-in-section">
    <div class="title">
      <img src="../assets/imgs/logo.png" alt="" />
      <h4>{{ isAdminLogin ? "後台登入" : "登入 Alphitter" }}</h4>
    </div>
    <form @submit.prevent.stop="handleSubmit" class="sign-in-form">
      <div class="input account-input">
        <label for="account">account</label>
        <input v-model="account" type="account" id="account" />
      </div>
      <div class="input password-input">
        <label for="password">密碼</label>
        <input v-model="password" type="password" id="password" />
      </div>
      <button class="sign-in-button" type="submit">登入</button>
      <div class="other-links">
        <router-link v-if="!isAdminLogin" to="/register"
          >註冊 Alphitter</router-link
        >
        <span v-if="!isAdminLogin" class="dot">．</span>
        <router-link :to="isAdminLogin ? '/login' : '/admin/login'">
          {{ isAdminLogin ? "前台登入" : "後台登入" }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import authorizationAPI from "../apis/authorization";
import adminAPI from "../apis/admin";
import { mapState } from "vuex";

export default {
  data() {
    return {
      account: "",
      password: "",
      //用來辨別是否為後台登入頁面
      isAdminLogin: this.$route.path === "/admin/login",
    };
  },
  watch: {
    //用來辨別是否為後台登入頁面
    $route() {
      this.isAdminLogin = this.$route.path === "/admin/login";
    },
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    async handleSubmit() {
      if (!this.account || !this.password) {
        return window.alert("please enter input");
      }
      /************     
      因為後台登入和前台登入都在同一個頁面，所以要做一個判斷式判斷現在登入的使用者是否為後台管理者
      ************/
      let { data } = this.isAdminLogin
        ? await adminAPI.adminLogin({
            account: this.account,
            password: this.password,
          })
        : await authorizationAPI.logIn({
            account: this.account,
            password: this.password,
          });
      // 如果登入失敗
      console.log(data);
      if (data.status !== "success") {
        this.account = "";
        this.password = "";
        window.alert("Login failed");
        throw new Error(data.status);
      }
      // Vuex mutation setCurrentUser
      this.$store.commit("setCurrentUser", data.user);
      // 存取 token 並轉到 MainPage
      localStorage.setItem("simpleTwitter-token", data.token);

      /************     
      因為後台登入和前台登入都在同一個頁面，所以要做一個判斷式判斷現在登入的使用者是否為後台管理者
      ************/
      if (this.isAdminLogin === false) {
        this.$router.push("/");
      } else if (this.isAdminLogin === true) {
        this.$router.push("/admin/users");
      }
    },
  },
};
</script>

<style scoped lang="scss">
$orange: #ff6600;

.sign-in-section {
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title {
    text-align: center;
    margin-bottom: 40px;
    img {
      width: 40px;
      height: 40px;
    }
    h4 {
      font-size: 23px;
      margin-top: 25px;
    }
  }
  .sign-in-form {
    .input {
      display: flex;
      flex-direction: column;
      background: #f5f8fa;
      width: 540px;
      height: 52px;
      border-radius: 8px;
      &.account-input {
        margin-bottom: 32px;
      }
      &.password-input {
        margin-bottom: 42px;
      }
      label {
        flex: 1;
        padding: 2px 0 0 5px;
        color: #657786;
        font-size: 15px;
        font-weight: 500;
      }
      input {
        border: none;
        border-bottom: 1px solid #657786;
        outline: none;
        background: #f5f8fa;
        font-size: 20px;
        color: #657786;
        letter-spacing: 2px;
      }
    }
    .sign-in-button {
      width: 540px;
      height: 46px;
      border-radius: 16px;
      background: $orange;
      color: white;
      font-size: 18px;
      font-weight: 700;
      outline: none;
      border: none;
      cursor: pointer;
      margin-bottom: 20px;
    }
  }

  .other-links {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .dot {
      color: #0099ff;
    }
    a {
      display: inline-block;
      text-decoration: none;
      border-bottom: 1px solid#0099ff;
      padding: 0;
      color: #0099ff;
      font-weight: 700;
      font-size: 18px;
    }
  }
}
</style>
