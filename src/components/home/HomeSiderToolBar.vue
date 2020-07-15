<template>
  <div class="home-sider-tool-bar">
    <button class="icon-btn" @click.stop="showMenu = !showMenu">
      <i class="icon icon-menu"></i>
    </button>
    <button class="icon-btn right" @click="handleUpdate">
      <i class="icon icon-update"></i>
    </button>

    <div class="menu" v-show="showMenu">
      <ul class="menu-list">
        <li class="menu-item" @click="handleExportClick">
          <i class="icon icon-export"></i>
          <span class="menu-item-text">Export</span>
        </li>
        <li class="menu-item" @click="handleImportClick">
          <i class="icon icon-import"></i>
          <span class="menu-item-text">Import</span>
        </li>
        <li class="menu-item" @click="handleRegeditClick">
          <i class="icon icon-regedit"></i>
          <span class="menu-item-text">Regedit</span>
        </li>
        <li class="menu-item" @click="handleAboutClick">
          <i class="icon icon-about"></i>
          <span class="menu-item-text">About</span>
        </li>
      </ul>
    </div>

    <modal
      class="about-modal"
      title="About"
      skin="switch-registry"
      cancelText=""
      :width="360"
      :visible="aboutModalVisible"
      :footer="null"
      @onCancel="aboutModalVisible = false"
    >
      <div class="about-modal-wrapper">
        <div class="about-item">Version: {{ version }}</div>
        <div class="about-item">Author: {{ author }}</div>
        <div class="about-footer">
          <div class="link" @click="handleCheckUpdate">Check update</div>
          <button class="ok-btn" @click="aboutModalVisible = false">OK</button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import { remote, shell } from 'electron';
import registry from '../../utils/registry';
import { version, author } from '../../../package.json';

export default {
  name: 'HomeSiderToolBar',

  data() {
    return {
      showMenu: false,
      version: version,
      author: author,
      aboutModalVisible: false,
    };
  },

  mounted() {
    this.$bus.on('APP_CLICK', () => {
      this.showMenu = false;
    });
  },

  methods: {
    handleUpdate() {
      this.$emit('update');
    },

    handleExportClick() {
      remote.dialog.showOpenDialog({
        properties: ['openDirectory'],
      }).then(result => {
        if (result.canceled) return;
        this.$emit('export', result.filePaths[0]);
      });
    },

    handleImportClick() {
      remote.dialog.showOpenDialog({
        properties: ['openFile'],
      }).then(result => {
        if (result.canceled) return;
        this.$emit('import', result.filePaths[0]);
      });
    },

    handleRegeditClick() {
      registry.open();
    },

    handleAboutClick() {
      this.aboutModalVisible = true;
    },

    handleCheckUpdate() {
      shell.openExternal('https://github.com/Fuxy526/switch-registry/releases');
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
      opacity: .9;
    }

    .icon-update {
      background-image: url('../../assets/images/icon/icon-update.svg');
    }

    .icon-menu {
      background-image: url('../../assets/images/icon/icon-menu.svg');
    }
  }

  .right {
    float: right;
  }

  .menu {
    position: absolute;
    bottom: 35px;
    left: 5px;

    .menu-list {
      list-style-type: none;
      margin: 0;
      padding: 0;
      background-color: #024D56;
      color: rgba(255, 255, 255, .8);
      width: 100px;
      border-radius: 2px;

      .menu-item {
        height: 30px;
        line-height: 30px;
        padding: 0 12px;
        font-size: 12px;
        cursor: pointer;

        .menu-item-text {
          display: inline-block;
          vertical-align: middle;
        }

        .icon {
          display: inline-block;
          vertical-align: middle;
          width: 11px;
          height: 11px;
          background-size: 100% 100%;
          background-position: center;
          background-repeat: no-repeat;
          margin-right: 7px;
          opacity: .6;
        }

        .icon-export {
          background-image: url('../../assets/images/icon/icon-export.svg');
        }

        .icon-import {
          background-image: url('../../assets/images/icon/icon-import.svg');
        }

        .icon-regedit {
          background-image: url('../../assets/images/icon/icon-regedit.svg');
        }

        .icon-about {
          background-image: url('../../assets/images/icon/icon-about.svg');
        }

        &:hover {
          color: rgba(255, 255, 255, 1);
          background-color: rgba(255, 255, 255, .05);
        }
      }
    }
  }

  .about-modal {
    .about-modal-wrapper {
      .about-item {
        font-size: 13px;
        line-height: 22px;
      }

      .about-footer {
        margin-top: 15px;

        .link {
          display: inline-block;
          color: #036672;
          text-decoration: underline;
          font-size: 13px;
          cursor: pointer;
        }

        .ok-btn {
          height: 30px;
          font-size: 13px;
          min-width: 50px;
          background-color: #036672;
          color: #fff;
          outline: none;
          border: 0;
          cursor: pointer;
          border-radius: 2px;
          float: right;

          &:hover {
            opacity: .9;
          }
        }
      }
    }
  }
}
</style>