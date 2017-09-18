<template>
  <span :class="classMap[type]"></span>
</template>

<script>
export default {
  props: {
    type: Number
  },
  data () {
    return {
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin"
  .icon1
    vertical-align top
    display inline-block
    width 12px
    height 12px
    margin-right 4px
    background-size 12px 12px
    background-repeat no-repeat
    &.decrease
      bg-image('decrease_1')
    &.discount
      bg-image('discount_1')
    &.guarantee
      bg-image('guarantee_1')
    &.invoice
      bg-image('invoice_1')
    &.special
      bg-image('special_1')

  .icon2
    display inline-block
    width 16px
    height 16px
    vertical-align top
    margin-right 6px
    background-size 16px 16px
    background-repeat no-repeat
    &.decrease
      bg-image('decrease_2')
    &.discount
      bg-image('discount_2')
    &.guarantee
      bg-image('guarantee_2')
    &.invoice
      bg-image('invoice_2')
    &.special
      bg-image('special_2')

  .icon3
    display inline-block
    width 12px
    height 12px
    vertical-align top
    margin-right 2px
    background-size 12px 12px
    background-repeat no-repeat
    &.decrease
      bg-image('decrease_3')
    &.discount
      bg-image('discount_3')
    &.guarantee
      bg-image('guarantee_3')
    &.invoice
      bg-image('invoice_3')
    &.special
      bg-image('special_3')
</style>