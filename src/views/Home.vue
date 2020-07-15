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
          @import="handleImport"
          @export="handleExport"
          @rename="handleRename"
          @delete="handleDelete"
          @update="handleUpdate"
          @sort="handleSort"
        />
      </div>
      <div class="main">
        <home-main
          v-if="activeItem"
          :name="activeItem.name"
          :open="activeItem.open"
          :keyName="activeItem.key_name"
          :valueName="activeItem.value_name"
          :defaultType="activeItem.default_type"
          :defaultData="activeItem.default_data"
          :targetType="activeItem.target_type"
          :targetData="activeItem.target_data"
          @dataChange="handleDataChange"
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
import registry from '../utils/registry';
import storage from '../utils/storage';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { exec } from 'child_process';

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
      return this.getItemFromId(this.activeId);
    },

    activeIndex() {
      let index = 0;
      this.list.forEach((item, i) => {
        item.id === this.activeId && (index = i);
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
        {
          id: uuidv4(),
          name: 'Demo',
          open: false,
          key_name: 'HKEY_CURRENT_USER\\Software\\Microsoft\\Internet Explorer\\Main',
          value_name: 'Start Page',
          default_type: 'REG_SZ',
          default_data: 'https://microsoft.com',
          target_type: 'REG_SZ',
          target_data: 'https://google.com',
        },
      ];
    }
    this.activeId = this.list[0].id;
  },

  methods: {
    getItemFromId(id) {
      let index = 0;
      this.list.forEach((item, i) => {
        item.id === id && (index = i);
      });
      return this.list[index];
    },

    handleActiveChange(id) {
      this.activeId = id;
    },

    handleOpenChange(id, open) {
      const item = this.getItemFromId(id);
      const { key_name, value_name, default_type, default_data, target_type, target_data } = item;
      const type = open ? target_type : default_type;
      const data = open ? target_data : default_data;
      item.open = open;

      if (type === 'NONE') {
        registry.delete(key_name, value_name).then(() => {
          this.updateStorage();
        }).catch(() => {
          item.open = false;
          this.$message('Error, please check the config.');
        });
        return;
      }

      registry.add(key_name, value_name, type, data).then(() => {
        this.updateStorage();
      }).catch(() => {
        item.open = false;
        this.$message('Error, please check the config.');
      });
    },

    handleDataChange(key, value) {
      this.activeItem[key] = value;
      this.updateStorage();
    },

    handleAdd({ name, key_name, value_name, default_type, default_data, target_type, target_data }) {
      this.list.push({
        id: uuidv4(),
        name,
        open: false,
        key_name,
        value_name,
        default_type,
        default_data,
        target_type,
        target_data,
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

    handleImport(path) {
      fs.readFile(path, 'utf8', (err, dataStr) => {
        if (err) throw err;
        if (dataStr) {
          const data = JSON.parse(dataStr);
          if (data.data) {
            this.list = data.data;
            this.updateStorage();
            this.handleUpdate(false);
            this.$modal.show({
              title: 'Import',
              content: 'Import successfully.',
              cancelText: '',
            });
          }
        }
      });
    },

    handleExport(path) {
      const content = JSON.stringify({
        version: require('../../package.json').version,
        data: this.list,
      });
      const fullPath = `${path}\\switch_registry_data_${Date.now()}.json`;
      fs.writeFile(fullPath, content, 'utf8', err => {
        if (err) throw err;
        this.$modal.show({
          title: 'Export',
          content: 'Export successfully.',
          cancelText: 'Finish',
          okText: 'Show in folder',
          onOk: () => {
            exec(`explorer /select,"${fullPath}"`);
          },
        });
      });
    },

    async handleUpdate(showMessage = true) {
      for (let i = 0, l = this.list.length; i < l; i++) {
        const item = this.list[i];
        try {
          const res = await registry.get(item.key_name, item.value_name);
          if (res[2] === item.target_type && res[3] === item.target_data) {
            item.open = true;
          } else {
            item.open = false;
          }
        } catch (err) {
          item.open = false;
        }
      }
      this.updateStorage();
      if (showMessage) {
        this.$message('Updated.');
      }
    },

    handleSort(list) {
      this.list = list;
      this.updateStorage();
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
