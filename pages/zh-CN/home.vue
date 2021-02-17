<template>
  <section class="home">
    <section class="container">
      <section v-if="ad1" class="account" ref="account"
      :style="'visibility:'+animationUp[1]+';animation-name:'+animatName[1]">
      <section class="account-img">
        <section class="img-sec">
        <div class="contentImg">
          <img :src="ad1.img">
        </div>
        </section>
      </section>
      <section class="ad-block">
        <div class="ad-content">
          <h3 class="title">
            <span class="name">{{ ad1.title }}</span>
          </h3>
          <div class="text">{{ ad1.text }}</div>
          <div class="links">
            <a :href="ad1.url ? ad1.url : 'javascript:void(0)'" class="button-gray more">{{ $L(`More`) }} ></a>
          </div>
        </div>
      </section>
      </section>
    </section>
    <section class="numberRoll animation-up">
      <section class="container">
        <div class="roll-ul" ref="rollUl"
        :style="'visibility:'+animationUp[2]+';animation-name:'+animatName[2]">
          <div class="roll-li">
            <div class="rollCont">
              <p v-for="(item,index) in orderNumAll.orderNum" :key="index"
              :class="{'number-item': !isNaN(item), 'mark-item': isNaN(item) }">
                <span v-if="!isNaN(item)" class="big-number">
                  <i ref="numberItem">0123456789</i>
                </span>
                <span v-else class="comma">{{ item }}</span>
              </p>
            </div>
            <div class="roll-font">{{ orderNumAll.orderdes }}</div>
          </div>
          <div class="roll-li">
            <div class="rollCont">
              <p v-for="(item,index) in orderNumAll.orderNum" :key="index"
              :class="{'number-item': !isNaN(item), 'mark-item': isNaN(item) }">
                <span v-if="!isNaN(item)" class="big-number">
                  <i ref="numberItem">0123456789</i>
                </span>
                <span v-else class="comma">{{ item }}</span>
              </p>
            </div>
            <div class="roll-font">{{ orderNumAll.orderdes }}</div>
          </div>
          <div class="roll-li">
            <div class="rollCont">
              <p v-for="(item,index) in orderNumAll.orderNum" :key="index"
              :class="{'number-item': !isNaN(item), 'mark-item': isNaN(item) }">
                <span v-if="!isNaN(item)" class="big-number">
                  <i ref="numberItem">0123456789</i>
                </span>
                <span v-else class="comma">{{ item }}</span>
              </p>
            </div>
            <div class="roll-font">{{ orderNumAll.orderdes }}</div>
          </div>
        </div>
      </section>
    </section>
    <section class="container">
      <section v-if="group3" class="product-block" ref="productBlock"
      :style="'visibility:'+animationUp[3]+';animation-name:'+animatName[3]">
        <h3 class="block-title">
          <span class="name">{{ group3.title }}</span>
          <span class="more">
            <a href="javascript:void(0)" @click="goNewsGroup(group3.catalogGroupId, group3.type)">{{ $L('More') }} ></a>
          </span>
        </h3>
        <ul>
          <li v-for="item in group3.children" :key="item.id" @click="goNewsGroup(item.id, group3.type)">
            <div class="product-icon-container">
              <div class="product-icon">
                <img :src="item.icon" />
              </div>
              <div class="product-cover">
                <span>
                  <img :src="item.cover" />
                </span>
              </div>
              <div class="product-info">
                <h4>{{ item.displayName }}</h4>
                <p>{{ item.info }}</p>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </section>
    <section v-if="group2" class="picnews-block" ref="picnewsBlock"
      :style="'visibility:'+animationUp[4]+';animation-name:'+animatName[4]">
      <section class="container">
        <section class="looper">
          <client-only>
            <div v-swiper:group2Swipper="swiperOption">
              <div class="swiper-wrapper position-relative">
                <div
                  v-for="item in group2.items"
                  :key="item.id"
                  :data-index="item.id"
                  :data-group="group2.type"
                  class="swiper-slide"
                >
                  <img :src="item.cover" />
                  <div class="slide-info">
                    <a>{{ item.title }}</a>
                  </div>
                </div>
              </div>
            </div>
          </client-only>
        </section>
      </section>
    </section>
    <section class="container">
      <section v-if="ad2" class="ad-img-block" ref="adimgBlock"
      :style="'visibility:'+animationUp[5]+';animation-name:'+animatName[5]">
        <h3 class="title">
          <span class="name">{{ ad2.title }}</span>
        </h3>
        <a :href="ad2.url ? ad2.url : 'javascript:void(0)'" class="img-url">
          <img :src="ad2.img" />
        </a>
      </section>
      <section v-if="group1" class="news-block" ref="newsBlock" 
      :style="'visibility:'+animationUp[6]+';animation-name:'+animatName[6]">
        <div class="news-list">
          <dl>
            <dt class="block-title">
              <span class="name">{{ group1.title }}</span>
              <span class="more">
                <a href="javascript:void(0)" @click="goNewsGroup(group1.catalogGroupId, group1.type)">{{ $L('More') }} ></a>
              </span>
            </dt>
            <dd v-for="item in group1.items" :key="item.id">
              <a class="gray" href="javascript:void(0)" @click="goNewsDetail(item.id, group1.type)">{{ item.title }}</a>
              <i>{{ formatDate(item.creationTime) }}</i>
              <p>{{ filter(item.content, 200) }}</p>
            </dd>
          </dl>
        </div>
      </section>
    </section>
  </section>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import tools from '../../utiltools/tools'
