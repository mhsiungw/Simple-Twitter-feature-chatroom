<template>
  <div class="sign-in-section">
    <div class="title">
      <img src="../assets/imgs/logo.png" alt="" />
      <h4>登入 Alphitter</h4>
    </div>
    <form class="sign-in-form">
      <div class="email-input">
        <label for="email">Email</label>
        <input type="email" id="email" />
      </div>
      <div class="password-input">
        <label for="password">密碼</label>
        <input type="text" id="password" />
      </div>
      <button type="submit">登入</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.sign-in-section {
  margin: 0 auto;
  display: flex;
  flex-direction: center;
  border: 1px solid black;
}
</style>