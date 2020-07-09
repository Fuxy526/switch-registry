<template>
  <div class="home-main">
    <div class="home-main-wrapper">
      <div class="title-bar">
        <div class="title-wrapper">
          <span class="title">{{ name }}</span>
          <span class="status-open" v-if="open">open</span>
          <span class="status-close" v-else>closed</span>
        </div>
      </div>

      <div class="content">
        <div class="form-group">
          <label class="label">KEY NAME</label>
          <input class="input" type="text" placeholder="Please enter key name" :value="keyName" @change="handleKeyNameChange" />
        </div>
        <div class="form-group">
          <label class="label">VALUE NAME</label>
          <input class="input" type="text" placeholder="Please enter value name" :value="valueName" @change="handleValueNameChange" />
        </div>
        <div class="form-group">
          <label class="label">DEFAULT DATA</label>
          <select class="select" :value="defaultType" @change="handleDefaultTypeChange">
            <option class="option" v-for="item in types" :key="item" :name="item">{{ item }}</option>
          </select>
          <input class="input" type="text" placeholder="Please enter default data" :value="defaultData" @change="handleDefaultDataChange" />
        </div>
        <div class="form-group">
          <label class="label">TARGET DATA</label>
          <select class="select" :value="targetType" @change="handleTargetTypeChange">
            <option class="option" v-for="item in types" :key="item" :name="item">{{ item }}</option>
          </select>
          <input class="input" type="text" placeholder="Please enter target data" :value="targetData" @change="handleTargetDataChange" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeMain',

  data() {
    return {
      renameModalVisible: false,
      newName: '',
      types: ['REG_SZ', 'REG_MULTI_SZ', 'REG_DWORD_BIG_ENDIAN', 'REG_DWORD', 'REG_BINARY', 'REG_DWORD_LITTLE_ENDIAN', 'REG_LINK', 'REG_FULL_RESOURCE_DESCRIPTOR', 'REG_EXPAND_SZ'],
    };
  },

  props: {
    name: {
      type: String,
      default: '',
    },
    open: {
      type: Boolean,
      default: true,
    },
    keyName: {
      type: String,
      default: '',
    },
    valueName: {
      type: String,
      default: '',
    },
    defaultType: {
      type: String,
      default: '',
    },
    defaultData: {
      type: String,
      default: '',
    },
    targetType: {
      type: String,
      default: '',
    },
    targetData: {
      type: String,
      default: '',
    },
  },

  methods: {
    handleKeyNameChange(e) {
      this.$emit('dataChange', 'key_name', e.target.value);
    },

    handleValueNameChange(e) {
      this.$emit('dataChange', 'value_name', e.target.value);
    },

    handleDefaultTypeChange(e) {
      this.$emit('dataChange', 'default_type', e.target.value);
    },

    handleDefaultDataChange(e) {
      this.$emit('dataChange', 'default_data', e.target.value);
    },

    handleTargetTypeChange(e) {
      this.$emit('dataChange', 'target_type', e.target.value);
    },

    handleTargetDataChange(e) {
      this.$emit('dataChange', 'target_data', e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.home-main {
  background-color: #fff;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  border: 1px solid #D9D9D9;
  border-left: 0;
  padding: 26px 0 0;

  .title-bar {
    background-color: #fff;
    padding: 0 20px 0;
    border-bottom: 1px solid #eee;
    -webkit-app-region: drag;

    .title-wrapper {
      display: inline-block;
      width: 100%;
      line-height: 28px;
      height: 38px;

      .title {
        display: inline-block;
        vertical-align: middle;
        font-size: 16px;
        font-weight: bold;
        color: #1A202C;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: calc(100% - 60px);
      }

      .status-open,
      .status-close {
        padding: 0 8px;
        height: 18px;
        line-height: 18px;
        border-radius: 9px;
        display: inline-block;
        vertical-align: middle;
        margin-left: 5px;
        font-size: 12px;
      }

      .status-close {
        background-color: #f1f5f9;
        color: #666;
      }

      .status-open {
        background-color: #def7ec;
        color: #03543f;
      }
    }
  }

  .content {
    position: absolute;
    top: 65px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
    background-color: #F1F5F9;
    padding: 20px 30px 20px 25px;

    .form-group {
      margin-bottom: 25px;

      .label {
        display: block;
        font-size: 11px;
        margin-bottom: 6px;
        color: #64748B;
      }

      .select {
        width: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
        border: 0;
        border-bottom: 1px solid #e2e2e2;
        height: 30px;
        outline: none;
        color: #64748B;
        font-weight: bold;
        font-size: 12px;
        background-color: transparent;
        transition: all .2s ease-in-out;
        cursor: pointer;

        &:focus {
          border-bottom: 1px solid #036672;
          transition: all .2s ease-in-out;
        }
      }

      .select+.input {
        width: calc(100% - 90px);
        margin-left: 10px;
      }

      .input {
        width: 100%;
        border: 0;
        border-bottom: 1px solid #e2e2e2;
        height: 30px;
        outline: none;
        color: #64748B;
        font-weight: bold;
        font-size: 12px;
        background-color: transparent;
        transition: all .2s ease-in-out;

        &:focus {
          border-bottom: 1px solid #036672;
          transition: all .2s ease-in-out;
        }

        &::placeholder {
          color: #64748B;
          opacity: .25;
          font-weight: normal;
        }
      }
    }
  }
}
</style>