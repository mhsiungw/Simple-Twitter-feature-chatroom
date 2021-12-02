<template>
  <div class="profile">
    <div class="header">
      <div class="arrow">
        <div @click="$router.go(-1)" class="icon back"></div>
      </div>
      <div class="simple-info">
        <div class="name">{{ user.name ? user.name : "" }}</div>
        <div class="tweet-count">
          {{ user.tweets ? user.tweets.length : 0 }} 推文
        </div>
      </div>
    </div>
    <div class="user-info">
      <div
        class="cover-photo"
        :style="{
          background: `url(${user ? user.cover : ''}) no-repeat center/cover`,
        }"
      ></div>
      <div
        class="avatar"
        :style="{
          background: `url(${user ? user.avatar : ''}) no-repeat center/cover`,
        }"
      ></div>
      <button class="btn-edit" @click="afterClickEditProfile">
        編輯個人資料
      </button>
      <div class="other-button-wrapper">
        <div class="btn-messege">
          <a v-if="user"><div class="icon messege"></div></a>
        </div>
        <div v-if="user">
          <div
            v-if="!user.isSubscribed"
            class="btn-noti"
            @click="addSubscribe(user.user.id)"
          >
            <div class="icon subscribe"></div>
          </div>
          <div
            v-if="user.isSubscribed"
            class="btn-noti already"
            @click="deleteSubscribe(user.user.id)"
          >
            <div class="icon subscribe"></div>
          </div>
        </div>
        <button
          v-if="user.isFollowed"
          class="btn-follow unfollow"
          @click="deleteFollowing(user.user.id)"
        >
          正在跟隨
        </button>
        <button
          v-if="!user.isFollowed"
          class="btn btn-follow"
          @click="addFollowing(user.user.id)"
        >
          跟隨
        </button>
      </div>

      <div class="name">{{ user ? user.name : "no name field" }}</div>
      <div class="account">{{ user ? user.account : "no acc field" }}</div>
      <div class="intro">{{ user ? user.introduction : "no intro field" }}</div>
      <div class="number-followers">
        <div>
          <span @click="$router.push('/users/followings')" class="followings"
            >{{ user.following ? user.following.count : 0 }} 個</span
          ><span
            @click="$router.push('/users/followings')"
            class="type followings"
            >跟隨中</span
          >
          <span @click="$router.push('/users/followers')" class="followers"
            >{{ user.follower ? user.follower.count : 0 }} 個</span
          ><span
            @click="$router.push('/users/followers')"
            class="type followers"
            >跟隨者</span
          >
        </div>
      </div>
    </div>
    <div class="tab">
      <div
        class="item"
        :class="{ active: tabOption === '推文' }"
        @click="selectTab"
      >
        <span class="text">推文</span>
      </div>
      <div
        class="item"
        :class="{ active: tabOption === '推文與回覆' }"
        @click="selectTab"
      >
        <span class="text">推文與回覆</span>
      </div>
      <div
        class="item"
        :class="{ active: tabOption === '喜歡的內容' }"
        @click="selectTab"
      >
        <span class="text">喜歡的內容</span>
      </div>
    </div>
    <TweetList
      v-if="tabOption === '推文'"
      :tweets="user.tweets"
      :isReply="false"
    ></TweetList>
    <TweetList
      v-if="tabOption === '推文與回覆'"
      :tweets="user.userReplies"
      :isReply="true"
    ></TweetList>
    <TweetList
      v-if="tabOption === '喜歡的內容'"
      :tweets="user.userLikes"
      :isReply="false"
    ></TweetList>
    <ModalForEditProfile
      :user="user"
      v-if="showEditProfileModal"
      @after-click-cross="afterClickCross"
      @completeEdit="completeEdit"
    />
  </div>
</template>

<script>
import TweetList from "@/components/TweetList.vue";
import ModalForEditProfile from "@/components/ModalForEditProfile.vue";
import usersAPI from "@/apis/users";

