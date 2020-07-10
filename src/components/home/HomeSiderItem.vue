<template>
  <div :class="['home-sider-item', active ? 'home-sider-item-active' : '']">
    <i class="icon-doc"></i>
    <span class="name">{{ name }}</span>
    <span class="right-part">
      <i class="icon-more" @click.stop="showMenu = !showMenu"></i>
      <common-switch
        :on="open"
        @change="handleSwitchChange"
      />
    </span>

    <div class="menu" v-show="showMenu">
      <ul class="menu-list">
        <li class="menu-item" @click="$emit('rename')">rename</li>
        <li class="menu-item" @click="$emit('delete')">delete</li>
      </ul>
    </div>
  </div>
</template>

<script>
import CommonSwitch from '../common/CommonSwitch.vue';

export default {
  name: 'HomeSiderItem',
  components: {
    CommonSwitch,
  },

  props: {
    name: {
      type: String,
      default: 'Name',
    },
    open: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      showMenu: false,
      switchOptions: {
        color: { checked: 'rgba(255, 255, 255, .2)', unchecked: 'rgba(255, 255, 255, .2)' },
        switchColor: { checked: 'rgba(255, 255, 255, 1)', unchecked: 'rgba(255, 255, 255, .5)' },
      },
    };
  },

  mounted() {
    this.$bus.on('APP_CLICK', () => {
      this.showMenu = false;
    });
  },

  methods: {
    handleSwitchChange(value) {
      this.$emit('openChange', value);
    },
  },
};
</script>

<style lang="scss" scoped>
.home-sider-item {
  padding: 0 15px;
  height: 36px;
  line-height: 36px;
  font-size: 12px;
  color: rgba(255, 255, 255, .8);
  position: relative;

  &:hover {
    color: rgba(255, 255, 255, .95);
  }

  .icon-doc {
    display: inline-block;
    vertical-align: middle;
    width: 14px;
    height: 14px;
    background-image: url('../../assets/images/icon/icon-doc.svg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-right: 8px;
  }

  .name {
    display: inline-block;
    vertical-align: middle;
    width: calc(100% - 65px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .right-part {
    float: right;

    .icon-more {
      width: 15px;
      height: 15px;
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: center center;
      background-image: url('../../assets/images/icon/icon-more.svg');
      opacity: .8;
      vertical-align: middle;
      margin-right: 8px;
      display: none;
      cursor: pointer;

      &:hover {
        opacity: 1;
      }
    }
  }

  .menu {
    position: absolute;
    right: 10px;
    top: 30px;
    z-index: 1;

    .menu-list {
      list-style-type: none;
      margin: 0;
      padding: 0;
      background-color: #024D56;
      color: rgba(255, 255, 255, .8);
      width: 80px;
      border-radius: 2px;

      .menu-item {
        height: 30px;
        line-height: 30px;
        padding: 0 15px;
        font-size: 12px;
        text-align: center;
        cursor: pointer;

        &:hover {
          color: rgba(255, 255, 255, 1);
          background-color: rgba(255, 255, 255, .05);
        }
      }
    }
  }
}

.home-sider-item.home-sider-item-active {
  background-color: rgba(0, 0, 0, .1);

  .right-part {
    .icon-more {
      display: inline-block;
    }
  }
}
</style>