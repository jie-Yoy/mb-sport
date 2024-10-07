<template>
  <div v-if="!showDialog" class="dialog">
    <!-- 蒙层 -->
    <!-- 禁用蒙层默认事件 -->
    <div class="mask" @touchmove.stop.prevent></div>
    <!-- 弹窗 -->
    <div class="dialog-content" @touchmove.stop="handleTouch">
      <!-- 弹窗标题 -->
      <div class="title-content"></div>
      <!-- 弹窗滚动区 -->
      <div class="scroll-content" @touchmove.stop="listTouch" ref="contentScroll">
        <div v-for="i in 1000">{{ i }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  watch: {
    // 弹窗打开的时候overflow置为hidden，处理iOS的情况
    showDialog(val) {
      document.body.style.overflow = val ? "hidden" : "";
    },
  },
  methods: {
    // 滚动区之外的内容要禁用掉，通过判断类名的方法禁用（yysy比较麻烦，可以换个更好的方法）
    handleTouch(e) {
      if (e.target.className == "dialog-content" || e.target.className == "title-content")
        e.preventDefault();
    },
    // 滚动区内容比滚动区默认高度小的情况下要禁用默认事件
    listTouch(e) {
      if (
        !(this.$refs.contentScroll.scrollHeight > this.$refs.contentScroll.clientHeight)
      )
        e.preventDefault();
    },
  },
};
</script>
<style lang="scss">
.dialog {
  .mask {
  }
  .dialog-content {
    .title-content {
    }
    .scroll-content {
      // 处理滚动区到顶或者到底的滚动条防止滑动穿透
      // 滚动区内容比滚动区默认高度大且到顶的情况
      overscroll-behavior: contain;
    }
  }
}
</style>
