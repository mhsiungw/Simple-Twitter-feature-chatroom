<template>
  <div class="user-section">
    <div class="title">使用者列表</div>
    <div class="user-cards">
      <div v-for="user in userData" :key="user.id" class="card-item">
        <img :src="user.cover" alt="cover" class="cover" />
        <div class="description">
          <div class="description-title">
            <img :src="user.avatar" alt="avatar" class="avatar" />
            <div class="name-account">
              <p class="name">{{ user.name }}</p>
              <p class="account">@{{ user.account }}</p>
            </div>
          </div>
          <div class="detail">
            <div class="chat-like">
              <div class="chat">
                <font-awesome-icon class="icon" :icon="['far', 'comment']" />
                <span>13</span>
              </div>
              <div class="like">
                <font-awesome-icon class="icon" :icon="['far', 'heart']" />
                <span>13</span>
              </div>
            </div>
            <div class="following-followers">
              <p class="following">34 個跟隨中</p>
              <p class="followers">34 個跟隨者</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["currentUser"]),
  },
  props: {
    userData: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.user-section {
  border: 1px solid #e6ecf0;
  .title {
    padding: 14px 0 14px 20px;
    border-bottom: 1px solid #e6ecf0;
    font-size: 18px;
    font-weight: 700;
    font-family: monospace;
  }
  .user-cards {
    // border: 1px solid red;
    margin-top: 30px;
    margin-left: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(245px, 245px));
    grid-auto-rows: 314px;
    grid-gap: 15px;
    .card-item {
      display: flex;
      flex-direction: column;
      .cover {
        width: 245px;
        height: 140px;
        object-fit: cover;
        // border: 1px solid red;
        border-radius: 10px 10px 0 0;
      }
      .description {
        // border: 1px solid gray;
        background: #f6f7f8;
        border-radius: 0 0 10px 10px;
        flex: 1;
        display: flex;
        flex-direction: column;
        position: relative;
        justify-content: flex-end;
        .description-title {
          // border: 1px solid black;
          display: flex;
          flex-direction: column;
          // 調整 title 位置
          position: absolute;
          bottom: 60%;
          left: 50%;
          transform: translateX(-50%);
          .avatar {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            object-fit: cover;
            outline: 4px solid #fff;
          }
          .name-account {
            flex: 1;
            font-size: 15px;
            .name,
            .account {
              text-align: center;
              // border: 1px solid black;
              margin: 0;
            }
            .name {
              font-weight: 900;
              font-family: monospace;
            }
            .account {
              color: #657786;
            }
          }
        }
        .detail {
          // border: 1px solid black;
          align-self: center;
          text-align: center;
          margin-top: 15px;
          font-size: 15px;
          .chat-like {
            display: flex;
            .chat,
            .like {
              //取代設定 margin
              display: flex;
              align-items: center;
              justify-content: space-evenly;
              //父空間填滿
              flex: 1;
            }
          }
          .following-followers {
            display: flex;
            margin-top: 20px;
            margin-bottom: 5px;
            .following {
              text-align: center;
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
}
</style>