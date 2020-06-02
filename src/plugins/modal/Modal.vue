<template>
  <div class="modal" v-show="show">
    <div class="modal-overlay" @click="handleOverlayClick"></div>
    <div class="modal-box">
      <div class="modal-header">
        <div class="title">{{ title }}</div>
        <button class="close-btn" @click="handleClose">
          <i class="icon-close"></i>
        </button>
      </div>
      <div class="modal-body">
        <div class="content">{{ content }}</div>
        <div class="description">{{ description }}</div>
        <div class="input-wrapper" v-show="prompt">
          <input class="input" ref="input" type="text" v-model="promptValue" :placeholder="placeholder" @keyup.enter="handleConfirm" />
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn cancel-btn" @click="handleCancel">{{ cancelButtonText }}</button>
        <button class="btn confirm-btn" @click="handleConfirm" v-show="confirmButtonText">{{ confirmButtonText }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',

  data() {
    return {
      title: '',
      content: '',
      description: '',
      cancelButtonText: '',
      confirmButtonText: '',
      cancelButtonCallback: () => {},
      confirmButtonCallback: () => {},
      show: false,
      prompt: false,
      promptValue: '',
      placeholder: '',
    };
  },

  watch: {
    show(value) {
      if (!value) {
        this.title = '';
        this.content = '';
        this.description = '';
        this.cancelButtonText = '';
        this.confirmButtonText = '';
        this.cancelButtonCallback = () => {};
        this.confirmButtonCallback = () => {};
        this.prompt = false;
        this.promptValue = '';
      } else {
        if (this.prompt) {
          setTimeout(() => {
            this.$refs.input.focus();
          }, 0);
        }
      }
    },
  },

  methods: {
    handleCancel() {
      const res = this.cancelButtonCallback();
      this.show = !!res;
    },

    handleConfirm() {
      const res = this.confirmButtonCallback(this.promptValue);
      this.show = !!res;
    },

    handleOverlayClick() {
      this.show = false;
    },

    handleClose() {
      this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .4);
  }

  .modal-box {
    position: relative;
    background-color: #F1F5F9;
    width: 360px;
    min-height: 180px;
    border-radius: 4px;
    overflow: hidden;

    .modal-header {
      height: 32px;
      line-height: 32px;
      border-bottom: 1px solid #eee;
      padding: 0 15px;
      background-color: #FFF;
      position: relative;

      .title {
        font-size: 14px;
        font-weight: bold;
        color: #1A202C;
      }

      .close-btn {
        background-color: transparent;
        width: 31px;
        height: 31px;
        line-height: 31px;
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;
        outline: none;
        border: 0;
        text-align: center;
        padding: 0;

        &:hover {
          background-color: rgba(0, 0, 0, .03);
        }

        .icon-close {
          background-image: url('../../assets/images/icon/icon-close.svg');
          background-repeat: no-repeat;
          background-size: 40%;
          background-position: center center;
          width: 31px;
          height: 31px;
          display: inline-block;
        }
      }
    }

    .modal-body {
      text-align: center;
      padding: 20px;

      .content {
        font-size: 14px;
        color: #1A202C;
        line-height: 20px;
      }

      .description {
        font-size: 12px;
        color: #6D7C92;
        margin-top: 6px;
      }

      .input-wrapper {
        margin: 10px 5px 0;

        .input {
          width: 100%;
          height: 30px;
          padding: 0 8px;
          outline: none;
          border: 1px solid #ddd;
          border-radius: 4px;
          color: #64748B;

          &::placeholder {
            color: #64748B;
            opacity: .6;
          }
        }
      }
    }

    .modal-footer {
      text-align: center;
      padding: 10px 0 20px;

      .btn {
        height: 30px;
        min-width: 100px;
        border: 0;
        outline: none;
        border-radius: 4px;
        cursor: pointer;
        margin-right: 10px;
        font-size: 12px;

        &:last-child {
          margin-right: 0;
        }

        &:hover {
          opacity: .95;
        }
      }

      .cancel-btn {
        background-color: #fff;
        border: 1px solid #CFD8E3;
        color: #1a202e;
      }

      .confirm-btn {
        background-color: #047481;
        color: #fff;
      }
    }
  }
}
</style>