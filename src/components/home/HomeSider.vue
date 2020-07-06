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
      <ul class="home-sider-list">
        <li class="home-sider-list-item" v-for="(item, index) in filterdList" :key="`sider_item_${index + 1}`">
          <home-sider-item
            :active="item.id === activeId"
            :name="item.name"
            :open="item.open"
            @click.native="handleItemClick(item)"
            @openChange="v => handleItemOpenChange(item, v)"
          />
        </li>
      </ul>
    </div>
    <home-sider-tool-bar />

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
import HomeSiderItem from './HomeSiderItem.vue';
import HomeSiderToolBar from './HomeSiderToolBar.vue';

export default {
  name: 'HomeSider',
  components: {
    HomeSiderItem,
    HomeSiderToolBar,
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
      addTitle: '',
    };
  },

  computed: {
    filterdList() {
      return this.list.filter(item => item.name.toLowerCase().includes(this.searchText.toLowerCase()));
    },
  },

  watch: {
    addModalVisible(value) {
      console.log('addModalVisible: ', value);
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
    handleItemClick(item) {
      this.$emit('activeChange', item.id);
    },

    handleItemOpenChange(item, value) {
      this.$emit('openChange', item.id, value);
    },

    handleAddClick() {
      console.log('click');
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
.home-sider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;;
  background-color: #036672;

  .search-section {
    padding: 26px 10px 0;
    height: 68px;

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
        background-color: rgba(0, 0, 0, .15);
      }
    }
  }

  .home-sider-list-wrapper {
    position: absolute;
    top: 68px;
    bottom: 30px;
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