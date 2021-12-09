<template>
  <div @click.self="cancelModalClick" class="modal reply">
    <div class="modal-content">
      <div class="modal-header">
        <img
          class="cross"
          src="../assets/imgs/exit.png"
          alt=""
          @click="cancelModalClick"
        />
      </div>
      <hr />
      <div class="modal-body">
        <div class="content-of-other">
          <div class="other-info">
            <div class="img-container">
              <img
                :src="tweet.User.avatar"
                alt=""
                @click="
                  $router
                    .push(`/user/other/${tweet.User ? tweet.User.id : '/'}`)
                    .catch(() => {})
                "
              />
              <div class="img-bottom-line"></div>
            </div>
            <div class="text-wrap">
              <div class="title-wrap">
                <span
                  class="name"
                  @click="
                    $router
                      .push(`/user/other/${tweet.User ? tweet.User.id : '/'}`)
                      .catch(() => {})
                  "
                  >{{ tweet.User.name }}</span
                >
                <span
                  class="account"
                  @click="
                    $router
                      .push(`/user/other/${tweet.User ? tweet.User.id : '/'}`)
                      .catch(() => {})
                  "
                  >{{ tweet.User.account }}</span
                >
                <span style="margin: 0 2px; color: #657786">．</span>
                <span class="time"> {{ tweet.createdAt | fromNow }}</span>
              </div>

              <p>{{ tweet.description }}</p>
              <div class="to-whom">
                <span>回覆給 </span>
                <span class="receiver">{{ tweet.User.name }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="content-of-mine">
          <img
            class="photo-of-mine"
            :src="currentUser.image"
            alt="photo-of-mine"
          />
          <textarea
            class="tweet-content"
            v-model="replyContent"
            type="textarea"
            placeholder="推你的回覆"
            maxlength="140"
          ></textarea>
          <div
            class="word-count"
            :class="{ 'word-limit': replyContent.length === 140 }"
          >
            {{ replyContent.length }}/140
          </div>

          <button @click.prevent="replyTweet">推文</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from "../utils/mixins.js";
import { mapState } from "vuex";

export default {
  name: "ModalForReplyTweet",
  mixins: [fromNowFilter],
  data() {
    return {
      replyContent: "",
    };
  },
  props: {
    tweet: {
      type: Object,
    },
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    cancelModalClick() {
      this.$emit("after-click-cross");
    },
    replyTweet() {
      this.$emit("replyTweet", this.replyContent);
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
.modal,
.reply {
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);

  .modal-content {
    margin: auto;
    margin-top: 54px;
    width: 600px;
    height: 450px;
    border-radius: 14px;
    border: 1px solid #c4c4c4;
    // outline: blue solid;
    hr {
      height: 1px;
      margin: 0;
    }
    .modal-header {
      height: 54px;
      // outline: red solid;
      img {
        cursor: pointer;
        height: 15px;
        width: 15px;
        padding: 19.5px auto 19.5px 19.5px;
      }
    }
    .modal-body {
      position: relative;
      // outline: black solid ;
      height: 245px;
      .content-of-other {
        .other-info {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          // outline: red solid;

          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin: 0px 10px 41px 0px;
            object-fit: cover;
            background: #c4c4c4;
            transition: ease-in 0.2s;
            cursor: pointer;
            &:hover {
              filter: brightness(0.9);
            }
            // outline: red solid;
          }
          .img-bottom-line {
            position: relative;
            left: -0.2rem;
            top: -0.3rem;
            margin: 0;
            padding: 0;
            transform: rotate(90deg) scale(1.1);
            border-bottom: 2.5px solid lightgrey;
          }
          .text-wrap {
            display: flex;
            flex-direction: column;
            width: 500px;
            .title-wrap {
              display: flex;
              flex-direction: row;
              justify-content: flex-start;
              height: 22px;
              margin-bottom: 6px;
              white-space: nowrap;
              .name {
                font-family: Noto Sans TC;
                font-style: normal;
                font-weight: bold;
                font-size: 15px;
                line-height: 22px;
                margin-right: 5px;
                cursor: pointer;
                // 超出字數顯示刪節號
                width: 100px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                &:hover {
                  text-decoration: underline;
                }
              }
              .account {
                font-family: Noto Sans TC;
                font-style: normal;
                font-weight: 500;
                font-size: 15px;
                line-height: 22px;
                color: $bitdark;
                cursor: pointer;
                &:hover {
                  text-decoration: underline;
                }
              }
              .time {
                color: $bitdark;
                font-family: Noto Sans TC;
                font-style: normal;
                font-weight: 500;
                font-size: 15px;
                line-height: 22px;
              }
            }
            p {
              word-break: break-all;
            }

            .to-whom {
              text-align: start;
              margin-bottom: 23px;
              font-family: Noto Sans TC;
              font-style: normal;
              font-weight: 500;
              font-size: 13px;
              line-height: 13px;
              .receiver {
                color: #ff6600;
              }
            }
          }
        }
      }

      .content-of-mine {
        height: 80%;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #c4c4c4;
          position: absolute;
          left: 15px;
          object-fit: cover;
        }
        .tweet-content {
          height: 100%;
          max-height: 220px;
          width: 510px;
          margin-left: 75px - 16px;
          margin-right: 15px;
          border: none;
          resize: none;
          outline: none;
          ::placeholder {
            font-size: 16px;
            font-weight: 500;
            color: #919191;
          }
        }
        .word-count {
          position: absolute;
          top: 80%;
          right: 10px;
          color: gray;
          font-family: monospace;
          font-size: 12px;
          align-self: flex-end;
          margin: 0;
          margin-right: 14px;
          &.word-limit {
            color: red;
          }
        }
        button {
          position: absolute;
          right: 15px;
          bottom: 15px;
          background: #ff6600;
          border-radius: 100px;
          color: #ffffff;
          width: 64px;
          height: 40px;
          outline: none;
          border: none;
        }
      }
    }
  }
}
</style>
