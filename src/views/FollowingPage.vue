<template>
  <div class="row page-container">
    <UserSidebar class="col-3" />
    <FollowList
      v-show="$route.path === '/user/followers'"
      :initialFollowers="followers"
      :nowUser="user"
    />
    <FollowList
      v-show="$route.path === '/user/followings'"
      :initialFollowers="followings"
      :nowUser="user"
    />
    <Trends class="col-4" />
  </div>
</template>

<script>
import FollowList from "../components/FollowList.vue";
import UserSidebar from "../components/UserSidebar.vue";
import Trends from "../components/Trends.vue";
import { Toast } from "@/utils/helpers";

const dummyData = {
  data: {
    user: {
      tweets: [
        {
          id: 23,
          userId: 44,
          name: "test332412",
          avatar:
            "https://ca.slack-edge.com/T01L0ECKVH9-U0271BY8464-e33af84d2111-512",
          account: "@minhsung",
          createdAt: new Date(),
          description: "testXDDDDDD",
          likeTweetCount: 16,
          replyTweetCount: 57,
          isLiked: true,
        },
        {
          id: 23,
          userId: 44,
          name: "test332412",
          avatar:
            "https://ca.slack-edge.com/T01L0ECKVH9-U029Q08104V-g67abce21890-512",
          account: "@minhsung",
          createdAt: new Date(),
          description: "testXDDDDDD",
          likeTweetCount: 13,
          replyTweetCount: 99,
          isLiked: true,
        },
        {
          id: 23,
          userId: 44,
          name: "test332412",
          avatar:
            "https://ca.slack-edge.com/T01L0ECKVH9-U022PUC3C7P-411ed5d8c3fe-512",
          account: "@minhsung",
          createdAt: new Date(),
          description: "testXDDDDDD",
          likeTweetCount: 22,
          replyTweetCount: 33,
          isLiked: true,
        },
      ],
      id: 1,
      userId: 11,
      name: "test123",
      avatar:
        "https://ca.slack-edge.com/T01L0ECKVH9-U0271BY8464-e33af84d2111-512",
      account: "@minhsung",
      createdAt: new Date(),
      description: "testXDDDDDD",
      likeTweetCount: 13,
      replyTweetCount: 12,
      isLiked: true,
    },
    follower: {
      count: 14,
    },
    following: {
      count: 201,
    },
    replies: [
      {
        id: 23,
        UserId: 14,
        TweetId: 11,
        comment: "voluptatem eligendi dolores",
        replyTo: "1232412",
        name: "test123",
        avatar:
          "https://ca.slack-edge.com/T01L0ECKVH9-U0271BY8464-e33af84d2111-512",
        account: "@william",
        description: "voluptatem eligendi dolores1233",
        type: "reply",
        createdAt: new Date(),
      },
      {
        id: 23,
        UserId: 14,
        TweetId: 11,
        comment: "voluptatem eligendi dolores",
        replyTo: "1232412",
        name: "test123",
        avatar:
          "https://ca.slack-edge.com/T01L0ECKVH9-U0271BY8464-e33af84d2111-512",
        account: "@william",
        description: "voluptatem eligendi dolores123332312s",
        type: "reply",
        createdAt: new Date(),
      },

      {
        id: 23,
        UserId: 14,
        TweetId: 11,
        comment: "voluptatem eligendi dolores",
        replyTo: "1232412",
        name: "test123",
        avatar:
          "https://ca.slack-edge.com/T01L0ECKVH9-U0271BY8464-e33af84d2111-512",
        account: "@william",
        description: "voluptatem eligendi dolores123332312s",
        type: "reply",
        createdAt: new Date(),
      },
    ],
  },
};

const dummyFollowList = {
  followers: [
    {
      id: 23,
      userId: 44,
      name: "test332412",
      avatar:
        "https://ca.slack-edge.com/T01L0ECKVH9-U0271BY8464-e33af84d2111-512",
      account: "@minhsung",
      createdAt: new Date(),
      description: "testXDDDDDD",
      likeTweetCount: 16,
      replyTweetCount: 57,
      isLiked: true,
    },
    {
      id: 23,
      userId: 44,
      name: "test332412",
      avatar:
        "https://ca.slack-edge.com/T01L0ECKVH9-U029Q08104V-g67abce21890-512",
      account: "@minhsung",
      createdAt: new Date(),
      description: "testXDDDDDD",
      likeTweetCount: 13,
      replyTweetCount: 99,
      isLiked: true,
    },
    {
      id: 23,
      userId: 44,
      name: "test332412",
      avatar:
        "https://ca.slack-edge.com/T01L0ECKVH9-U022PUC3C7P-411ed5d8c3fe-512",
      account: "@minhsung",
      createdAt: new Date(),
      description: "testXDDDDDD",
      likeTweetCount: 22,
      replyTweetCount: 33,
      isLiked: true,
    },
  ],
  followings: [
    {
      id: 23,
      userId: 44,
      name: "test332412",
      avatar:
        "https://ca.slack-edge.com/T01L0ECKVH9-U0271BY8464-e33af84d2111-512",
      account: "@minhsung",
      createdAt: new Date(),
      description: "testXDDDDDD",
      likeTweetCount: 16,
      replyTweetCount: 57,
      isLiked: true,
    },
    {
      id: 23,
      userId: 44,
      name: "test332412",
      avatar:
        "https://ca.slack-edge.com/T01L0ECKVH9-U029Q08104V-g67abce21890-512",
      account: "@minhsung",
      createdAt: new Date(),
      description: "testXDDDDDD",
      likeTweetCount: 13,
      replyTweetCount: 99,
      isLiked: true,
    },
    {
      id: 23,
      userId: 44,
      name: "test332412",
      avatar:
        "https://ca.slack-edge.com/T01L0ECKVH9-U022PUC3C7P-411ed5d8c3fe-512",
      account: "@minhsung",
      createdAt: new Date(),
      description: "testXDDDDDD",
      likeTweetCount: 22,
      replyTweetCount: 33,
      isLiked: true,
    },
  ],
};

export default {
  name: "FollowingPage",
  components: {
    UserSidebar,
    Trends,
    FollowList,
  },
  data() {
    return {
      followers: [],
      followings: [],
      user: {},
    };
  },
  created() {
    this.fetchFollowList();
    this.fetchProfile();
  },
  methods: {
    async fetchProfile() {
      try {
        console.log("fetchProfile");

        const { data } = { ...dummyData };
        this.user = { ...data.user };
        console.log("this.user===>", this.user);
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "目前無法取得資料，請稍候",
        });
      }
    },
    async fetchFollowList() {
      try {
        this.followers = [...dummyFollowList.followers];
        this.followings = [...dummyFollowList.followings];
      } catch (err) {
        console.log(err);
        Toast.fire({
          icon: "error",
          title: "無法取得資料，請稍後再試",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.page-container {
  min-width: 1440px;
  height: 100%;
}
</style>
