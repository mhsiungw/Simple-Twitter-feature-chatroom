<template>
  <div class="modal edit">
    <div class="modal-content">
      <form
        ref="form"
        @submit.stop.prevent="handleSubmit"
        enctype="multipart/form-data"
      >
        <div class="modal-header">
          <div
            class="icon cross"
            @click.stop.prevent="cancelModalClick()"
          ></div>
          <span class="title">編輯個人資料</span>
          <button class="save" type="submit">儲存</button>
        </div>

        <div class="modal-body">
          <div class="background-photo"></div>
          <div class="photo"></div>
          <div class="for-inputs">
            <input
              class="tweet-content name"
              type="text"
              placeholder=""
              name="name"
            />
            <span class="word-count">{{ user.name ? user.length : 0 }}/50</span>

            <textarea
              class="tweet-content intro"
              type="textarea"
              placeholder=""
              name="introduction"
            ></textarea>
            <span class="word-count"
              >{{ user.description ? user.description.length : 0 }}/160</span
            >
          </div>
          <div class="icon camera-two">
            <input
              class="coverFile"
              ref="coverFile"
              name="cover"
              accept="image/*"
              @change="coverChange"
              type="file"
            />
          </div>
          <div class="icon camera-one">
            <input
              class="avatarFile"
              ref="avatarFile"
              name="avatar"
              accept="image/*"
              @change="avatarChange"
              type="file"
            />
          </div>
          <img class="icon camera-two" src="../assets/imgs/camera.png" alt="" />
          <img
            class="icon inside-one"
            src="../assets/imgs/camera_inside.png"
            alt=""
          />
          <img
            class="icon inside-two"
            src="../assets/imgs/camera_inside.png"
            alt=""
          />
          <img class="icon cross" src="../assets/imgs/cross.png" alt="" />
          <span class="name tag">名稱</span>
          <span class="self-intro tag">自我介紹</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalForEditProfile",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {},
  created() {},
  methods: {
    cancelModalClick() {
      this.$emit("after-click-cross");
    },
    coverChange() {
      console.log("coverChange");
    },
    avatarChange() {
      console.log("avatarChange");
    },
    handleSubmit(e) {
      console.log(e);
    },
    async putUser() {
      try {
        console.log("putUser");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss">
$orange: #ff6600;
$deeporange: #f34a16;
$lightdark: #9197a3;
$bitdark: #657786;
$divider: #e6ecf0;
.modal.edit {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);

  .modal-content {
    position: absolute;
    left: 50%;
    top: 54px;
    width: 600px;
    height: 654px;
    border-radius: 14px;
    border: 1px solid #c4c4c4;
    transform: translate(-50%, 0);
    // outline: blue solid;

    .modal-header {
      height: 54px;
      // outline: red solid;
      padding: 0;
      display: flex;
      align-items: center;
      .icon.cross {
        width: 15px;
        height: 15px;
        margin: 0 0 0 19.5px;
        mask: url(../assets/svgs/icon_cross.svg) no-repeat center;
        mask-size: contain;
        background-color: $bitdark;
        cursor: pointer;
        transition: ease-in 0.2s;
        &:hover {
          background-color: $orange;
        }
      }
      .title {
        // line-height: 54px;
        margin: 13px 324px 14px 45px;
        justify-items: start;
        font-family: Noto Sans TC;
        font-style: normal;
        font-weight: bold;
        font-size: 19px;
        line-height: 28px;
      }

      .save {
        width: 64px;
        height: 30px;
        background: #ff6600;
        border-radius: 100px;
        color: #ffffff;
        border: none;
        margin: 12px 15px 12px 0;
        &:focus {
          outline: none;
        }
      }
    }

    form {
      height: 100%;
    }

    .modal-body {
      height: 100%;
      position: relative;
      // outline: black solid ;
      padding: 0;
      .background-photo {
        width: 598px;
        height: 200px;
      }
      .photo {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background: #c4c4c4;
        position: absolute;
        left: 15px;
        top: 140px;
        border: 4px solid #ffffff;
        box-sizing: border-box;
      }
      .for-inputs {
        display: flex;
        flex-direction: column;
        margin-top: 80px;
        // outline: red solid;
        .tweet-content {
          width: 570px;
          height: 150px;
          margin-left: 75px - 16px;
          margin-right: 15px;
          border: none;
          resize: none;
          outline: none;
          background: #f5f8fa;
          margin: 0 15px;
          border-bottom: 2px solid #657786;
          padding: 22px 15px 0 15px;
        }
        .tweet-content.name {
          font-weight: 500;
          font-size: 19px;
          line-height: 28px;
          color: #1c1c1c;
        }
        .name {
          height: 54px;
        }
        .intro {
          margin-top: 43px;
          font-weight: 500;
          font-size: 19px;
          line-height: 28px;
          color: #1c1c1c;
        }
        .word-count {
          text-align: end;
          margin-right: 15px;
          font-family: Noto Sans TC;
          font-style: normal;
          font-weight: 500;
          font-size: 15px;
          line-height: 22px;
        }
      }
      .tag {
        position: absolute;
        left: 30px;
        font-family: Noto Sans TC;
        font-style: normal;
        font-weight: 500;
        font-size: 15px;
      }
      .name {
        top: 285px;
        font-weight: 500;
        font-size: 15px;
        line-height: 15px;
        color: #657786;
      }
      .self-intro {
        font-weight: 500;
        font-size: 15px;
        line-height: 15px;
        bottom: 231px;
        color: #657786;
      }
      .icon {
        position: absolute;
        height: 20px;
        width: 20px;
      }
      .inside-one,
      .inside-two {
        height: 9.7px;
        width: 9.7px;
      }
      .camera-one {
        top: 190px;
        left: 68px;
        background: url(../assets/imgs/camera.png) no-repeat center;
        background-size: contain;
        cursor: pointer;
        .avatarFile {
          padding-right: 30px;
          padding-bottom: 30px;
          width: 30px;
          height: 30px;
          opacity: 0;
          cursor: pointer;
        }
      }
      .inside-one {
        top: 196px;
        left: 73px;
        cursor: pointer;
      }

      .camera-two {
        top: 90px;
        left: 262px;
        cursor: pointer;
        z-index: 999;
        .coverFile {
          width: 100%;
          height: 100%;
          opacity: 0;
          position: relative;
          z-index: 1;
          cursor: pointer;
        }
      }
      .inside-two {
        top: 96px;
        left: 267px;
        cursor: pointer;
      }

      .cross {
        top: 92px;
        left: 318.5px;
      }
    }
  }
}
</style>
