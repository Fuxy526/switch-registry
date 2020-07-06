<template>
  <div class="home-sider-tool-bar">
    <button class="icon-btn">
      <i class="icon icon-setting"></i>
    </button>
    <button class="icon-btn right">
      <i class="icon icon-refresh"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'HomeSiderToolBar',
};
</script>

<style lang="scss" scoped>
.home-sider-tool-bar {
  position: absolute;
  bottom: 0;
  height: 35px;
  line-height: 35px;
  left: 0;
  right: 0;
  border-top: 1px solid rgba(0, 0, 0, .05);

  .icon-btn {
    background-color: transparent;
    outline: none;
    border: none;
    width: 35px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    padding: 0;
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, .05);
    }

    .icon {
      display: inline-block;
      background-repeat: no-repeat;
      background-size: 100% auto;
      height: 35px;
      width: 20px;
      background-position: center center;
    }

    .icon-refresh {
      width: 17px;
      background-image: url('../../assets/images/icon/icon-refresh.svg');
    }

    .icon-setting {
      background-image: url('../../assets/images/icon/icon-setting.svg');
    }
  }

  .right {
    float: right;
  }


}
</style>