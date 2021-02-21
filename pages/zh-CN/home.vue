<template>
  <section class="home">
    <section class="numberRoll animation-up">
      <section class="container">
        <div class="roll-ul">
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
      <section v-if="group1" class="product-block">
        <h3 class="block-title">
          <span class="name">{{ group1.title }}</span>
          <span class="more">
            <a href="javascript:void(0)" @click="goNewsGroup(group1.catalogGroupId, group1.type)">{{ $L('More') }} ></a>
          </span>
        </h3>
        <div class="product-type">
          <button v-for="item in group1.children" :key="item.id" @click="g3tab=item.id" :class="[g3tab==item.id?'tabbut':'']">{{ item.displayName }}</button>
        </div>
        <ul>
          <li v-for="item in group1.items" :key="item.id" @click="goNewsDetail(item.id, group1.type)" 
          v-show="g3tabcont(g3tab,group1.children[0].id)===item.catalogGroupId">
            <div class="product-icon-container">
              <div class="product-cover">
                <span>
                  <img :src="item.miniCover" />
                </span>
              </div>
              <div class="product-info">
                <h4>{{ item.title }}</h4>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </section>
    <section v-if="group2" class="picnews-block">
        <h3 class="block-title">
          <span class="name">{{ group2.title }}</span>
        </h3>
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
          <div class="swiper-pic-prev picbut"><i class="fas fa-arrow-left"></i></div>
          <div class="swiper-pic-next picbut"><i class="fas fa-arrow-right"></i></div>
        </section>
    </section>
    <section class="container">
      <section v-if="ad1" class="account">
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
      <section v-if="ad2" class="ad-img-block" :style="`background-image:url('${ad2.img}')`">
        <div class="ad-img-color">
        <h3 class="title">
          <a :href="ad2.url ? ad2.url : 'javascript:void(0)'" class="img-url">
          <span class="name">{{ ad2.title }}</span>
          </a>
        </h3>
        <p>{{ ad2.text }}</p>
        </div>
        <!-- <a :href="ad2.url ? ad2.url : 'javascript:void(0)'" class="img-url">
          <img :src="ad2.img" />
        </a> -->
      </section>
      <section class="container">
      <section v-if="group3" class="news-block">
        <div class="news-list">
          <dl>
            <dt class="block-title">
              <span class="name">{{ group3.title }}</span>
              <span class="more">
                <a href="javascript:void(0)" @click="goNewsGroup(group3.catalogGroupId, group3.type)">{{ $L('More') }} ></a>
              </span>
            </dt>
            <dd v-for="item in group3.items" :key="item.id">
              <a class="gray" href="javascript:void(0)" @click="goNewsDetail(item.id, group3.type)">{{ item.title }}</a>
              <span>[{{ formatDate(item.creationTime) }}]</span>
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
      g3tab: 0,
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
        autoplay: { delay: 3000 },
        loop: true,
        breakpointsInverse: true,
        preventClicks: false,
        navigation: {
          nextEl: '.swiper-pic-next',
          prevEl: '.swiper-pic-prev'
        },
        breakpoints: {
          300: {
            slidesPerView: 2,
            slidesPerGroup: 2
          },
          768: {
            slidesPerView: 4,
            slidesPerGroup: 1
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
    if (group2 && group2.items) group2.items = group2.items.slice(0, 6)
    if (group3 && group3.items) group3.items = group3.items.slice(0, 30)

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
       const numberItems = this.$refs.numberItem
       const numberArr = this.orderNumAll.orderNum.filter(item => !isNaN(item))
       // 结合CSS 对数字字符进行滚动,显示订单数量
       for (let index = 0; index < numberItems.length; index++) {
        const elem = numberItems[index]
        elem.style.transform = `translate(-50%, -${numberArr[index] * 10}%)`
       }
      },
      // 处理总订单数字
      toOrderNum(num, des) {
       num = num.toString()
         if (num.length <= 8) {
          this.orderNumAll.orderNum = num.split('')
          this.orderNumAll.orderdes = des
        } else if (num.length > 8) {
          // 订单总量数字超过八位显示异常
          this.toOrderNum('9999999+', '项目')
        }
        this.setNumberTransform()
      },
      g3tabcont(g3tab, childrenone){
        if(g3tab===0){
          this.g3tab = childrenone
          return this.g3tab
        }else{
          return this.g3tab
        }
      }
  }
}
</script>
