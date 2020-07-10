<template>
  <div class="home-sider">
    <div class="search-section">
      <div class="search-input-wrapper">
        <i class="search-icon"></i>
        <input class="search-input" v-model="searchText" />
      </div>
      <button class="add-button" @click="handleAddClick">
        <i class="icon icon-add"></i>
      </button>
    </div>
    <div class="home-sider-list-wrapper">
      <slick-list
        class="home-sider-list"
        lockAxis="y"
        :value="filterdList"
        :pressDelay="200"
        @input="handleSortInput"
      >
        <slick-item
          class="home-sider-list-item"
          v-for="(item, index) in filterdList"
          :key="`sider_item_${index + 1}`"
          :index="index"
          :disabled="!!searchText"
        >
          <home-sider-item
            :active="item.id === activeId"
            :name="item.name"
            :open="item.open"
            @click.native="handleItemClick(item)"
            @openChange="v => handleItemOpenChange(item, v)"
            @rename="renameModalVisible = true"
            @delete="handleDelete(item)"
          />
        </slick-item>
      </slick-list>
    </div>
    <home-sider-tool-bar
      @import="handleImport"
      @export="handleExport"
      @update="$emit('update')"
    />

    <modal
      class="add-modal"
      skin="switch-registry"
      title="Create New"
      :width="540"
      :visible="addModalVisible"
      :overlayClosable="false"
      okText="Create"
      @onCancel="addModalVisible = false"
      @onOk="handleAdd"
    >
      <div class="add-modal-wrapper">
        <div class="add-input-wrapper">
          <label class="label">NAME</label>
          <input ref="addNameInput" class="add-input" type="text" placeholder="Please enter name" v-model="addName" />
        </div>
        <div class="add-input-wrapper">
          <label class="label">KEY NAME</label>
          <input ref="addKeyNameInput" class="add-input" type="text" placeholder="Please enter key name" v-model="addKeyName" />
        </div>
        <div class="add-input-wrapper">
          <label class="label">VALUE NAME</label>
          <input ref="addValueNameInput" class="add-input" type="text" placeholder="Please enter value name" v-model="addValueName" />
        </div>
        <div class="add-input-wrapper">
          <label class="label">DEFAULT DATA</label>
          <select class="select" v-model="addDefaultType">
            <option class="option" v-for="item in types" :key="item" :name="item">{{ item }}</option>
          </select>
          <input class="add-input suffix-input" type="text" placeholder="Please enter default data" v-model="addDefaultData" v-show="addDefaultType !== 'NONE'" />
          <button class="autorenew-button" @click="handleAutoRenew" v-show="addDefaultType !== 'NONE'">
            <i class="icon-autorenew"></i>
          </button>
        </div>
        <div class="add-input-wrapper">
          <label class="label">TARGET DATA</label>
          <select class="select" v-model="addTargetType">
            <option class="option" v-for="item in types" :key="item" :name="item">{{ item }}</option>
          </select>
          <input class="add-input" type="text" placeholder="Please enter target data" v-model="addTargetData" v-show="addTargetType !== 'NONE'" />
        </div>
      </div>
    </modal>

    <modal
      class="rename-modal"
      skin="switch-registry"
      title="Rename"
      okText="Rename"
      :width="360"
      :overlayClosable="false"
      :visible="renameModalVisible"
      @onCancel="renameModalVisible = false"
      @onOk="handleRename"
    >
      <div class="rename-input-wrapper">
        <input ref="renameInput" class="rename-input" type="text" placeholder="Please enter name" v-model="renameName" @keyup.enter="handleRename" />
      </div>
    </modal>
  </div>
</template>

<script>
import { SlickList, SlickItem } from 'vue-slicksort';
import HomeSiderItem from './HomeSiderItem.vue';
import HomeSiderToolBar from './HomeSiderToolBar.vue';
import registry from '../../utils/registry';

