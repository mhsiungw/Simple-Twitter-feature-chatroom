<template>
  <div class="recommend-users">
    <div class="title">追蹤前10名</div>
    <div class="list-group">
      <div v-for="user in topUsers" :key="user.id" class="list-group-item">
        <div class="avatar" @click="$router.push(`/users/${user.id}`)">
          <img :src="user.avatar | emptyImage" alt="empty-img" />
        </div>
        <div class="info" @click="$router.push(`/users/${user.id}`)">
          <div class="name">
            {{ user.name }}
          </div>
          <div class="account">＠{{ user.account }}</div>
        </div>
        <div v-if="user.id !== currentUser.id">
          <button
            v-show="user.isFollowed"
            class="btn btn-follow unfollow"
            @click="deleteFollowing(user.id)"
          >
            正在跟隨
          </button>
          <button
            v-show="!user.isFollowed"
            class="btn btn-follow"
            @click="addFollowing(user.id)"
          >
            跟隨
          </button>
        </div>
      </div>
    </div>
    <div v-show="!more" class="footer" @click="more = !more">顯示更多</div>
    <div v-show="more" class="footer" @click="more = !more">顯示更少</div>
  </div>
</template>

<script>
import usersAPI from "@/apis/users";
import followshipsAPI from "@/apis/followships";
import { emptyImageFilter } from "../utils/mixins";
import { Toast } from "@/utils/helpers";
import { mapState } from "vuex";
import bus from "../utils/bus";

export default {
  name: "Trends",

  data() {
    return {
      topUsers: [],
      more: false,
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  created() {
    this.fetchTopUsers();
  },
  mixins: [emptyImageFilter],
  methods: {
    async fetchTopUsers() {
      try {
        const { data } = await usersAPI.getTopUsers();
        //console.log("topuser===>", data);
        this.topUsers = [...data];
        // this.topUsers = this.topUsers
        //   .filter((user) => user.id !== this.currentUser.id)
        //   .slice(0, 8);
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "目前無法為你推薦追蹤，請稍候",
        });
      }
    },
    async addFollowing(userId) {
      try {
        const { data } = await followshipsAPI.addFollowing({ userId });
        // console.log("addfollow", data);
        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.topUsers = this.topUsers.map((user) => {
          if (user.id !== userId) {
            return user;
          } else {
            return {
              ...user,
              followerCount: user.followerCount + 1,
              isFollowed: true,
            };
          }
        });
        this.busForTrends(userId);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法加入追蹤，請稍後再試",
        });
      }
    },
    async deleteFollowing(userId) {
      try {
        const { data } = await followshipsAPI.deleteFollowing({ userId });
        // console.log("deleteFollow", data);
        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.topUsers = this.topUsers.map((user) => {
          if (user.id !== userId) {
            return user;
          } else {
            return {
              ...user,
              followerCount: user.followerCount - 1,
              isFollowed: false,
            };
          }
        });
        this.busForTrends(userId);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取消追蹤，請稍後再試",
        });
      }
    },
    async busForTrends(userId) {
      // 通过 $emit 来触发方法，参数1 是定义方法名，参数2 是你要发送的数据
      bus.$emit("trends-change", userId);
    },
  },
};
</script>

<style lang="scss" scoped>
$orange: #ff6600;
$deeporange: #f34a16;
$lightgray: #f5f8fa;
$bitdark: #657786;
$divider: #e6ecf0;
.recommend-users {
  width: 100%;
  width: 350px;
  max-width: 350px;
  height: 517px;
  border-radius: 14px;
  background: $lightgray;
  .title {
    margin-top: 10px;
    text-align: left;
    padding: 0px 0 0 15px;
    font-size: 18px;
    line-height: 26px;
    height: 36px;
    font-weight: 700;
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
      padding: 10px 15px 0 15px;
      background: none;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      cursor: pointer;
      transition: ease-in 0.2s;
      &:hover {
        backdrop-filter: brightness(0.95);
      }
      .avatar img {
        margin-right: 10px;
        height: 50px;
        width: 50px;
        border-radius: 50%;
        cursor: pointer;
        object-fit: cover;
        &:hover {
          filter: brightness(0.9);
        }
      }
      .info {
        margin-top: 8px;
        display: flex;
        flex-direction: column;
        .name {
          text-align: left;
          margin-bottom: 3px;
          font-size: 15px;
          line-height: 15px;
          font-weight: 700;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
        .account {
          text-align: left;
          font-size: 15px;
          line-height: 15px;
          font-weight: 700;
          color: $bitdark;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      .btn-follow {
        width: 100%;
        max-width: 62px;
        position: absolute;
        top: 20px;
        right: 15px;
        height: 30px;
        line-height: 15px;
        margin-left: auto;
        border: 1px solid $orange;
        background: none;
        font-size: 15px;
        font-weight: 700;
        color: $orange;
        border-radius: 100px;
        transition: ease-in 0.2s;
        &:hover {
          box-shadow: 0 0 3px 1px $bitdark;
          background-color: $orange;
          color: #ffffff;
        }
      }
      .btn-follow.unfollow {
        max-width: 92px;
        background: $orange;
        color: #ffffff;
        &:hover {
          background-color: $deeporange;
        }
      }
    }
  }
  .footer {
    margin-bottom: auto;
    height: 22px;
    line-height: 22px;
    max-width: 60px;
    margin: 12px 0 12px 15px;
    text-align: left;
    font-weight: normal;
    font-size: 15px;
    color: $orange;
    cursor: pointer;
    transition: ease-in 0.2s;
    &:hover {
      text-decoration: underline;
      color: $deeporange;
      font-weight: bold;
    }
  }
}
</style>
