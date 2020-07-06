<template>
  <span :class="['common-switch', on ? 'common-switch-on' : '']" @click="handleClick">
    <span class="switch-dot"></span>
  </span>
</template>

<script>
export default {
  name: 'CommonSwitch',

  props: {
    on: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    handleClick() {
      const newValue = !this.on;
      this.$emit('change', newValue);
    },
  },
};
</script>

<style lang="scss" scoped>
.common-switch {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 12px;
  border-radius: 10px;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, .5);
  position: relative;
  cursor: pointer;
  transition: .1s linear all;

  .switch-dot {
    transition: .1s linear all;
    position: absolute;
    height: 6px;
    width: 6px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, .5);
    top: 2px;
    left: 2px;
  }
}

.common-switch-on {
  transition: .1s linear all;
  border: 1px solid rgba(255, 255, 255, .95);

  .switch-dot {
    transition: .1s linear all;
    background-color: rgba(255, 255, 255, .95);
    left: 10px;
  }
}
</style>