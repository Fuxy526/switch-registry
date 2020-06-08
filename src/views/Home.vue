<template>
  <div class="home">
    <div class="home-container">
      <div class="sider">
        <home-sider
          :list="list"
          :activeId="activeId"
          @activeChange="handleActiveChange"
          @openChange="handleOpenChange"
          @add="handleAdd"
        />
      </div>
      <div class="main">
        <home-main
          v-if="activeItem"
          :name="activeItem.name"
          :open="activeItem.open"
          :registryPath="activeItem.registry_path"
          :registryKey="activeItem.registry_key"
          :defaultValue="activeItem.default_value"
          :targetValue="activeItem.target_value"
          @dataChange="handleDataChange"
          @rename="handleRename"
          @delete="handleDelete"
        />
        <home-main-empty v-else />
      </div>
    </div>
  </div>
</template>

<script>
import HomeSider from '../components/home/HomeSider.vue';
import HomeMain from '../components/home/HomeMain.vue';
import HomeMainEmpty from '../components/home/HomeMainEmpty.vue';

export default {
  name: 'Home',
  components: {
    HomeSider,
    HomeMain,
    HomeMainEmpty,
  },

  data() {
    return {
      list: [],
      activeId: null,
    };
  },

  computed: {
    activeItem() {
      return this.list.filter(item => item.id === this.activeId)[0] || null;
    },

    activeIndex() {
      let index = 0;
      this.list.forEach((item, i) => {
        if (item.id === this.activeId) {
          index = i;
        }
      });
      return index;
    },
  },

  mounted() {
    this.list = [
      { id: '1', name: 'demo', open: false, registry_path: '', registry_key: '', default_value: '', target_value: '' },
      // { id: '2', name: 'Skin Center', open: false, registry_path: '', registry_key: '', default_value: '', target_value: '' },
      // { id: '3', name: 'New Doc', open: false, registry_path: '计算机\\HKEY_CURRENT_USER\\Software\\Kingsoft\\Office\\6.0\\plugins\\knewdocs', registry_key: 'knewdocs_url', default_value: '', target_value: 'http://10.226.24.73:10013/' },
      // { id: '4', name: 'Template Store', open: false, registry_path: '', registry_key: '', default_value: '', target_value: '' },
    ];
    this.activeId = this.list[0].id;
  },

  methods: {
    handleActiveChange(id) {
      this.activeId = id;
    },

    handleOpenChange(value) {
      this.list[this.activeIndex].open = value;
    },

    handleDataChange(key, value) {
      this.list[this.activeIndex][key] = value;
    },

    handleAdd(title) {
      this.list.push({
        id: Math.random() + '',
        name: title,
        open: false,
        registry_path: '',
        registry_key: '',
        default_value: '',
        target_value: '',
      });
      this.activeId = this.list[this.list.length - 1].id;
    },

    handleRename(name) {
      this.list[this.activeIndex].name = name;
    },

    handleDelete() {
      const activeIndex = this.activeIndex;
      this.list = this.list.filter(item => item.id !== this.activeId);
      this.activeId = this.list[activeIndex] ? this.list[activeIndex].id : (this.list[activeIndex - 1] ? this.list[activeIndex - 1].id : null);
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
  border-top: 1px solid #eee;

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
