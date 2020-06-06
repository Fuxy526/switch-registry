<template>
  <div :class="['home-sider-item', active ? 'home-sider-item-active' : '']">
    <i class="icon-doc"></i>
    <span class="name">{{ name }}</span>
    <span class="right-part">
      <toggle-button
        :value="open"
        :height="14"
        :width="28"
        :color="switchOptions.color"
        :switchColor="switchOptions.switchColor"
        @change="handleSwitchChange"
      />
    </span>
  </div>
</template>

<script>
export default {
  name: 'HomeSiderItem',

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
      switchOptions: {
        color: { checked: 'rgba(255, 255, 255, .2)', unchecked: 'rgba(255, 255, 255, .2)' },
        switchColor: { checked: 'rgba(255, 255, 255, 1)', unchecked: 'rgba(255, 255, 255, .5)' },
      },
    };
  },

  methods: {
    handleSwitchChange(data) {
      this.$emit('openChange', data.value);
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
    width: calc(100% - 60px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .right-part {
    float: right;
  }
}

.home-sider-item.home-sider-item-active {
  background-color: rgba(0, 0, 0, .1);
}
</style>