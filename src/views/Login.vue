<template>
  <div class="sign-in-section">
    <div class="title">
      <img src="../assets/imgs/logo.png" alt="" />
      <h4>{{ isAdminLogin ? "後台登入" : "登入 Alphitter" }}</h4>
    </div>
    <form @submit.prevent.stop="handleSubmit" class="sign-in-form">
      <div class="input email-input">
        <label for="email">Email</label>
        <input v-model="email" type="email" id="email" />
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
        <span class="dot">．</span>
        <router-link :to="isAdminLogin ? '/login' : '/admin/login'">
          {{ isAdminLogin ? "前台登入" : "後台登入" }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import authorizationAPI from "../apis/authorization";

export default {
  data() {
    return {
      email: "",
      password: "",
      isAdminLogin: this.$route.path === "/admin/login",
    };
  },
  watch: {
    $route() {
      this.isAdminLogin = this.$route.path === "/admin/login";
    },
  },
  methods: {
    async handleSubmit() {
      if (!this.email || !this.password) {
        window.alert("please enter input");
        return;
      }
      // 串接 API
      const response = await authorizationAPI.logIn({
        email: this.email,
        password: this.password,
      });
      // 將 token 存放在 localStorage 內
      localStorage.setItem("simpleTwitter-token", response.data.token);
      // 成功登入後轉址到餐廳首頁
      this.$router.push("/");
    },
  },
};
</script>

<style scoped lang="scss">
$orange: #ff6600;

.sign-in-section {
  margin: 200px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title {
    text-align: center;
    img {
      width: 40px;
      height: 40px;
    }
    h4 {
      font-size: 23px;
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
      &.email-input {
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
