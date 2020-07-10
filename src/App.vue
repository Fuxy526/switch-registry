<template>
  <div id="app" @click="handleAppClick">
    <common-navigation />
    <router-view/>
  </div>
</template>

<script>
import CommonNavigation from './components/common/CommonNavigation.vue';

export default {
  name: 'App',
  components: {
    CommonNavigation,
  },

  methods: {
    handleAppClick() {
      this.$bus.emit('APP_CLICK');
    },
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: 0;
  user-select: none;
  background-color: transparent;
}

#app {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, .15);
}

::-webkit-scrollbar-track {
  background: transparent;
}
</style>
