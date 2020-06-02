<template>
  <div class="home">
    <div class="home-container">
      <div class="sider">
        <home-sider
          :list="list"
          @activeChange="handleActiveChange"
        />
      </div>
      <div class="main">
        <home-main
          v-if="activeItem"
          :name="activeItem.name"
          :active="activeItem.open"
          :registryPath="activeItem.registry_path"
          :registryKey="activeItem.registry_key"
          :defaultValue="activeItem.default_value"
          :targetValue="activeItem.target_value"
        />
        <div class="home-main-empty" v-else></div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeSider from '../components/home/HomeSider.vue';
import HomeMain from '../components/home/HomeMain.vue';

export default {
  name: 'Home',
  components: {
    HomeSider,
    HomeMain,
  },

  data() {
    return {
      list: [],
      activeItem: null,
    };
  },

  mounted() {
    this.list = [
      { name: 'App Center', open: true, registry_path: '', registry_key: '', default_value: '', target_value: '' },
      { name: 'Skin Center', open: false, registry_path: '', registry_key: '', default_value: '', target_value: '' },
      { name: 'New Doc', open: false, registry_path: '计算机\\HKEY_CURRENT_USER\\Software\\Kingsoft\\Office\\6.0\\plugins\\knewdocs', registry_key: 'knewdocs_url', default_value: '', target_value: 'http://10.226.24.73:10013/' },
      { name: 'Template Store', open: false, registry_path: '', registry_key: '', default_value: '', target_value: '' },
    ];
    this.activeItem = this.list[0];
  },

  methods: {
    handleActiveChange(item) {
      this.activeItem = item;
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;

  .home-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
    display: flex;

    .sider {
      width: 240px;
      position: relative;
    }

    .main {
      flex: 1;
      position: relative;
    }
  }
}
</style>
