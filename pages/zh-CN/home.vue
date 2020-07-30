<template>
  <section class="home">
    <section class="ad-container container">
      <div class="ad-content">
        <h3 class="title">
          <span class="name">{{ ad1.title }}</span>
        </h3>
        <div class="text">{{ ad1.text }}</div>
        <div class="links">
          <a
            :href="ad1.url?ad1.url:'javascript:void(0)'"
            class="button-gray"
          >{{ $L(`More`) }} ></a>
        </div>
      </div>
    </section>
    <section class="announce container">
      <section class="looper">
        <div v-swiper="announceSwiperOption">
          <div class="swiper-wrapper">
            <div
              v-for="item in announces"
              :key="item.id"
              class="swiper-slide"
              @click="target(item.id)"
            >
              <div class="cover">
                <img :src="item.cover" />
              </div>
              <h3>{{ item.title }}</h3>
            </div>
          </div>
        </div>
      </section>
    </section>
    <section v-if="group1" class="container product-list">
      <ul>
        <li
          v-for="item in group1.children"
          :key="item.id"
          @click="goNewsGroup(item.id,group1.type)"
        >
          <div class="product-icon-container">
            <div class="product-icon">
              <img :src="item.icon" />
            </div>
            <div class="product-info">
              <h4>{{ item.displayName }}</h4>
              <p>{{ item.info }}</p>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <section v-if="group2" class="container picnews">
      <h3 class="block-title">
        <span class="name">{{ group2.title }}</span>
        <span class="more">
          <a
            href="javascript:void(0)"
            @click="goNewsGroup(group2.catalogGroupId,group2.type)"
          >{{ $L('More') }} ></a>
        </span>
      </h3>
      <section class="looper">
        <div v-swiper:mySwiper="swiperOption">
          <div class="swiper-wrapper position-relative">
            <div
              v-for="(item, index) in group2.items"
              :key="index"
              class="swiper-slide"
              @click="goNewsDetail(item.id,group2.type)"
            >
              <img :src="item.cover" />
              <div class="slide-info">
                <a>{{ item.title }}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
    <section v-if="group3" class="container">
      <section class="news-container">
        <section class="news">
          <div class="news-list">
            <dl>
              <dt class="block-title">
                <span class="name">{{ group3.title }}</span>
                <span class="more">
                  <a
                    href="javascript:void(0)"
                    @click="goNewsGroup(group3.catalogGroupId,group3.type)"
                  >{{ $L('More') }} ></a>
                </span>
              </dt>
              <dd v-for="item in group3.items" :key="item.id">
                <a
                  class="gray"
                  href="javascript:void(0)"
                  @click="goNewsDetail(item.id,group3.type)"
                >{{ filter(item.title,60) }}</a>
              </dd>
            </dl>
          </div>
          <div class="ad">
            <div class="ad-img">
              <img ref="adImg" :src="ad1.img" />
            </div>
            <div class="ad-content">
              <h3 class="block-title">
                <span class="name">{{ ad1.title }}</span>
                <span class="more"></span>
              </h3>
              <div class="ad-text">{{ ad1.text }}</div>
              <div class="ad-links">
                <a
                  :href="ad1.url?ad1.url:'javascript:void(0)'"
                  class="button-primary"
                >{{ $L(`More`) }} ></a>
              </div>
            </div>
          </div>
        </section>
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
      announceSwiperOption: {
        autoplay: true,
        loop: true
      },
      swiperOption: {
        autoplay: true,
        loop: true
      }
    }
  },
  computed: {
    ...mapState({
      currentPath: state => state.app.currentPath,
      culture: state => state.app.culture,
      partners: state => state.app.partners,
      homePage: state => state.app.homePage
    })
  },
  async asyncData({ isDev, route, store, env, query, req, res, redirect, error }) {
    let params, group1, group2, group3, ad1, announces
    let homeGroups = store.state.app.homePage.groups.filter(x => x.catalogGroup)

    ad1 = store.state.app.homePage.blocks.length > 0 ? store.state.app.homePage.blocks[0] : {}
    group1 = homeGroups.length > 0 ? homeGroups[0] : null
    group2 = homeGroups.length > 1 ? homeGroups[1] : null
    group3 = homeGroups.length > 2 ? homeGroups[2] : null

    group1.items = group1.items.slice(0, 5)
    group2.items = group2.items.slice(0, 5)
    group3.items = group3.items.slice(0, 5)

    params = {
      params: {
        SkipCount: 0,
        MaxResultCount: 1
      }
    }
    announces = (await store.dispatch('app/getAnounces', params)).items
    return { ad1, announces, group1, group2, group3 }
  },
  created() {},
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
    }
  }
}
</script>
