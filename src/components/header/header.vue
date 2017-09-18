<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name"> {{ seller.name }} </span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <icon :type="seller.supports[0].type" class="icon1"></icon>
          <span class="text"> {{seller.supports[0].description}} </span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail" >
        <span class="count"> {{seller.supports.length}}个 </span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text"> {{seller.bulletin}} </span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="134px" />
    </div>
    <transition name="fade">
      <!-- CSS Sticky Footers -->
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name"> {{seller.name}} </h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <subtitle>优惠信息</subtitle>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item, index) in seller.supports" :key="index">
                <icon :type="item.type" class="icon2"></icon>
                <span class="text"> {{item.description}} </span>
              </li>
            </ul>
            <subtitle>商家公告</subtitle>
            <div class="bulletin">
              <p class="content"> {{seller.bulletin}} </p>
            </div>
          </div>
        </div>
        <div class="detail-close">
          <i class="icon-close" @click="showDetail"></i>
        </div>
      </div>

    </transition>
  </div>

</template>

<script>
import star from 'comp/star/star'
import subtitle from 'comp/subtitle/subtitle'
import icon from 'comp/icon/icon'

export default {
  props: {
    seller: Object
  },
  data () {
    return {
      detailShow: false
    }
  },
  methods: {
    showDetail () {
      this.detailShow = !this.detailShow
      // this.$toast('aaaa', 1000)
    }
  },
  components: {
    star,
    subtitle,
    icon
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin"
  .header
    position relative
    overflow hidden
    color #fff
    background rgba(7, 17, 27, .5)
    .content-wrapper
      position relative
      padding 24px 12px 18px 24px
      font-size 0
      .avatar
        vertical-align top
        display inline-block
        img
          border-radius 2px
      .content
        display inline-block
        margin-left 16px
        .title
          margin 2px 0 8px 0
          .brand
            display inline-block
            vertical-align top
            width 30px
            height 18px
            bg-image('brand')
            background-size 30px 18px
            background-repeat no-repeat
          .name
            margin-left 6px
            font-size 16px
            font-weight blod
            line-height 18px

        .description
          margin-bottom 10px
          line-height 12px
          font-size 12px
        .support .text
          line-height 12px
          font-size 10px

      .support-count
        position absolute
        right 12px
        bottom 14px
        padding 0 8px
        height 24px
        line-height 24px
        border-radius 14px
        background rgba(0, 0, 0, .2)
        text-align center
        .count
          line-height 24px
          vertical-align top
          font-size 10px
        .icon-keyboard_arrow_right
          line-height 24px
          margin-left 2px
          font-size 10px

    .bulletin-wrapper
      position relative
      height 28px
      line-height 28px
      padding 0 22px 0 12px
      /* 超出显示省略号 */
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      background rgba(7, 17, 27, .2)
      // font-size 0
      .bulletin-title
        display inline-block
        vertical-align top
        margin-top 8px
        // line-height 28px
        // vertical-align center
        width 22px
        height 12px
        bg-image('bulletin')
        background-size 22px 12px
        background-repeat no-repeat //???
      .bulletin-text
        vertical-align center
        margin 0 4px
        font-size 10px
      .icon-keyboard_arrow_right
        position absolute
        font-size 10px
        right 12px
        top 8px
    .background
      position absolute
      top 0
      width 100%
      height 100%
      z-index -1
      filter blur(10px)
    .detail
      position fixed
      top 0
      z-index 99
      width 100%
      height 100%
      overflow auto
      // 背景虚化iOS
      backdrop-filter blur(10px)
      opacity 1
      background rgba(7, 17, 27, .8)
      /* 过渡动画 */
      &.fade-enter-active, &.fade-leave-active
        transition all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0)
      &.fade-enter, &.fade-leave-to
        transform: translateX(500px)
        opacity 0
        background rgba(7, 17, 27, 0)
      /* CSS Sticky footers */
      .detail-wrapper
        width 100%
        min-height 100%
        .detail-main
          margin-top 64px
          padding-bottom 64px
          .name
            line-height 16px
            text-align center
            font-size 16px
            font-weight  700
          .star-wrapper
            margin-top 18px
            padding 2px 0
            text-align center
          .supports
            width 80%
            margin 0 auto
            .support-item
              paddding 0 12px
              margin-bottom 12px
              font-size 0
              &:last-child
                margin-bottom 0
              .text
                line-height 16px
                font-size 12px
          .bulletin
            width 80%
            margin 0 auto
            .content
              padding 0 12px
              line-height 24px
              font-size 12px
      .detail-close
        position relative
        width 32px
        height 32px
        margin -64px auto 0 auto
        clear both
        font-size 32px
</style>
