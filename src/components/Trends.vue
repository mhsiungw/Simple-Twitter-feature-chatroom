<template>
  <div class="recommend-users">
    <div class="title">跟隨誰</div>
    <div class="list-group">
      <div v-for="user in popularUsers" :key="user.id" class="list-group-item">
        <div class="avatar"><img :src="user.avatar" alt="" /></div>
        <div class="info">
          <div class="name">
            {{ user.name }}
          </div>
          <div class="account">
            {{ user.account }}
          </div>
        </div>
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
    <div v-show="!more" class="footer" @click="more = !more">顯示更多</div>
    <div v-show="more" class="footer" @click="more = !more">顯示更少</div>
  </div>
</template>

<script>


const dummyData = {
  users: [
    {
      id: 1,
      name: "minhsiung",
      avatar:
        "https://ca.slack-edge.com/T01L0ECKVH9-U0271BY8464-e33af84d2111-512",
      account: "@minhsung",
      followerCount: 10,
      isFollowed: true,
    },
    {
      id: 2,
      name: "LIN CH",
      avatar:
        "https://ca.slack-edge.com/T01L0ECKVH9-U0271BY8464-e33af84d2111-512",
      account: "@LIN CH",
      followerCount: 10,
      isFollowed: true,
    },
    {
      id: 3,
      name: "Will",
      avatar:
        "https://ca.slack-edge.com/T01L0ECKVH9-U0271BY8464-e33af84d2111-512",
      account: "@Will",
      followerCount: 10,
      isFollowed: true,
    },
    {
      id: 4,
      name: "DanLin",
      avatar:
        "https://ca.slack-edge.com/T01L0ECKVH9-U0271BY8464-e33af84d2111-512",
      account: "@DanLin",
      followerCount: 10,
      isFollowed: false,
    },
  ],
};

export default {
  name: "PopularUsers",

  data() {
    return {
      popularUsers: [],
      more: false,
    };
  },
  created() {
    this.fetchTopUsers();
  },
  methods: {
    async fetchTopUsers() {
      try {
        const { users } = { ...dummyData };
        this.popularUsers = users;
        //console.log(this.popularUsers);
      } catch (error) {
        console.log(error);
      }
    },
    async addFollowing() {
      try {
        console.log("addTest");
      } catch (error) {
        console.log("error");
      }
    },
    async deleteFollowing() {
      try {
        console.log("deleteTest");
      } catch (error) {
        console.log("error");
      }
    },
    followAction() {
      console.log("followAction");
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
.recommend-users {
  width: 100%;
  min-width: 350px;
  max-width: 350px;
  height: 517px;
  margin: 15px 82px 0 30px;
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
