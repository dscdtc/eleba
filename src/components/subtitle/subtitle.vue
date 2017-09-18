<template>
  <div class="subtitle">
    <div class="line"></div>
    <div class="text">
      <slot>传入子标题</slot>
    </div>
    <div class="line"></div>
  </div>

</template>

<script>
export default {
  name: 'subTitle'
}
</script>

<style lang="stylus" scoped>
  .subtitle
    display flex
    width 80%
    margin 28px auto 24px auto
    .line
      flex 1
      position relative
      top 7px
      border-top 1px solid rgba(255, 255, 255, .2)
    .text
      padding 0 12px
      font-weight 700
      font-size 14px
</style>
