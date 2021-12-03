<template>
  <div class="setting-section">
    <div class="title">帳戶設定</div>
    <form @submit.stop.prevent="handleSubmit" class="setting-form">
      <div class="input">
        <label for="email">帳號</label>
        <input v-model="settingInfo.account" type="text" id="account-name" />
      </div>
      <div class="input">
        <label for="email">名稱</label>
        <input v-model="settingInfo.name" type="text" id="name" />
      </div>
      <div class="input">
        <label for="email">Email</label>
        <input v-model="settingInfo.email" type="email" id="email" />
      </div>
      <div class="input">
        <label for="email">密碼</label>
        <input
          v-model="settingInfo.password"
          type="password"
          id="password"
          autocomplete="new-password"
        />
      </div>
      <div class="input">
        <label for="email">密碼確認</label>
        <input
          v-model="settingInfo.checkPassword"
          type="password"
          id="password-check"
          autocomplete="new-password"
        />
      </div>
      <button class="save-button">儲存</button>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      settingInfo: {
        account: "",
        name: "",
        email: "",
        password: "",
        checkPassword: "",
      },
    };
  },
  computed: {
    ...mapState(["currentUser"]),
    isEmptyValue() {
      let isEmpty = true;
      for (let item of Object.values(this.settingInfo).reverse()) {
        if (item === "") {
          isEmpty = true;
          //如果有空值就跳出迴圈
          break;
        } else {
          isEmpty = false;
        }
      }
      console.log(isEmpty);
      return isEmpty;
    },
  },
  created() {
    this.fetchCurrentUser();
  },
  methods: {
    fetchCurrentUser() {
      this.settingInfo.account = "@" + this.currentUser.name;
      this.settingInfo.name = this.currentUser.name;
      this.settingInfo.email = this.currentUser.email;
    },
    handleSubmit() {
      if (this.isEmptyValue) {
        return window.alert("請填寫所有欄位在儲存");
      }
      this.$emit("after-submit", this.settingInfo);
    },
  },
};
</script>


<style scoped lang="scss">
$orange: #ff6600;
.setting-section {
  border: 1px solid #e6ecf0;
  .title {
    padding: 14px 0 14px 20px;
    border-bottom: 1px solid #e6ecf0;
    font-size: 18px;
    font-weight: 700;
    font-family: monospace;
  }
  .setting-form {
    display: flex;
    flex-direction: column;
    width: 540px;
    margin-top: 30px;
    margin-left: 20px;
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
    .save-button {
      width: 116px;
      height: 46px;
      background: $orange;
      outline: none;
      border: none;
      cursor: pointer;
      font-size: 18px;
      font-weight: 700;
      color: white;
      border-radius: 20px;
      font-family: monospace;
      align-self: flex-end;
      margin-top: 42px;
    }
  }
}
</style>