<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" :key="index" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
          <span class="text border-1px">
            <icon v-show="item.type>0" :type="item.type" class="icon3"></icon>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="(item, index) in goods" :key="index" class="food-list food-list-hook">
          <h1 class="title"> {{item.name}} </h1>
          <ul>
            <li v-for="(food, index) in item.foods" :key="index" class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon" />
              </div>
              <div class="content">
                <h2 class="name"> {{food.name}} </h2>
                <p class="desc"> {{food.description}} </p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">¥{{food.price}}</span><span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                </div>
                <div class="cartctl-wrapper">
                  <cartctl @add="addFood" :food="food"></cartctl>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart" :select-foods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
  </div>

</template>

<script>
import BScroll from 'better-scroll'
import {getInfo} from 'api/get'
import icon from 'comp/icon/icon'
import shopcart from 'comp/shopcart/shopcart'
import cartctl from 'comp/cartctl/cartctl'

const ERR_OK = 0

export default {
  props: {
    seller: Object
  },
  data () {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0
    }
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    selectFoods () {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  created () {
    this._getGoods()
  },
  methods: {
    selectMenu (index, event) {
      // 浏览器仅使用bscroll派发事件
      if (!event._constructed) {
        return
      }
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let el = foodList[index]
      this.foodsScroll.scrollToElement(el, 300)
    },
    // ???
    addFood (target) {
      this._drop(target)
    },
    _drop (target) {
      // 体验优化 异步执行动画
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target)
      })
    },
    _getGoods () {
      getInfo('goods')
      .then((res) => {
        if (res.errorno === ERR_OK) {
          this.goods = res.data
          this.$nextTick(() => { // 操作原生DOM前保证DOM已经渲染
            this._initScroll()
            this._calculateHeight()
          })
        }
      })
    },
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3 // 实时返回滚动位置
      })

      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight () {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  },
  components: {
    icon,
    shopcart,
    cartctl
  }
  // Vue1.0
  // events: {
  //   'cart.add' (target) {
  //     this._drop(target)
  //   }
  // }
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin"
  .goods
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px //兼容安卓
      background #f3f5f7
      .menu-item
        display table
        height 54px
        width 56px
        padding 0 12px
        line-height 14px
        &.current
          position relative
          z-index 10
          margin-top -1px
          background #fff
          font-weight 700
          .text
            border-none()
        .text
          display table-cell
          width 56px
          vertical-align middle
          border-1px(rgba(7,17,27,.1))
          font-size 12px
    .foods-wrapper
      flex 1
      .title
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147,153,159)
        background #f3f5f7
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7,17,27,.1))
        &:last-child
          border-none()
          margin-bottom 0
        .icon
          flex 0 0 57px
          margin-left 10px
        .content
          flex 1
          .name
            margin 2px 0 8px 0
            height 14px
            line-height 14px
            font-size 14px
            color rgb(7,17,27)
          .desc
            margin-bottom 8px
            line-height 12px
          .desc, .extra
            line-height 10px
            font-size 10px
            color rgb(147,153,159)
          .extra
            .count
              margin-right 12px
          .price
            font-weight 700
            line-height 24px
            .now
              margin-right 8px
              font-size 14px
              color rgb(240,20,20)
            .old
              text-decoration line-through
              font-size 10px
              color rgb(147,153,159)
          .cartctl-wrapper
            position absolute
            right 0
            bottom 12px
</style>
