<template>
  <section class="home">
    <section class="numberRoll">
      <section class="container">
        <div class="roll-ul">
          <div class="roll-li">
            <div class="rollCont">
              <p v-for="(item,index) in orderNumAll[0].orderNum" :key="index"
              :class="{'number-item': !isNaN(item), 'mark-item': isNaN(item) }">
                <span v-if="!isNaN(item)" class="big-number">
                  <i ref="numberItem">0123456789</i>
                </span>
                <span v-else class="comma">{{ item }}</span>
              </p>
            </div>
            <div class="roll-font">{{ orderNumAll[0].orderdes }}</div>
          </div>
          <div class="roll-li">
            <div class="rollCont">
              <p v-for="(item,index) in orderNumAll[1].orderNum" :key="index"
              :class="{'number-item': !isNaN(item), 'mark-item': isNaN(item) }">
                <span v-if="!isNaN(item)" class="big-number">
                  <i ref="numberItem2">0123456789</i>
                </span>
                <span v-else class="comma">{{ item }}</span>
              </p>
            </div>
            <div class="roll-font">{{ orderNumAll[1].orderdes }}</div>
          </div>
          <div class="roll-li">
            <div class="rollCont">
              <p v-for="(item,index) in orderNumAll[2].orderNum" :key="index"
              :class="{'number-item': !isNaN(item), 'mark-item': isNaN(item) }">
                <span v-if="!isNaN(item)" class="big-number">
                  <i ref="numberItem3">0123456789</i>
                </span>
                <span v-else class="comma">{{ item }}</span>
              </p>
            </div>
            <div class="roll-font">{{ orderNumAll[2].orderdes }}</div>
          </div>
        </div>
      </section>
    </section>
      <section v-if="group1" class="product-block">
        <div class="block-title">
          <h1 class="name">{{ group1.title }}</h1>
          <h5 class="more">{{ group1.catalogGroup.info }}</h5>
        </div>
        <section class="looper">
        <client-only>
        <div v-swiper:group1Swipper="swiperOption">
        <div class="swiper-wrapper position-relative">
          <div v-for="item in group1.items" :key="item.id" class="swiper-slide" @click="goNewsDetail(item.id, group1.type)">
            <img :src="item.miniCover" :alt="item.title"/>
            <div class="product-info">
              <h4>{{ item.title }}</h4>
            </div>
          </div>
        </div>
        </div>
        </client-only>
        </section>
      </section>
    <section v-if="group2" class="picnews-block">
      <section class="container">
      <div class="block-title">
        <h1 class="name">{{ group2.title }}</h1>
        <h5 class="more">{{ group2.catalogGroup.info }}</h5>
      </div>
      <div v-for="item in group2.items" :key="item.id" class="piccont" @click="goNewsDetail(item.id, group2.type)">
        <div class="picimg">
          <img :src="item.cover" :alt="item.title"/>
        </div>
        <div class="block-title slide-info">
          <h1 class="name">{{ item.title }}</h1>
          <h5 class="more">{{ item.catalogGroup.info }}</h5>
        </div>
      </div>
      </section>
    </section>
    <section class="container">
      <section v-if="group3" class="account">
        <div class="account-list">
          <dl>
            <dt class="block-title">
              <h1 class="name">{{ group3.title }}</h1>
              <h5 class="more">{{ group3.catalogGroup.info }}</h5>
            </dt>
            <dd v-for="item in group3.items" :key="item.id">
              <div class="account-img">
                <img :src="item.cover">
              </div>
              <div class="ad-block">
                <span class="title">{{ item.title }}</span>
                <span class="test" v-html="filter(item.content,100)"></span>
              </div>
            </dd>
          </dl>
        </div>
      </section>
    </section>
      <section v-if="ad2" class="ad-img-block" :style="`background-image:url('${ad2.img}')`">
        <div class="ad-img-color">
        <p>{{ ad2.text }}</p>
        <h3 class="title">
          <a :href="ad2.url ? ad2.url : 'javascript:void(0)'" class="img-url">
          <span class="name">{{ ad2.title }}</span>
          </a>
        </h3>
        </div>
      </section>
      <section class="container">
      <section v-if="group4" class="news-block">
        <div class="block-title">
          <h1 class="name">{{ group4.title }}</h1>
            <h5 class="more">{{ group4.catalogGroup.info }}</h5>
        </div>
        <div class="news-list">
          <dl>
            <dt class="block-title">
              <h5 class="more">{{ group4.children[0].displayName }}
                <a href="javascript:void(0)" @click="goNewsGroup(group4.catalogGroupId, group4.type)">{{ $L('More') }} ></a>
              </h5>
            </dt>
            <dd v-for="item in g4item1" :key="item.id">
              <a class="gray" href="javascript:void(0)" @click="goNewsDetail(item.id, group4.type)">{{ item.title }}</a>
              <span>[{{ formatDate(item.creationTime) }}]</span>
            </dd>
          </dl>
          <dl>
            <dt class="block-title">
              <h5 class="more">{{ group4.children[1].displayName }}
                <a href="javascript:void(0)" @click="goNewsGroup(group4.catalogGroupId, group4.type)">{{ $L('More') }} ></a>
              </h5>
            </dt>
            <dd v-for="item in g4item2" :key="item.id">
              <a class="gray" href="javascript:void(0)" @click="goNewsDetail(item.id, group4.type)">{{ item.title }}</a>
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
      orderNumAll: [
        {
        orderNum: ['2', '0', '0', '4', '年'],
        orderdes: '成立'
        },
        {
        orderNum: ['1', '0', '0', '+'],
        orderdes: '行业领域'
        },
        {
        orderNum: ['2', '0', '0', '0', '+'],
        orderdes: '客户信赖'
        }
      ]
    }
  },
  computed: {
    swiperOption() {
      let option = {
        effect : 'coverflow',
        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 10,
		 	  coverflowEffect: {
				  rotate: 20,
				  stretch: -50, 
				  depth: 200, 
			  	slideShadows: true
			  },
        autoplay: { delay: 5000 },
        loop: true,
        breakpoints: {
          992: {
            slidesPerView: 2,
            spaceBetween: 100,
          }
        },
        on: {
          slideChange() {},
          tap() {}
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
    let params, group1, group2, group3, group4, ad1, ad2, announces,g4item1,g4item2
    const groups = store.state.app.homePage.groups.filter(x => x.catalogGroup)
    const blocks = store.state.app.homePage.blocks
    ad1 = blocks.length > 0 ? blocks[0] : null
    ad2 = blocks.length > 1 ? blocks[1] : null
    group1 = groups.length > 0 ? groups[0] : null
    group2 = groups.length > 1 ? groups[1] : null
    group3 = groups.length > 2 ? groups[2] : null
    group4 = groups.length > 3 ? groups[3] : null
    if (group1 && group1.items) group1.items = group1.items.slice(0, 10)
    if (group2 && group2.items) group2.items = group2.items.slice(0, 3)
    if (group3 && group3.items) group3.items = group3.items.slice(0, 8)
    if (group4 && group4.items) {
      group4.children = group4.children.slice(0, 2)
        let count = {}
        group4.items = group4.items.filter(({catalogGroupId}) => {
          count[catalogGroupId] = (count[catalogGroupId] || 0) + 1
          return count[catalogGroupId] <= 4
        })
    }
    g4item1 = group4.items.filter(g => {
      return g.catalogGroupId == group4.children[0].id
    })
    g4item2 = group4.items.filter(g => {
      return g.catalogGroupId == group4.children[1].id
    })
    params = {
      params: {
        SkipCount: 0,
        MaxResultCount: 1
      }
    }
    announces = (await store.dispatch('app/getAnounces', params)).items
    return { ad1, ad2, announces, group1, group2, group3, group4, g4item1, g4item2 }
  },
  created() {
  },
  mounted() {
    setTimeout(() => {
      this.setNumberTransform()
    }, 500)
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
      window.open(`/${this.culture}/` + typename + '/detail/' + String(id), '_blank')
    },
    filter(val, length) {
      return tools.cutString(tools._filter(val), length)
    },
    formatDate(val) {
      return tools.date(val)
    },
    g3tabcont(g3tab, childrenone){
      if(g3tab===0){
        this.g3tab = childrenone
        return this.g3tab
      }else{
        return this.g3tab
      }
    },
    // 设置文字滚动
      setNumberTransform () {
       const numberItems = this.$refs.numberItem
       const numberItems2 = this.$refs.numberItem2
       const numberItems3 = this.$refs.numberItem3
       const numberArr = this.orderNumAll[0].orderNum.filter(item => !isNaN(item))
       const numberArr2 = this.orderNumAll[1].orderNum.filter(item => !isNaN(item))
       const numberArr3 = this.orderNumAll[2].orderNum.filter(item => !isNaN(item))
       // 结合CSS 对数字字符进行滚动,显示订单数量
       for (let index = 0; index < numberItems.length; index++) {
        const elem = numberItems[index]
        elem.style.transform = `translate(-50%, -${numberArr[index] * 10}%)`
       }
       for (let index = 0; index < numberItems2.length; index++) {
        const elem2 = numberItems2[index]
        elem2.style.transform = `translate(-50%, -${numberArr2[index] * 10}%)`
       }
       for (let index = 0; index < numberItems3.length; index++) {
        const elem3 = numberItems3[index]
        elem3.style.transform = `translate(-50%, -${numberArr3[index] * 10}%)`
       }
      }
  }
}
</script>
