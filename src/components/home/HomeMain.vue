<template>
  <div class="home-main">
    <div class="home-main-wrapper">
      <div class="title-bar">
        <div class="title-wrapper">
          <span class="title">{{ name }}</span>
          <span class="status-open" v-if="open">open</span>
          <span class="status-close" v-else>closed</span>
        </div>
        <div class="buttons-wrapper">
          <button class="button button-rename" @click="renameModalVisible = true">Rename</button>
          <button class="button button-delete" @click="handleDeleteClick">Delete</button>
        </div>
      </div>

      <div class="content">
        <div class="form-group">
          <label class="label">REGISTRY PATH</label>
          <input class="input" type="text" :value="registryPath" @change="handleRegistryPathChange" />
        </div>
        <div class="form-group">
          <label class="label">REGISTRY KEY</label>
          <input class="input" type="text" :value="registryKey" @change="handleRegistryKeyChange" />
        </div>
        <div class="form-group">
          <label class="label">DEFAULT VALUE</label>
          <input class="input" type="text" :value="defaultValue" @change="handleDefaultValueChange" />
        </div>
        <div class="form-group">
          <label class="label">TARGET VALUE</label>
          <input class="input" type="text" :value="targetValue" @change="handleTargetValueChange" />
        </div>
      </div>
    </div>

    <modal
      class="rename-modal"
      skin="switch-registry"
      title="Rename"
      okText="Rename"
      :width="360"
      :visible="renameModalVisible"
      @onCancel="renameModalVisible = fasle"
      @onOk="handleRename"
    >
      <div class="rename-input-wrapper">
        <input ref="renameInput" class="rename-input" type="text" placeholder="Please enter title" v-model="newName" />
      </div>
    </modal>
  </div>
</template>

<script>
export default {
  name: 'HomeMain',

  data() {
    return {
      renameModalVisible: false,
      newName: '',
    };
  },

  props: {
    name: {
      type: String,
      default: '',
    },
    open: {
      type: Boolean,
      default: true,
    },
    registryPath: {
      type: String,
      default: '',
    },
    registryKey: {
      type: String,
      default: '',
    },
    defaultValue: {
      type: String,
      default: '',
    },
    targetValue: {
      type: String,
      default: '',
    },
  },

  watch: {
    renameModalVisible(value) {
      if (value) {
        this.newName = this.name;
        this.$nextTick(() => {
          this.$refs.renameInput.focus();
        });
      } else {
        this.newName = '';
      }
    },
  },

  methods: {
    handleRegistryPathChange(e) {
      this.$emit('dataChange', 'registry_path', e.target.value);
    },

    handleRegistryKeyChange(e) {
      this.$emit('dataChange', 'registry_key', e.target.value);
    },

    handleDefaultValueChange(e) {
      this.$emit('dataChange', 'default_value', e.target.value);
    },

    handleTargetValueChange(e) {
      this.$emit('dataChange', 'target_value', e.target.value);
    },

    handleRename() {
      this.$emit('rename', this.newName);
      this.renameModalVisible = false;
    },

    handleDeleteClick() {
      this.$modal.show({
        title: 'Delete',
        content: 'Are you sure to delete this item?',
        description: 'The operation cannot be restored.',
        okText: 'Delete',
        onOk: () => {
          this.$emit('delete');
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home-main {
  background-color: #F1F5F9;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;

  .title-bar {
    background-color: #fff;
    padding: 0 20px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;

    .title-wrapper {
      display: inline-block;
      width: calc(100% - 150px);
      line-height: 24px;
      padding: 14px 0;

      .title {
        font-size: 16px;
        font-weight: bold;
        color: #1A202C;
      }

      .status-open,
      .status-close {
        padding: 0 8px;
        height: 18px;
        line-height: 18px;
        border-radius: 9px;
        display: inline-block;
        vertical-align: middle;
        margin-left: 5px;
        font-size: 12px;
      }

      .status-close {
        background-color: #f1f5f9;
        color: #666;
      }

      .status-open {
        background-color: #def7ec;
        color: #03543f;
      }
    }

    .buttons-wrapper {
      float: right;
      height: 54px;
      line-height: 54px;

      .button {
        height: 26px;
        padding: 0 10px;
        cursor: pointer;
        background-color: #fff;
        border: 1px solid rgba(0, 0, 0, .15);
        border-radius: 4px;
        outline: none;
        color: #999;
        font-size: 12px;
      }

      .button-rename {
        margin-right: 8px;
      }
    }
  }

  .content {
    padding: 20px 30px 20px 25px;

    .form-group {
      margin-bottom: 15px;

      .label {
        display: block;
        font-size: 12px;
        font-weight: bold;
        margin-bottom: 6px;
        color: #64748B;
      }

      .input {
        width: 100%;
        border: 1px solid #e6e6e6;
        height: 30px;
        border-radius: 4px;
        outline: none;
        padding: 0 8px;
        color: #64748B;
        font-size: 12px;
      }
    }
  }

  .rename-modal {
    z-index: 10;

    .rename-input-wrapper {
      .rename-input {
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