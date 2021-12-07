<template>
  <div class="loading" v-if="isLoading">
    <span class="loader"> </span>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
$secondary: #f34a16;
$primary: #ff6600;

.loading {
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: rgba(#000, 0.7);
  z-index: 1080;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
}

.loader {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  border: 4px solid;
  border-color: $secondary #fff transparent transparent;
  -webkit-animation: rotation 1s linear infinite;
  animation: rotation 1s linear infinite;
  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border: 4px solid;
    border-color: transparent transparent $secondary $primary;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    -webkit-animation: rotationBack 0.5s linear infinite;
    animation: rotationBack 0.5s linear infinite;
    transform-origin: center center;
  }
  &::before {
    width: 42px;
    height: 42px;
    border-color: #fff #fff transparent transparent;
    -webkit-animation: rotation 1.5s linear infinite;
    animation: rotation 1.5s linear infinite;
  }
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
