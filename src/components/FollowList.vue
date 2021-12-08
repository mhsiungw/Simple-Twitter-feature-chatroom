<template>
  <div class="follower-main">
    <div class="upper">
      <div class="arrow">
        <div
          @click="$router.push(`/users/${userId}`).catch(() => {})"
          class="icon back"
        ></div>
      </div>

      <div class="title">
        <h3>{{ nowUser.name }}</h3>
        <span v-if="nowUser.tweets">{{ nowUser.tweets.length }} 推文</span>
      </div>
    </div>
    <div class="tab self">
      <div
        class="item"
        :class="{ active: $route.path === `/users/${userId}/followings` }"
        @click="$router.push(`/users/${userId}/followings`)"
      >
        <div class="text">正在跟隨</div>
      </div>
      <div
        class="item"
        :class="{ active: this.$route.path === `/users/${userId}/followers` }"
        @click="$router.push(`/users/${userId}/followers`)"
      >
        <div class="text">追隨者</div>
      </div>
    </div>
    <div class="followListContent">
      <div v-for="follower in followers" :key="follower.id">
        <div class="singleContent">
          <img
            v-if="follower"
            :src="follower.avatar"
            alt=""
            @click="
              $router.push(`/users/${follower.followerId}`).catch(() => {})
            "
          />
          <div
            class="text"
            @click="
              $router.push(`/users/${follower.followerId}`).catch(() => {})
            "
          >
            <h5 v-if="follower" class="title">
              {{ follower.name }}
            </h5>
            <h5 v-if="follower" class="account">＠{{ follower.account }}</h5>
            <p v-if="follower" class="content">{{ follower.introduction }}</p>
          </div>
          <div v-if="follower.name !== currentUser.name">
            <button
              v-show="follower.isFollowed"
              class="btn-follow unfollow"
              @click="deleteFollowing(follower.UserId)"
            >
              正在跟隨
            </button>
            <button
              v-show="!follower.isFollowed"
              class="btn-follow"
              @click="addFollowing(follower.UserId)"
            >
              跟隨
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "@/utils/helpers";
import followshipsAPI from "@/apis/followships";
import { mapState } from "vuex";

export default {
  name: "FollowList",
  data() {
    return {
      followers: [],
      userId: "",
    };
  },
  props: {
    initialFollowers: {
      type: Array,
    },
    nowUser: {
      type: Object,
    },
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated", "followers", "followings"]),
  },
  watch: {
    initialFollowers: function () {
      this.followers = this.initialFollowers;
    },
  },
  created() {
    this.userId = this.$route.params.id;
    this.followers = this.initialFollowers;
  },
  methods: {
    async addFollowing(userId) {
      try {
        const { data } = await followshipsAPI.addFollowing({ userId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.followers.filter((user) => {
          if (user.UserId === userId) {
            user.isFollowed = true;
          }
        });

        // emit透過物件事件傳送
        this.$bus.$emit("toastMessage");
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

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.followers.filter((user) => {
          if (user.UserId === userId) {
            user.isFollowed = false;
          }
        });

        // emit透過物件事件傳送
        this.$bus.$emit("toastMessage");
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取消追蹤，請稍後再試",
        });
      }
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
.follower-main {
  border-left: 1px solid $divider;
  width: 600px;
  display: flex;
  flex-direction: column;
  .upper {
    display: flex;
    flex-direction: row;
    .arrow {
      cursor: pointer;
      width: 17px;
      height: 14px;
      margin: 20px 43px 0 20px;
      .icon.back {
        width: 17px;
        height: 14px;
        mask: url(../assets/svgs/icon_back.svg) no-repeat center;
        mask-size: contain;
        background-color: #000000;
        cursor: pointer;
      }
    }
    .title {
      h3 {
        font-family: Noto Sans TC;
        font-style: normal;
        font-weight: 900;
        font-size: 19px;
        line-height: 28px;
        margin-bottom: 0;
      }
      span {
        font-family: Noto Sans TC;
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 19px;
      }
    }
  }
  .tab {
    border-bottom: 1px solid $divider;
    height: 54px;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    .item {
      width: 100%;
      max-width: 130px;
      height: 54px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: ease-in 0.2s;
      &:hover {
        backdrop-filter: brightness(0.95);
      }
      .text {
        z-index: -1;
        font-weight: bold;
        font-size: 15px;
        line-height: 22px;
        color: $bitdark;
      }
    }
    .item.active {
      border-bottom: 2px solid $orange;
      .text {
        color: $orange;
      }
    }
  }
  .followListContent {
    height: 104px;
    width: 100%;
    .singleContent {
      width: 100%;
      display: flex;
      flex-direction: row;
      position: relative;
      border-bottom: 1px solid lightgrey;
      img {
        width: 50px;
        min-width: 50px;
        height: 50px;
        min-height: 50px;
        border-radius: 50%;
        object-fit: cover;
        margin: 15px 10px 0 15px;
      }
      .text {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: 10px;
        margin-bottom: 10px;
        .title {
          font-family: Noto Sans TC;
          font-style: normal;
          font-weight: bold;
          font-size: 15px;
          line-height: 15px;
          text-align: start;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
        .account {
          font-family: Noto Sans TC;
          font-style: normal;
          font-weight: 500;
          font-size: 15px;
          line-height: 15px;
          text-align: start;
          cursor: pointer;
          color: $bitdark;
          &:hover {
            text-decoration: underline;
          }
        }
        .content {
          width: 100%;
          font-family: Noto Sans TC;
          font-style: normal;
          font-weight: 500;
          font-size: 15px;
          line-height: 22px;
          text-align: start;
          margin: 0 15px 0 0;
        }
      }
      .btn-follow {
        cursor: pointer;
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
        &:focus {
          outline: none;
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
}
</style>
