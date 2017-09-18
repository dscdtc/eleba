<template>
  <div class="cartctl">
    <transition name="move">
      <div class="cart-remove" v-show="food.count" @click="removeCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>

</template>

<script>
import Vue from 'vue'
export default {
  props: {
    food: Object
  },
  created () {
    // console.log(this.food)
  },
  methods: {
    addCart (event) {
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count ++
      }
      this.$emit('add', event.target)
    },
    removeCart () {
      if (this.food.count) {
        this.food.count --
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .cartctl
    font-size 0
    .cart-remove
      display inline-block
      padding 6px
      opacity 1
      transform translate3d(0, 0, 0) // GPU加速
      .inner
        display inline-block // 有宽高使元素滚动
        line-height 24px
        font-size 24px
        color rgb(0, 160, 220)
        transition all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0)
        transform rotate(0)
      &.move-enter-active, &.move-leave-active
        transition: all .3s linear
      &.move-enter, &.move-leave-to
        opacity 0
        transform translate3d(24px, 0, 0)
        .inner
          transform rotate(180deg)
    .cart-count
      display inline-block
      vertical-align top
      text-align center
      width 12px
      padding-top 6px
      line-height 24px
      font-size 10px
      color rgb(147, 153, 159)
    .cart-add
      display inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color rgb(0, 160, 220)
</style>