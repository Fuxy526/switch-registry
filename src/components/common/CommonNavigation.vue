<template>
  <div class="common-navigation" @contextmenu.prevent>
    <div class="native-buttons">
      <button class="button button-minimized">
        <i class="icon icon-minimized"></i>
      </button>
      <button class="button button-maximized">
        <i class="icon icon-maximized"></i>
      </button>
      <button class="button button-close">
        <i class="icon icon-close"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonNavigation',
};
</script>

<style lang="scss" scoped>
.common-navigation {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  text-align: right;
  z-index: 1;
  -webkit-app-region: drag;

  .native-buttons {
    display: inline-block;
    -webkit-app-region: no-drag;

    .button {
      display: inline-block;
      width: 36px;
      height: 26px;
      cursor: pointer;
      border-radius: 0;
      background-color: transparent;
      outline: none;
      border: 0;

      &:hover {
        background-color: rgba(0, 0, 0, .1);

        .icon-minimized,
        .icon-maximized {
          filter: brightness(0);
          opacity: .7;
        }

        .icon-close {
          opacity: 1;
          filter: brightness(100);
        }
      }

      .icon {
        display: inline-block;
        width: 100%;
        height: 100%;
        background-size: 10px 10px;
        background-position: center center;
        background-repeat: no-repeat;
      }

      .icon-minimized {
        background-image: url('../../assets/images/icon/icon-minimized.svg');
      }

      .icon-maximized {
        background-image: url('../../assets/images/icon/icon-maximized.svg');
      }

      .icon-close {
        background-image: url('../../assets/images/icon/icon-close.svg');
      }
    }

    .button-close {
      &:hover {
        background-color: #FA5151;
      }
    }
  }

}
</style>