<template>
  <div class="home-sider-tool-bar">
    <button class="icon-btn" @click.stop="showMenu = true">
      <i class="icon icon-setting"></i>
    </button>
    <button class="icon-btn right" @click="handleRefresh">
      <i class="icon icon-refresh"></i>
    </button>

    <div class="menu" v-show="showMenu">
      <ul class="menu-list">
        <li class="menu-item">Export</li>
        <li class="menu-item">Import</li>
        <li class="menu-item">Language</li>
        <li class="menu-item" @click="handleAboutClick">About</li>
      </ul>
    </div>
  </div>
</template>

<script>
import registry from '../../utils/registry';

export default {
  name: 'HomeSiderToolBar',

  data() {
    return {
      showMenu: false,
    };
  },

  mounted() {
    this.$bus.on('APP_CLICK', () => {
      this.showMenu = false;
    });
  },

  methods: {
    handleRefresh() {
      registry.open();
    },

    handleAboutClick() {
      this.$modal.show({
        title: 'About',
        content: `Version: ${require('../../../package.json').version}`,
        description: 'Author: Fuxy526',
        cancelText: '',
      });
    },
  },
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

  .menu {
    position: absolute;
    bottom: 35px;
    left: 3px;

    .menu-list {
      list-style-type: none;
      margin: 0;
      padding: 0;
      background-color: rgba(0, 0, 0, .25);
      color: rgba(255, 255, 255, .8);
      width: 100px;
      border-radius: 2px;

      .menu-item {
        height: 30px;
        line-height: 30px;
        padding: 0 15px;
        font-size: 12px;
        cursor: pointer;

        &:hover {
          color: rgba(255, 255, 255, 1);
          background-color: rgba(255, 255, 255, .05);
        }
      }
    }
  }
}
</style>