export default {
  name: 'HomeSider',
  components: {
    HomeSiderItem,
    HomeSiderToolBar,
    SlickList,
    SlickItem,
  },

  props: {
    list: {
      type: Array,
      default: () => [],
    },
    activeId: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      searchText: '',
      addModalVisible: false,
      addName: '',
      addKeyName: '',
      addValueName: '',
      renameModalVisible: false,
      renameName: '',
      addDefaultType: 'REG_SZ',
      addDefaultData: '',
      addTargetType: 'REG_SZ',
      addTargetData: '',
      types: ['NONE', 'REG_SZ', 'REG_MULTI_SZ', 'REG_DWORD_BIG_ENDIAN', 'REG_DWORD', 'REG_BINARY', 'REG_DWORD_LITTLE_ENDIAN', 'REG_LINK', 'REG_FULL_RESOURCE_DESCRIPTOR', 'REG_EXPAND_SZ'],
    };
  },

  computed: {
    filterdList() {
      return this.list.filter(item => item.name.toLowerCase().includes(this.searchText.toLowerCase()));
    },
  },

  watch: {
    addModalVisible(value) {
      if (!value) {
        this.clearAddData();
      } else {
        this.$nextTick(() => {
          this.$refs.addNameInput.focus();
        });
      }
    },

    renameModalVisible(value) {
      if (value) {
        this.renameName = this.list.filter(item => item.id === this.activeId)[0].name;
        this.$nextTick(() => {
          this.$refs.renameInput.focus();
        });
      } else {
        this.renameName = '';
      }
    },
  },

  methods: {
    handleItemClick(item) {
      this.$emit('activeChange', item.id);
    },

    handleItemOpenChange(item, value) {
      this.$emit('openChange', item.id, value);
    },

    handleAddClick() {
      this.addModalVisible = true;
    },

    handleAdd() {
      if (!this.addName.trim()) {
        this.$message('Please fill in NAME.');
        this.$refs.addNameInput.focus();
        return;
      }
      if (!this.addKeyName.trim()) {
        this.$message('Please fill in KEY NAME.');
        this.$refs.addKeyNameInput.focus();
        return;
      }
      if (!this.addValueName.trim()) {
        this.$message('Please fill in VALUE NAME.');
        this.$refs.addValueNameInput.focus();
        return;
      }
      this.$emit('add', {
        name: this.addName,
        key_name: this.addKeyName,
        value_name: this.addValueName,
        default_type: this.addDefaultType,
        default_data: this.addDefaultData,
        target_type: this.addTargetType,
        target_data: this.addTargetData,
      });
      this.addModalVisible = false;
    },

    clearAddData() {
      this.addName = '';
      this.addKeyName = '';
      this.addValueName = '';
      this.addDefaultType = 'REG_SZ';
      this.addDefaultData = '';
      this.addTargetType = 'REG_SZ';
      this.addTargetData = '';
    },

    handleAutoRenew() {
      if (this.addKeyName && this.addValueName) {
        registry.get(this.addKeyName, this.addValueName).then(res => {
          this.addDefaultType = res[2];
          this.addDefaultData = res[3];
        });
      }
    },

    handleImport(path) {
      this.$emit('import', path);
    },

    handleExport(path) {
      this.$emit('export', path);
    },

    handleRename() {
      this.$emit('rename', this.renameName);
      this.renameModalVisible = false;
    },

    handleDelete(item) {
      this.$modal.show({
        title: 'Delete',
        content: `Are you sure to delete ${item.name}?`,
        description: 'The operation can not be restored.',
        okText: 'Delete',
        onOk: () => {
          this.$emit('delete');
        },
      });
    },

    handleSortInput(data) {
      this.$emit('sort', data);
    },
  },
};
</script>

<style lang="scss" scoped>
.home-sider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background-color: #036672;
  padding: 26px 0 0;

  .search-section {
    padding: 0 10px;
    height: 65px;

    .search-input-wrapper {
      position: relative;
      width: calc(100% - 33px);
      display: inline-block;

      .search-icon {
        position: absolute;
        left: 10px;
        top: 7px;
        width: 12px;
        height: 12px;
        background-image: url('../../assets/images/icon/icon-search.svg');
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }

      .search-input {
        background-color: transparent;
        width: 100%;
        border: 0;
        height: 25px;
        outline: none;
        color: rgba(255, 255, 255, .8);
        padding: 0 8px 0 30px;
        font-size: 12px;
        border-radius: 4px;
        background-color: rgba(0, 0, 0, .1);

        &:focus {
          background-color: rgba(0, 0, 0, .15);
        }
      }
    }

    .add-button {
      width: 25px;
      height: 25px;
      display: inline-block;
      border: 0;
      outline: none;
      vertical-align: middle;
      box-sizing: border-box;
      background-color: rgba(0, 0, 0, .1);
      margin-left: 8px;
      border-radius: 4px;
      cursor: pointer;

      .icon {
        display: inline-block;
        background-repeat: no-repeat;
        background-size: 15px;
        height: 100%;
        width: 100%;
        background-position: center center;
      }

      .icon-add {
        background-image: url('../../assets/images/icon/icon-add.svg');
        opacity: .8;
      }

      &:hover {
        background-color: rgba(0, 0, 0, .2);
      }
    }
  }

  .home-sider-list-wrapper {
    position: absolute;
    top: 65px;
    bottom: 35px;
    left: 0;
    right: 0;
    overflow: auto;

    .home-sider-list {
      list-style-type: none;
      margin: 0;
      padding: 0;
    }
  }

  .add-modal {
    z-index: 10;

    .add-modal-wrapper {
      .add-input-wrapper {
        margin-bottom: 10px;
        position: relative;

        .label {
          display: inline-block;
          width: 80px;
          text-align: right;
          font-size: 11px;
          margin-right: 8px;
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

        .select+.add-input {
          width: calc(100% - 178px);
          margin-left: 10px;
        }

        .add-input {
          height: 30px;
          line-height: 30px;
          width: calc(100% - 88px);
          border: 0;
          border-bottom: 1px solid #e6e6e6;
          padding: 0 5px;
          outline: none;
          color: #333;
          color: #64748B;
          font-weight: bold;
          font-size: 12px;
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

        .suffix-input {
          padding: 0 30px 0 5px;
        }

        .autorenew-button {
          outline: none;
          border: 0;
          cursor: pointer;
          background-color: transparent;
          position: absolute;
          right: 0;
          top: 0;
          width: 30px;
          height: 30px;

          &:hover {
            .icon-autorenew {
              filter: brightness(0);
              opacity: .6;
            }
          }

          .icon-autorenew {
            display: inline-block;
            width: 100%;
            height: 100%;
            background-image: url('../../assets/images/icon/icon-autorenew.svg');
            background-repeat: no-repeat;
            background-size: 16px 16px;
            background-position: center center;
          }
        }
      }
    }
  }

  .rename-modal {
    z-index: 10;

    .rename-input-wrapper {
      .rename-input {
        height: 30px;
        line-height: 30px;
        width: 100%;
        border: 0;
        border-bottom: 1px solid #e6e6e6;
        padding: 0 5px;
        outline: none;
        color: #333;
        color: #64748B;
        font-weight: bold;
        font-size: 12px;
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
}
</style>