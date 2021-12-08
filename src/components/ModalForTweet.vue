<template>
  <div @click.self="handleCancelClick()" class="modal-container">
    <div class="tweet-modal">
      <button @click.stop.prevent="handleCancelClick()" class="cancel-button">
        X
      </button>
      <hr />
      <div class="tweet-part">
        <img
          class="avatar"
          :src="currentUser.image | emptyImage"
          alt="avatar"
        />
        <form class="tweet-form">
          <textarea
            v-model="tweetInput"
            id="tweet-input"
            type="textarea"
            placeholder="有什麼新鮮事？"
          ></textarea>
          <button @click.stop.prevent="handleTweetClick()" class="tweet-button">
            推文
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { emptyImageFilter } from "../utils/mixins.js";
import { Toast } from "../utils/helpers";

export default {
  computed: {
    ...mapState(["currentUser"]),
  },
  props: {
    isModalShow: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      tweetInput: "",
    };
  },
  mixins: [emptyImageFilter],
  methods: {
    //點擊左上角 X
    handleCancelClick() {
      // this.$emit("after-cancel-click");
      this.$emit("after-tweet-modal-click", "tweet-cancel");
    },
    //點擊右下角 推文
    handleTweetClick() {
      if (this.tweetInput === "") {
        return Toast.fire({
          icon: "warning",
          title: "內容不可空白",
        });
      }
      // this.$emit("after-tweet-submit", this.tweetInput);
      this.$emit("after-tweet-modal-click", "tweet-save", this.tweetInput);
      this.tweetInput = "";
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
// modal 背後的灰色背景
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 888;
}
// modal 本身
.tweet-modal {
  position: relative;
  right: 42px;
  width: 600px;
  height: 300px;
  margin-top: 54px;
  background: #fff;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  z-index: 999;
  .cancel-button {
    align-self: flex-start;
    border: none;
    background: transparent;
    color: $orange;
    font-size: 20px;
    padding: 10px;
  }
  hr {
    height: 1px;
    margin: 0;
  }
  .tweet-part {
    margin: 15px;
    display: flex;
    flex: 1;
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
      background: #c4c4c4;
      transition: ease-in 0.2s;
      cursor: pointer;
      &:hover {
        filter: brightness(0.9);
      }
    }
    .tweet-form {
      margin: 5px 0px 0 10px;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      #tweet-input {
        resize: none;
        overflow: auto;
        border: none;
        outline: none;
        font-size: 18px;
        letter-spacing: 2px;
        padding: 5px;
        color: #1c1c1c;
        flex: 1;
      }
      .tweet-button {
        width: 66px;
        height: 40px;
        background: $orange;
        align-self: flex-end;
        border-radius: 20px;
        border: none;
        outline: none;
        color: white;
        cursor: pointer;
        font-family: monospace;
        padding: 10px 15px;
        margin: 0;
      }
    }
  }
}
</style>
