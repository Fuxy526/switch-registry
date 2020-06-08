<template>
  <div class="home-main-empty">
    <div class="home-main-empty-wrapper">
      <div class="empty-image"></div>
      <div class="empty-tip">
        The list is empty. Click + to add your first item.
        <!-- <div>The list is empty.</div>
        <div>Click + to add your first item.</div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeMainEmpty',
};
</script>

<style lang="scss" scoped>
.home-main-empty {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 50px;

  .home-main-empty-wrapper {
    text-align: center;
    width: 160px;

    .empty-image {
      width: 80px;
      height: 80px;
      background-image: url('../../assets/images/common/empty.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      margin: 0 auto 15px;
    }

    .empty-tip {
      font-size: 12px;
      color: #999;
      line-height: 18px;
    }
  }
}
</style>