import AppConsts from '../../utiltools/appconst'
export default {
  data() {
    return {
      wordIndex: 0,
      observer: null,
      isProductLoading: false,
      animationUp:['hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden'],
      animatName:['none', 'none', 'none', 'none', 'none', 'none'],
      announceSwiperOption: {
        autoplay: true,
        loop: true
      },
      orderNumAll: {
        orderNum: ['0', '0', '0', '0', '0', '0', '0', '0'],
        orderdes: '项目'
      }
    }
  },
  computed: {
    swiperOption() {
      let that = this
      let option = {
        autoplay: { delay: 4000 },
        loop: true,
        breakpointsInverse: true,
        preventClicks: false,
        breakpoints: {
          300: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 30
          },
          768: {
            slidesPerView: 4,
            slidesPerGroup: 3,
            spaceBetween: 30
          }
        },
        on: {
          click() {
            const realIndex = this.clickedSlide.dataset.index
            const group = parseInt(this.clickedSlide.dataset.group)
            that.goNewsDetail(realIndex, group)
          }
        }
      }
      return option
    },
    ...mapState({
      currentPath: state => state.app.currentPath,
      culture: state => state.app.culture,
      partners: state => state.app.partners,
      homePage: state => state.app.homePage
    })
  },
  async asyncData({ isDev, route, store, env, query, req, res, redirect, error }) {
    let params, group1, group2, group3, ad1, ad2, announces
    const groups = store.state.app.homePage.groups.filter(x => x.catalogGroup)
    const blocks = store.state.app.homePage.blocks

    ad1 = blocks.length > 0 ? blocks[0] : null
    ad2 = blocks.length > 1 ? blocks[1] : null
    group1 = groups.length > 0 ? groups[0] : null
    group2 = groups.length > 1 ? groups[1] : null
    group3 = groups.length > 2 ? groups[2] : null
    if (group1 && group1.items) group1.items = group1.items.slice(0, 6)
    if (group2 && group2.items) group2.items = group2.items.slice(0, 6)
    if (group3 && group3.items) group3.items = group3.items.slice(0, 6)

    params = {
      params: {
        SkipCount: 0,
        MaxResultCount: 1
      }
    }
    announces = (await store.dispatch('app/getAnounces', params)).items
    return { ad1, ad2, announces, group1, group2, group3 }
  },
  created() {
  },
  mounted() {
    setTimeout(() => {
      this.toOrderNum('1234567+', '成立') // 这里输入数字即可调用
      this.demoScroll()
    }, 500)
    window.addEventListener('scroll', this.demoScroll)
  },
  methods: {
    target(id) {
      window.open(`/${this.culture}/announce/detail/` + String(id, '_blank'))
    },
    getImgUrl(val) {
      if (val) return AppConsts.remoteServiceBaseUrl + val
      else return null
    },
    goNewsGroup(id, type) {
      switch (type) {
        case 1:
          this.$router.push(`/${this.culture}/news/` + String(id))
          break
        case 2:
          this.$router.push(`/${this.culture}/photonews/` + String(id))
          break
        case 3:
          this.$router.push(`/${this.culture}/product/` + String(id))
          break
      }
    },
    goNewsDetail(id, type) {
      let typename
      switch (type) {
        case 1:
          typename = 'news'
          break
        case 2:
          typename = 'photonews'
          break
        case 3:
          typename = 'product'
          break
      }
      console.log(typename)
      window.open(`/${this.culture}/` + typename + '/detail/' + String(id), '_blank')
    },
    filter(val, length) {
      return tools.cutString(tools._filter(val), length)
    },
    formatDate(val) {
      return tools.date(val)
    },
      // 设置文字滚动
      setNumberTransform () {
       const numberItems = this.$refs.numberItem // 拿到数字的ref组成数组，计算元素数量
       const numberArr = this.orderNumAll.orderNum.filter(item => !isNaN(item))//将最终滚动的数字过滤出来
       // 结合CSS 对数字字符进行滚动,显示订单数量
       for (let index = 0; index < numberItems.length; index++) {
        const elem = numberItems[index]
        elem.style.transform = `translate(-50%, -${numberArr[index] * 10}%)`
       }
      },
      // 处理总订单数字
      toOrderNum(num, des) {
       num = num.toString()
       // 把订单数变成字符串
         if (num.length <= 8) {
          // 订单数中加入逗号
          // num = num.slice(0, 2) + ',' + num.slice(2, 5) + ',' + num.slice(5, 8)
          this.orderNumAll.orderNum = num.split('') // 将其便变成数据，渲染至滚动数组
          this.orderNumAll.orderdes = des
        } else if (num.length > 8) {
          // 订单总量数字超过八位显示异常
          this.toOrderNum('9999999+', '项目')
        }
        this.setNumberTransform()
      },
    demoScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let domHight = document.body.offsetHeight
      let id1, id2, id3, id4, id5, id6
      let scrollHeight1, scrollHeight2, scrollHeight3, scrollHeight4, scrollHeight5, scrollHeight6
      let offsetTop1, offsetTop2, offsetTop3, offsetTop4, offsetTop5, offsetTop6
      let top1, top2, top3, top4, top5, top6
      let bottom1, bottom2, bottom3, bottom4, bottom5, bottom6
      id1 = this.$refs.account
      id2 = this.$refs.rollUl
      id3 = this.$refs.productBlock
      id4 = this.$refs.picnewsBlock
      id5 = this.$refs.adimgBlock
      id6 = this.$refs.newsBlock
      scrollHeight1 = id1.scrollHeight
      scrollHeight2 = id2.scrollHeight
      scrollHeight3 = id3.scrollHeight
      scrollHeight4 = id4.scrollHeight
      scrollHeight5 = id5.scrollHeight
      scrollHeight6 = id6.scrollHeight
      offsetTop1 = id1.offsetTop
      offsetTop2 = id2.offsetTop
      offsetTop3 = id3.offsetTop
      offsetTop4 = id4.offsetTop
      offsetTop5 = id5.offsetTop
      offsetTop6 = id6.offsetTop
      top1 = offsetTop1 - domHight > 0 ? offsetTop1 - domHight : 0
      top2 = offsetTop2 - domHight > 0 ? offsetTop2 - domHight : 0
      top3 = offsetTop3 - domHight > 0 ? offsetTop3 - domHight : 0
      top4 = offsetTop4 - domHight > 0 ? offsetTop4 - domHight : 0
      top5 = offsetTop5 - domHight > 0 ? offsetTop5 - domHight : 0
      top6 = offsetTop6 - domHight > 0 ? offsetTop6 - domHight : 0
      bottom1 = scrollHeight1 + offsetTop1
      bottom2 = scrollHeight2 + offsetTop2
      bottom3 = scrollHeight3 + offsetTop3
      bottom4 = scrollHeight4 + offsetTop4
      bottom5 = scrollHeight5 + offsetTop5
      bottom6 = scrollHeight6 + offsetTop6
      if (scrollTop >= top1 && scrollTop <= bottom1) {
        this.animationUp[1] = 'visible'
        this.animatName[1] = 'fadeInUp'
      }
      if (scrollTop >= top2 && scrollTop <= bottom2) {
        this.animationUp[2] = 'visible'
        this.animatName[2] = 'fadeInUp'
      }
      if (scrollTop >= top3 && scrollTop <= bottom3) {
        this.animationUp[3] = 'visible'
        this.animatName[3] = 'fadeInUp'
      }
      if (scrollTop >= top4 && scrollTop <= bottom4) {
        this.animationUp[4] = 'visible'
        this.animatName[4] = 'fadeInUp'
      }
      if (scrollTop >= top5 && scrollTop <= bottom5) {
        this.animationUp[5] = 'visible'
        this.animatName[5] = 'fadeInUp'
      }
      if (scrollTop >= top6 && scrollTop <= bottom6) {
        this.animationUp[6] = 'visible'
        this.animatName[6] = 'fadeInUp'
      }
    }
  }
}
</script>
