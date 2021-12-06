<template>
  <div id="app" class="app-container">
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

<style scoped>
.app-container {
  min-width: 100%;
}
</style>