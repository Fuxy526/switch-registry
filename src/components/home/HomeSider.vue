<template>
  <div class="home-sider">
    <div class="search-section">
      <div class="search-input-wrapper">
        <i class="search-icon"></i>
        <input class="search-input" v-model="searchText" />
      </div>
    </div>
    <ul class="home-sider-list">
      <li class="home-sider-list-item" v-for="(item, index) in filterdList" :key="`sider_item_${index + 1}`">
        <home-sider-item
          :active="index === 0"
          :name="item.name"
          :open="item.open"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import HomeSiderItem from './HomeSiderItem.vue';

export default {
  name: 'HomeSider',
  components: {
    HomeSiderItem,
  },

  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      searchText: '',
    };
  },

  computed: {
    filterdList() {
      return this.list.filter(item => item.name.toLowerCase().includes(this.searchText.toLowerCase()));
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
  overflow: auto;
  background-color: #036672;
  color: #fff;

  .search-section {
    padding: 12px 10px;

    .search-input-wrapper {
      background-color: rgba(0, 0, 0, .1);
      border-radius: 4px;
      position: relative;

      .search-icon {
        position: absolute;
        left: 10px;
        top: 7px;
        width: 16px;
        height: 16px;
        background-image: url('../../assets/images/icon/icon-search.svg');
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }

      .search-input {
        background-color: transparent;
        width: 100%;
        border: 0;
        height: 30px;
        outline: none;
        color: rgba(255, 255, 255, .8);
        padding: 0 8px 0 35px;
        font-size: 12px;
      }
    }
  }

  .home-sider-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
}
</style>