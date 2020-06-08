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
import regedit from '../utils/regedit';
import storage from '../utils/storage';
import { v4 as uuidv4 } from 'uuid';

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
    const stored = storage.get('SWITCH_REGISTRY_LIST');
    if (stored) {
      this.list = stored;
    } else {
      this.list = [
        { id: uuidv4(), name: 'demo', open: false, registry_path: '', registry_key: '', default_value: '', target_value: '' },
      ];
    }
    this.activeId = this.list[0].id;
  },

  methods: {
    handleActiveChange(id) {
      this.activeId = id;
    },

    async handleOpenChange(open) {
      try {
        const { registry_path, registry_key, default_value, target_value } = this.activeItem;
        const value = open ? target_value : default_value;
        this.list[this.activeIndex].open = open;
        await regedit.set(registry_path, registry_key, value);
        this.updateStorage();
      } catch (err) {
        console.log('error: ', err);
        this.list[this.activeIndex].open = !open;
      }
    },

    handleDataChange(key, value) {
      this.list[this.activeIndex][key] = value;
      this.updateStorage();
    },

    handleAdd(title) {
      this.list.push({
        id: uuidv4(),
        name: title,
        open: false,
        registry_path: '',
        registry_key: '',
        default_value: '',
        target_value: '',
      });
      this.activeId = this.list[this.list.length - 1].id;
      this.updateStorage();
    },

    handleRename(name) {
      this.list[this.activeIndex].name = name;
      this.updateStorage();
    },

    handleDelete() {
      const activeIndex = this.activeIndex;
      this.list = this.list.filter(item => item.id !== this.activeId);
      this.activeId = this.list[activeIndex] ? this.list[activeIndex].id : (this.list[activeIndex - 1] ? this.list[activeIndex - 1].id : null);
      this.updateStorage();
    },

    updateStorage() {
      storage.set('SWITCH_REGISTRY_LIST', this.list);
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
