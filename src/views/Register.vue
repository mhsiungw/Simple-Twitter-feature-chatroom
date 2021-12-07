<template>
  <div class="register-section">
    <div class="title">
      <img src="../assets/imgs/logo.png" alt="" />
      <h4>建立你的帳號</h4>
    </div>
    <form
      @submit.stop.prevent="handleSubmit"
      class="register-form"
      novalidate="true"
    >
      <div class="input-part">
        <label for="account-name">帳號</label>
        <input v-model="account" type="text" id="account-name" maxlength="20" />
        <p class="word-count" :class="{ 'word-limit': account.length == 20 }">
          {{ account.length }}/20
        </p>
      </div>
      <div class="input-part">
        <label for="name">名稱</label>
        <input v-model="name" type="text" id="name" maxlength="50" />
        <p class="word-count" :class="{ 'word-limit': name.length == 50 }">
          {{ name.length }}/50
        </p>
      </div>
      <div class="input-part">
        <label for="email">Email</label>
        <input
          v-model="email"
          type="email"
          id="email"
          :class="{ 'invalid-email': isEmailInvalid }"
        />
        <p v-if="isEmailInvalid" class="type-check">請輸入正確的 email 格式</p>
      </div>
      <div class="input-part">
        <label for="password">密碼</label>
        <input
          v-model="password"
          type="password"
          id="password"
          maxlength="20"
        />
        <p class="word-count" :class="{ 'word-limit': password.length == 20 }">
          {{ password.length }}/20
        </p>
      </div>
      <div class="input-part">
        <label for="password-check">密碼確認</label>
        <input
          v-model="checkPassword"
          type="password"
          id="password-check"
          maxlength="20"
        />
        <p
          class="word-count"
          :class="{ 'word-limit': checkPassword.length == 20 }"
        >
          {{ checkPassword.length }}/20
        </p>
      </div>
      <button class="submit-button" type="submit">註冊</button>
      <button
        @click.stop.prevent="$router.push('/login')"
        class="cancel-button"
      >
        取消
      </button>
    </form>
  </div>
</template>

<script>
import authorizationAPI from "../apis/authorization";
import { Toast } from "../utils/helpers";

export default {
  data() {
    return {
      account: "",
      name: "",
      email: "",
      password: "",
      checkPassword: "",
      isEmailInvalid: false,
    };
  },
  watch: {
    email: function () {
      if (!this.validEmail(this.email)) {
        this.isEmailInvalid = true;
      } else {
        this.isEmailInvalid = false;
      }
    },
  },
  methods: {
    validEmail: function (email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    async handleSubmit() {
      try {
        if (
          this.account === "" ||
          this.name === "" ||
          this.email === "" ||
          this.password === "" ||
          this.checkPassword === ""
        ) {
          return Toast.fire({
            icon: "warning",
            title: "請填寫所有欄目",
          });
        }
        if (this.password !== this.checkPassword) {
          return Toast.fire({
            icon: "warning",
            title: "密碼不一致",
          });
        }

        if (!this.validEmail(this.email)) {
          return Toast.fire({
            icon: "warning",
            title: "請填寫正確的 email 格式",
          });
        }
        //串 API
        let { data } = await authorizationAPI.register({
          account: this.account,
          name: this.name,
          email: this.email,
          password: this.password,
          checkPassword: this.checkPassword,
        });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        if (data.status === "success") {
          Toast.fire({
            icon: "success",
            title: data.message,
          });
          this.$router.push({ name: "Login" });
        }
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: `無法註冊，請稍後再試 \n 錯誤原因：${error}`,
        });
      }
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
    .input-part {
      display: flex;
      flex-direction: column;
      background: #f5f8fa;
      width: 540px;
      height: 52px;
      border-radius: 8px;
      margin-bottom: 40px;
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
        &:focus,
        &:hover {
          border-bottom: 1px solid #50b5ff;
        }
        &.invalid-email {
          border-bottom: 1px solid #fc5a5a;
        }
      }
      .word-count {
        font-size: 12px;
        color: #657786;
        align-self: flex-end;
        &.word-limit {
          color: #fc5a5a;
        }
      }
      .type-check {
        font-size: 12px;
        align-self: flex-end;
        color: #fc5a5a;
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