export default {
  name: "Profile",
  components: {
    TweetList,
    ModalForEditProfile,
  },
  data() {
    return {
      user: { tweets: [], userLikes: [], userReplies: [] },
      tabOption: "",
      showEditProfileModal: false,
    };
  },
  watch: {
    "$route.params.id": function () {
      this.fetchProfile();
      this.tabOption = "推文";
    },
  },
  computed: {},
  created() {
    this.fetchProfile();
    this.fetchUserTweets();
    this.fetchUserReplies();
    this.fetchUserLikes();
  },
  methods: {
    selectTab(event) {
      this.tabOption = event.target.children[0]
        ? event.target.children[0].innerText
        : event.target.innerText;
      switch (this.tabOption) {
        case "推文":
          break;
        case "推文與回覆":
          break;
        case "喜歡的內容":
          this.fetchUserLikes();
          break;
      }
    },
    async fetchProfile() {
      const userId =
        this.$route.path === "/users"
          ? this.currentUser.id
          : this.$route.params.id;
      try {
        const getProfile = await usersAPI.getProfile({ userId });
        this.user = { ...getProfile.data };
        this.fetchUserTweets();
      } catch (error) {
        console.log(error);
      }
    },
    async fetchUserTweets() {
      const userId =
        this.$route.path === "/users"
          ? this.currentUser.id
          : this.$route.params.id;
      try {
        const userTweets = await usersAPI.getUserTweets({ userId });
        this.user.tweets = userTweets.data;
        //console.log("this.user.tweets===>", this.user.tweets);
        this.user.tweets = this.user.tweets.map((tweet) => ({
          id: tweet.User.id,
          userId: tweet.UserId,
          name: tweet.User.name,
          avatar: tweet.User.avatar,
          account: tweet.User.account,
          createdAt: tweet.createdAt,
          description: tweet.description,
          likeTweetCount: tweet.Like ? tweet.Like.length : 0,
          replyTweetCount: tweet.Replies ? tweet.Replies.length : 0,
          isLiked: tweet.isLiked,
        }));
        this.tabOption = "推文";
      } catch (error) {
        console.log(error);
      }
    },
    async fetchUserReplies() {
      const userId =
        this.$route.path === "/users"
          ? this.currentUser.id
          : this.$route.params.id;
      try {
        const userReplies = await usersAPI.getUserReplies({ userId });
        this.user.userReplies = userReplies.data;
        console.log("this.userReplies===>", this.user.userReplies);
        this.user.userReplies = this.user.userReplies.map((reply) => {
          return {
            ...reply,
            replyTo: reply.Tweet ? reply.Tweet.User.account : "",
            name: reply.User.name,
            avatar: reply.User.avatar,
            account: reply.User.account,
            description: reply.comment,
            type: "reply",
          };
        });
        this.user.userReplies.sort((a, b) => {
          return a.createdAt < b.createdAt ? 1 : -1;
        });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchUserLikes() {
      const userId =
        this.$route.path === "/user/self"
          ? this.currentUser.id
          : this.$route.params.id;
      try {
        const userLikes = await usersAPI.getUserLikes({ userId });
        this.user.userLikes = userLikes.data;
        console.log("this.user.userLikes====>:", this.user.userLikes);
        // this.userLikes = this.user.userLikes.map((item) => ({
        //   id: item.Tweet.id,
        //   userId: item.Tweet.User.id,
        //   name: item.Tweet.User.name,
        //   avatar: item.Tweet.User.avatar,
        //   account: item.Tweet.User.account,
        //   createdAt: item.Tweet.createdAt,
        //   description: item.Tweet.description,
        //   likeTweetCount: item.likeTweetCount,
        //   replyTweetCount: item.replyTweetCount,
        //   isLiked: item.isLiked,
        //   likedAt: item.createdAt,
        // }));
        this.userLikes.sort((a, b) => {
          return a.likedAt < b.likedAt ? 1 : -1;
        });
      } catch (error) {
        console.log(error);
      }
    },
    async addFollowing() {
      try {
        console.log("addFollowing");
      } catch (error) {
        console.log(error);
      }
    },
    async deleteFollowing() {
      try {
        console.log("deleteFollowing");
      } catch (error) {
        console.log(error);
      }
    },
    async addSubscribe() {
      try {
        console.log("addSubscribe");
      } catch (error) {
        console.log(error);
      }
    },
    async deleteSubscribe() {
      try {
        console.log("deleteSubscribe");
      } catch (error) {
        console.log(error);
      }
    },
    tweetAction() {},
    followAction() {},
    afterClickEditProfile() {
      this.showEditProfileModal = true;
    },
    afterClickCross() {
      this.showEditProfileModal = false;
    },
    completeEdit() {},
  },
};
</script>

<style lang="scss">
$orange: #ff6600;
$deeporange: #f34a16;
$lightdark: #9197a3;
$divider: #e6ecf0;
$bitdark: #657786;
.profile {
  max-height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  border: 1px solid $divider;
  max-width: 600px;
  padding: 0;
  .header {
    height: 55px;
    display: flex;
    flex-direction: row;
    .arrow {
      height: 24px;
      width: 24px;
      margin: 15px 0 0 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon.back {
        width: 17px;
        height: 14px;
        mask: url(../assets/svgs/icon_back.svg) no-repeat center;
        mask-size: contain;
        background-color: #000000;
        cursor: pointer;
      }
    }
    .simple-info {
      margin: 5px 0 0 40px;
      text-align: left;
      .name {
        height: 24px;
        font-size: 19px;
        line-height: 28px;
        font-weight: 900;
      }
      .tweet-count {
        height: 19px;
        font-size: 13px;
        line-height: 19px;
        font-weight: 500;
        color: $bitdark;
      }
    }
  }
  .user-info {
    width: 100%;
    height: 375px;
    position: relative;
    .cover-photo {
      height: 200px;
      background: url(https://images.unsplash.com/photo-1587502537147-2ba64a62e3d3?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2017&q=80)
        no-repeat center;
      background-size: cover;
    }
    .avatar {
      width: 100%;
      max-width: 140px;
      height: 140px;
      border: 4px solid #ffffff;
      background: url(https://source.unsplash.com/collection/4389261/100x100)
        #c4c4c4;
      border-radius: 100px;
      position: absolute;
      left: 15px;
      top: 125px;
    }
    .btn-edit {
      float: right;
      margin: 10px 15px 0 0;
      width: 100%;
      max-width: 122px;
      height: 40px;
      line-height: 15px;
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
        outline: 0;
      }
    }
    .other-button-wrapper {
      margin: 10px 15px 0 0;
      height: 40px;
      width: 192px;
      float: right;
      display: flex;
      flex-direction: row;
      .btn-messege {
        width: 40px;
        height: 40px;
        border: 1px solid $orange;
        margin-right: 10px;
        border-radius: 50%;
        color: $orange;
        font-size: 20px;
        cursor: pointer;
        transition: ease-in 0.2s;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
          background-color: $orange;
          color: #ffffff;
          .icon.messege {
            background-color: #ffffff;
          }
        }
        .icon.messege {
          width: 20px;
          height: 18px;
          mask: url(../assets/svgs/icon_messege.svg) no-repeat center;
          mask-size: contain;
          background-color: $orange;
        }
      }
      .btn-noti {
        width: 40px;
        height: 40px;
        border: 1px solid $orange;
        margin-right: 10px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: ease-in 0.2s;
        &:hover {
          background-color: $orange;
          .icon.subscribe {
            background-color: #ffffff;
          }
        }
        .icon.subscribe {
          width: 23.9px;
          height: 21.9px;
          mask: url(../assets/svgs/icon_subscribe.svg) no-repeat center;
          mask-size: contain;
          background-color: $orange;
        }
      }
      .btn-noti.already {
        background-color: $orange;
        &:hover {
          background-color: #ffffff;
          .icon.subscribe {
            background-color: $orange;
            mask: url(../assets/svgs/icon_subscribe.svg) no-repeat center;
          }
        }
        .icon.subscribe {
          mask: url(../assets/svgs/icon_subscribed.svg) no-repeat center;
          background-color: #ffffff;
        }
      }
      .btn-follow {
        width: 100%;
        max-width: 92px;
        height: 40px;
        border: 1px solid $orange;
        border-radius: 100px;
        color: $orange;
        transition: ease-in 0.2s;
        font-weight: bold;
        font-size: 15px;
        line-height: 15px;
        &:hover {
          box-shadow: 0 0 3px 1px $bitdark;
          background-color: $orange;
          color: #ffffff;
        }
        &:focus {
          outline: 0;
        }
      }
      .btn-follow.unfollow {
        background: $orange;
        color: #ffffff;
        &:hover {
          background-color: $deeporange;
        }
      }
    }
    .name {
      margin: 70px 0 0 15px;
      text-align: left;
      height: 24px;
      font-weight: 900;
      font-size: 19px;
      line-height: 28px;
    }
    .account {
      margin-left: 15px;
      text-align: left;
      height: 22px;
      font-weight: 500;
      font-size: 15px;
      line-height: 22px;
      color: $bitdark;
    }
    .intro {
      margin: 10px 0 0 15px;
      width: 570px;
      height: 20px;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      color: #000000;
      text-align: left;
    }
    .number-followers {
      text-align: left;
      margin: 10px 0 0 15px;
      height: 20px;
      line-height: 20px;
      font-weight: 500;
      font-size: 14px;
      color: 14px;
      .followers,
      .followings {
        cursor: pointer;
      }
      .type {
        color: $bitdark;
        margin-right: 20px;
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
}
</style>
