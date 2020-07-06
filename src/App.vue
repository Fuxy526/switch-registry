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
  top: 5px;
  bottom: 5px;
  left: 5px;
  right: 5px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, .3);
  overflow: hidden;
  border-radius: 4px;
}
</style>
