<template>
  <div class="home">
    <div class="home-container">
      <div class="sider">
        <home-sider :list="list" />
      </div>
      <div class="main">
        <home-main />
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
    };
  },

  mounted() {
    this.list = [
      { name: 'App Center', open: true },
      { name: 'Skin Center', open: false },
      { name: 'New Doc', open: false },
      { name: 'Template Store', open: false },
    ];
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
