<template>
  <div class="home-sider-tool-bar">
    <button class="icon-btn">
      <i class="icon icon-setting"></i>
    </button>
    <button class="icon-btn right" @click="handleAddClick">
      <i class="icon icon-add"></i>
    </button>

    <modal
      class="add-modal"
      skin="switch-registry"
      title="Add New"
      :width="360"
      :visible="addModalVisible"
      @onCancel="addModalVisible = false"
      @onOk="handleAdd"
    >
      <div class="add-input-wrapper">
        <input ref="addInput" class="add-input" type="text" placeholder="Please enter title" v-model="addTitle" />
      </div>
    </modal>
  </div>
</template>

<script>
export default {
  name: 'HomeSiderToolBar',

  data() {
    return {
      addModalVisible: false,
      addTitle: '',
    };
  },

  watch: {
    addModalVisible(value) {
      if (!value) {
        this.addTitle = '';
      } else {
        this.$nextTick(() => {
          this.$refs.addInput.focus();
        });
      }
    },
  },

  methods: {
    handleAddClick() {
      this.addModalVisible = true;
    },

    handleAdd() {
      this.$emit('add', this.addTitle);
      this.addModalVisible = false;
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

    .icon-add {
      width: 23px;
      background-image: url('../../assets/images/icon/icon-add.svg');
    }

    .icon-setting {
      background-image: url('../../assets/images/icon/icon-setting.svg');
    }
  }

  .right {
    float: right;
  }

  .add-modal {
    z-index: 10;

    .add-input-wrapper {
      .add-input {
        height: 32px;
        width: 100%;
        border: 1px solid rgba(0, 0, 0, .2);
        padding: 0 8px;
        border-radius: 2px;
        outline: none;
        color: #333;

        &::placeholder {
          color: #999;
        }
      }
    }
  }
}
</style>