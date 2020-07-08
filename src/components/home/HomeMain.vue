<template>
  <div class="home-main">
    <div class="home-main-wrapper">
      <div class="title-bar">
        <div class="title-wrapper">
          <span class="title">{{ name }}</span>
          <span class="status-open" v-if="open">open</span>
          <span class="status-close" v-else>closed</span>
        </div>
        <!-- <div class="buttons-wrapper">
          <button class="button button-rename" @click="renameModalVisible = true">Rename</button>
          <button class="button button-delete" @click="handleDeleteClick">Delete</button>
        </div> -->
      </div>

      <div class="content">
        <div class="form-group">
          <label class="label">KEY NAME</label>
          <input class="input" type="text" placeholder="Please enter key name" :value="keyName" @change="handleKeyNameChange" />
        </div>
        <div class="form-group">
          <label class="label">VALUE NAME</label>
          <input class="input" type="text" placeholder="Please enter value name" :value="valueName" @change="handleValueNameChange" />
        </div>
        <div class="form-group">
          <label class="label">DEFAULT DATA</label>
          <select class="select" :value="defaultType" @change="handleDefaultTypeChange">
            <option class="option" v-for="item in types" :key="item" :name="item">{{ item }}</option>
          </select>
          <input class="input" type="text" placeholder="Please enter default data" :value="defaultData" @change="handleDefaultDataChange" />
        </div>
        <div class="form-group">
          <label class="label">TARGET DATA</label>
          <select class="select" :value="targetType" @change="handleTargetTypeChange">
            <option class="option" v-for="item in types" :key="item" :name="item">{{ item }}</option>
          </select>
          <input class="input" type="text" placeholder="Please enter target data" :value="targetData" @change="handleTargetDataChange" />
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
      @onCancel="renameModalVisible = false"
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
      types: ['REG_SZ', 'REG_MULTI_SZ', 'REG_DWORD_BIG_ENDIAN', 'REG_DWORD', 'REG_BINARY', 'REG_DWORD_LITTLE_ENDIAN', 'REG_LINK', 'REG_FULL_RESOURCE_DESCRIPTOR', 'REG_EXPAND_SZ'],
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
    keyName: {
      type: String,
      default: '',
    },
    valueName: {
      type: String,
      default: '',
    },
    defaultType: {
      type: String,
      default: '',
    },
    defaultData: {
      type: String,
      default: '',
    },
    targetType: {
      type: String,
      default: '',
    },
    targetData: {
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
    handleKeyNameChange(e) {
      this.$emit('dataChange', 'key_name', e.target.value);
    },

    handleValueNameChange(e) {
      this.$emit('dataChange', 'value_name', e.target.value);
    },

    handleDefaultTypeChange(e) {
      this.$emit('dataChange', 'default_type', e.target.value);
    },

    handleDefaultDataChange(e) {
      this.$emit('dataChange', 'default_data', e.target.value);
    },

    handleTargetTypeChange(e) {
      this.$emit('dataChange', 'target_type', e.target.value);
    },

    handleTargetDataChange(e) {
      this.$emit('dataChange', 'target_data', e.target.value);
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
  border: 1px solid #D9D9D9;
  border-left: 0;

  .title-bar {
    background-color: #fff;
    padding: 12px 20px 0;
    border-bottom: 1px solid #eee;

    .title-wrapper {
      display: inline-block;
      width: calc(100% - 170px);
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

        &:hover {
          border: 1px solid rgba(0, 0, 0, .2);
        }

        &:before {
          content: '';
          display: inline-block;
          vertical-align: -1px;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          margin-right: 4px;
          width: 12px;
          height: 12px;
        }
      }

      .button-rename {
        margin-right: 8px;

        &:before {
          background-image: url('../../assets/images/icon/icon-rename.svg');
        }
      }

      .button-delete {
        &:before {
          background-image: url('../../assets/images/icon/icon-delete.svg');
        }
      }
    }
  }

  .content {
    padding: 20px 30px 20px 25px;

    .form-group {
      margin-bottom: 25px;

      .label {
        display: block;
        font-size: 11px;
        margin-bottom: 6px;
        color: #64748B;
      }

      .select {
        width: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
        border: 0;
        border-bottom: 1px solid #e2e2e2;
        height: 30px;
        outline: none;
        color: #64748B;
        font-weight: bold;
        font-size: 12px;
        background-color: transparent;
        transition: all .2s ease-in-out;
        cursor: pointer;

        &:focus {
          border-bottom: 1px solid #036672;
          transition: all .2s ease-in-out;
        }
      }

      .select+.input {
        width: calc(100% - 90px);
        margin-left: 10px;
      }

      .input {
        width: 100%;
        border: 0;
        border-bottom: 1px solid #e2e2e2;
        height: 30px;
        outline: none;
        color: #64748B;
        font-weight: bold;
        font-size: 12px;
        background-color: transparent;
        transition: all .2s ease-in-out;

        &:focus {
          border-bottom: 1px solid #036672;
          transition: all .2s ease-in-out;
        }

        &::placeholder {
          color: #64748B;
          opacity: .25;
          font-weight: normal;
        }
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