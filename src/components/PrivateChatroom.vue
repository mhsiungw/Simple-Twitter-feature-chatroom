<template>
  <div class="chat-room">
    <div class="chat-users">
      <div class="title">
        訊息
        <div class="icon messege"></div>
      </div>
      <div class="list-group" v-if="historyChatUsers.length > 0">
        <div
          v-for="(user, idx) in historyChatUsers"
          :key="`${user.id + Math.random()}`"
          class="list-group-item"
          @click="controlActive(user, idx)"
        >
          <div v-show="messengeActive[idx]" class="active-bar"></div>
          <div
            class="avatar"
            @click="$router.push(`/user/other/${user.id}`).catch(() => {})"
            :style="{
              background: `url(${
                user ? user.avatar : ''
              }) no-repeat center/cover`,
            }"
          ></div>
          <div class="info">
            <div
              class="name"
              @click="$router.push(`/user/other/${user.id}`).catch(() => {})"
            >
              {{ user.name }}
            </div>
            <div
              class="account"
              @click="$router.push(`/user/other/${user.id}`).catch(() => {})"
            >
              {{ user.account }}
            </div>
          </div>
          <div class="unread-wrapper" v-if="user.unread > 0">
            <div class="unread">{{ user.unread }}</div>
          </div>
        </div>
      </div>
    </div>
    <PrivateMessengeBoard
      :userChatTo="userChatTo"
      :messages="histroyMessages"
      :targetChannel="targetChannel"
      @sendPrivateMessage="receiveMessage"
    >
    </PrivateMessengeBoard>
  </div>
</template>

<script>
import { Toast } from "@/utils/helpers";
import { mapState } from "vuex";
import usersAPI from "@/apis/users";
import chatAPI from "@/apis/chats";
import PrivateMessengeBoard from "@/components/PrivateMessengeBoard.vue";
export default {
  components: {
    PrivateMessengeBoard,
  },
  data() {
    return {
      messengeActive: [],
      userChatTo: {},
      historyChatUsers: [],
      historyChatUserId: [],
      allHistoryMessages: [],
      histroyMessages: [],
      unreadMessages: [],
      targetChannel: "",
      users: [],
      privateRoomData: {},
    };
  },
  mounted() {
    const userId = this.$route.params.id;
    console.log("userId", userId);
    this.$bus.$on("updateChatUsers", (message) => {
      this.updateChatUsers(message);
      this.readMessages(this.userChatTo.id);
    });
    this.targetChannel =
      Number(userId) > Number(this.currentUser.id)
        ? `${this.currentUser.id}_${userId}`
        : `${userId}_${this.currentUser.id}`;
    console.log(this.targetChannel);
    return Promise.all([
      this.fetchUsers(userId),
      this.fetchPrivateChatroom(userId),
    ]).then(() => {
      console.log("done Promise");

      this.$socket.emit("private chatroom", this.targetChannel);
    });
  },
  beforeDestroy() {
    this.$socket.emit("leave private chatroom", this.targetChannel);
    this.readMessages(this.userChatTo.id);
    this.$bus.$off("updateChatUsers");
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  watch: {
    historyChatUsers() {},
  },
  methods: {
    receiveMessage(message) {
      this.allHistoryMessages = [...this.allHistoryMessages, message];
      this.histroyMessages = this.allHistoryMessages;
    },
    controlActive(user, index) {
      console.log("controlActive", user, index);
    },
    async fetchPrivateChatroom(userId) {
      console.log("userId====>", userId);
      try {
        const { data } = await chatAPI.getPrivateChatRoom({ userId });
        console.log("getPrivateChatRoom==>", data);
        this.privateRoomData = data;
        this.allHistoryMessages = [...data];
        this.histroyMessages = [...data];

        // this.histroyMessages = this.histroyMessages.map((r) => {
        //   if (r.SenderId === this.currentUser.id) {
        //     r.ReceiverId = String(r.ReceiverId);
        //   }
        //   return r;
        // });
        return this.privateRoomData;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "目前無法連線聊天室，請稍候",
        });
      }
    },
    async fetchUsers(userId) {
      console.log(userId);
      try {
        const { data } = await usersAPI.getProfile({ userId });
        this.users = data;
        return this.users;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "目前無法取得資料，請稍候",
        });
      }
    },
    async readMessages(userId) {
      try {
        console.log(userId);
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "目前無法已讀訊息，請稍候",
        });
      }
    },
    async updateChatUsers(message) {
      console.log(message);
    },
  },
};
</script>

<style lang="scss">
$orange: #ff6600;
$deeporange: #f34a16;
$lightgray: #f5f8fa;
$bitdark: #657786;
$divider: #e6ecf0;
.chat-room {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  .chat-users {
    width: 100%;
    max-width: 375px;
    .title {
      width: 100%;
      position: relative;
      text-align: left;
      padding: 15px 0 0 15px;
      font-weight: bold;
      font-size: 18px;
      line-height: 26px;
      height: 55px;
      .icon.messege {
        top: 20px;
        right: 15px;
        position: absolute;
        width: 20px;
        height: 18px;
        mask: url(../assets/svgs/icon_messege.svg) no-repeat center;
        mask-size: contain;
        background-color: #000000;
      }
    }
    .list-group {
      border: none;
      .list-group-item {
        position: relative;
        border: none;
        border-radius: 0;
        border-top: 1px solid $divider;
        border-bottom: 1px solid $divider;
        height: 71px;
        padding: 10px 15px 10px 15px;
        background: none;
        display: flex;
        flex-direction: row;
        align-items: center;
        cursor: pointer;
        transition: ease-in 0.2s;
        &:hover {
          backdrop-filter: brightness(0.95);
        }
        .active-bar {
          width: 2px;
          height: 100%;
          position: absolute;
          top: 0;
          right: 0;
          background: $orange;
        }
        .avatar {
          margin-right: 10px;
          height: 50px;
          width: 50px;
          border-radius: 50%;
          cursor: pointer;
          &:hover {
            filter: brightness(0.9);
          }
        }
        .info {
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          height: 28px;
          .name {
            text-align: left;
            margin-right: 10px;
            font-weight: 900;
            font-size: 19px;
            height: 28px;
            line-height: 28px;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
          .account {
            text-align: left;
            font-weight: 500;
            font-size: 15px;
            line-height: 22px;
            vertical-align: bottom;
            height: 24px;
            color: $bitdark;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
        }
        .unread-wrapper {
          flex-grow: 1;
          .unread {
            margin: auto;
            font-size: 16px;
            font-weight: 700;
            width: 24px;
            height: 24px;
            color: #ffffff;
            border-radius: 30px;
            background-color: $bitdark;
          }
        }
      }
    }
  }
}
</style>
