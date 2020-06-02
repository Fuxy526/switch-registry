<template>
  <div class="home-main">
    <div class="home-main-wrapper">
      <div class="title-bar">
        <span class="title">{{ name }}</span>
        <span :class="['status', active ? 'status-active' : '']">
          <i class="status-dot"></i>
          <span class="status-text">{{ active ? 'active' : 'closed' }}</span>
        </span>
      </div>

      <div class="content">
        <div class="form-group">
          <label class="label">REGISTRY PATH</label>
          <input class="input" type="text" v-model="registryPath" />
        </div>
        <div class="form-group">
          <label class="label">REGISTRY KEY</label>
          <input class="input" type="text" v-model="registryKey" />
        </div>
        <div class="form-group">
          <label class="label">DEFAULT VALUE</label>
          <input class="input" type="text" v-model="defaultValue" />
        </div>
        <div class="form-group">
          <label class="label">TARGET VALUE</label>
          <input class="input" type="text" v-model="targetValue" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeMain',

  props: {
    name: {
      type: String,
      default: '',
    },
    active: {
      type: Boolean,
      default: true,
    },
    registryPath: {
      type: String,
      default: '',
    },
    registryKey: {
      type: String,
      default: '',
    },
    defaultValue: {
      type: String,
      default: '',
    },
    targetValue: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.home-main {
  background-color: #F1F5F9;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;

  .title-bar {
    background-color: #fff;
    padding: 0 20px;
    height: 54px;
    line-height: 54px;
    border-bottom: 1px solid #eee;

    .title {
      font-size: 16px;
      font-weight: bold;
      color: #1A202C;
    }

    .status {
      margin-left: 15px;
      font-size: 12px;
      color: #6D7C92;

      .status-dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #ccc;
        vertical-align: middle;
        margin-right: 2px;
      }

      .status-text {
        display: inline-block;
        vertical-align: middle;
      }
    }

    .status-active {
      .status-dot {
        background-color: #31C48D;
      }
    }
  }

  .content {
    padding: 20px 30px 20px 25px;

    .form-group {
      margin-bottom: 15px;

      .label {
        display: block;
        font-size: 12px;
        font-weight: bold;
        margin-bottom: 6px;
        color: #64748B;
      }

      .input {
        width: 100%;
        border: 1px solid #e6e6e6;
        height: 30px;
        border-radius: 4px;
        outline: none;
        padding: 0 8px;
        color: #64748B;
        font-size: 12px;
      }
    }
  }
}
</style>