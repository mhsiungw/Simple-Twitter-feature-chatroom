<template>
  <div class="register-section">
    <div class="title">
      <img src="../assets/imgs/logo.png" alt="" />
      <h4>建立你的帳號</h4>
    </div>
    <form @submit.stop.prevent="handleSubmit" class="register-form">
      <div class="input">
        <label for="email">帳號</label>
        <input v-model="acount" type="text" id="acount-name" />
      </div>
      <div class="input">
        <label for="email">名稱</label>
        <input v-model="name" type="text" id="name" />
      </div>
      <div class="input">
        <label for="email">Email</label>
        <input v-model="email" type="email" id="email" />
      </div>
      <div class="input">
        <label for="email">密碼</label>
        <input v-model="password" type="password" id="password" />
      </div>
      <div class="input">
        <label for="email">密碼確認</label>
        <input v-model="checkPassword" type="password" id="password-check" />
      </div>
      <button class="submit-button" type="submit">註冊</button>
      <button class="cancel-button" type="submit">取消</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      acount: "",
      name: "",
      email: "",
      password: "",
      checkPassword: "",
    };
  },
  methods: {
    handleSubmit() {
      if (this.password !== this.checkPassword) {
        window.alert("unmatched passwords");
      }
      if (
        !this.account ||
        !this.name ||
        !this.email ||
        !this.password ||
        !this.checkPassword
      ) {
        window.alert("please fill out the form");
      }
      //串 API
      window.alert("regist successfully");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>



<style scoped lang="scss">
$orange: #ff6600;

.register-section {
  margin: 60px auto;
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
  .register-form {
    display: flex;
    flex-direction: column;
    .input {
      display: flex;
      flex-direction: column;
      background: #f5f8fa;
      width: 540px;
      height: 52px;
      border-radius: 8px;
      margin-bottom: 32px;
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
    button {
      outline: none;
      border: none;
      cursor: pointer;
      font-size: 18px;
      font-weight: 700;
    }
    .submit-button {
      width: 540px;
      height: 46px;
      border-radius: 16px;
      background: $orange;
      color: white;
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 20px;
    }
    .cancel-button {
      background: white;
      color: #0099ff;
      text-decoration: underline;
    }
  }
}
</style>