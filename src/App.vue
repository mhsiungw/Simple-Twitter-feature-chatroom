<template>
  <div id="app" class="container">
    <router-view />
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  name: "App",
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-flow: row nowrap;
}
</style>
