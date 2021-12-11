<template>
  <div class="chat-main">
    <UserSidebar />
    <div class="chat-container">
      <Chatroom />
    </div>
  </div>
</template>

<script>
import UserSidebar from "../components/UserSidebar.vue";

import { mapState } from "vuex";
import Chatroom from "@/components/Chatroom.vue";
export default {
  components: {
    Chatroom,
    UserSidebar,
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
};
</script>

<style lang="scss">
$orange: #ff6600;
$deeporange: #f34a16;
$lightdark: #9197a3;
$divider: #e6ecf0;
.chat-main {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  position: relative;
  margin: 0 auto;
  width: 1440px;
  max-width: 1440px;

  .chat-container {
    width: 100%;
    max-height: 100vh;
    overflow-y: scroll;
    border-left: 1px solid $divider;
    padding: 0;
  }
}
</style>
