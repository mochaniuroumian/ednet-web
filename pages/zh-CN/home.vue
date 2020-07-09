<template>
  <section class="home">
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
      swiperOption: {
        autoplay: true,
        slidesPerView: 3,
        spaceBetween: 30,
        slidesPerGroup: 3,
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
    await store.dispatch('app/getHomePage')

    let newsGroup1, picGroup1, productGroup1, params, ad1, announces
    const homeGroups = store.state.app.homePage.groups.filter(x => x.catalogGroup)

    ad1 = store.state.app.homePage.blocks.length > 0 ? store.state.app.homePage.blocks[0] : {}
    newsGroup1 =
      homeGroups.filter(x => x.catalogGroup.catalogType === 1).length > 0
        ? homeGroups.filter(x => x.catalogGroup.catalogType === 1)[0].catalogGroup
        : null
    picGroup1 =
      homeGroups.filter(x => x.catalogGroup.catalogType === 2).length > 0
        ? homeGroups.filter(x => x.catalogGroup.catalogType === 2)[0].catalogGroup
        : null
    productGroup1 =
      homeGroups.filter(x => x.catalogGroup.catalogType === 3).length > 0
        ? homeGroups.filter(x => x.catalogGroup.catalogType === 3)[0].catalogGroup
        : null
    if (newsGroup1 !== null) {
      params = {
        params: {
          CatalogGroupId: newsGroup1.id,
          SkipCount: 0,
          MaxResultCount: 6,
          Sorting: 'IsTop DESC, Number DESC'
        }
      }
      newsGroup1.items = (await store.dispatch('app/getCatalogList', params)).items
    }
    if (picGroup1 !== null) {
      params = {
        params: {
          CatalogGroupId: picGroup1.id,
          SkipCount: 0,
          MaxResultCount: 6,
          Sorting: 'IsTop DESC, Number DESC'
        }
      }
      picGroup1.items = (await store.dispatch('app/getCatalogList', params)).items
    }
    if (productGroup1 !== null) {
      params = {
        params: {
          Id: productGroup1.id
        }
      }
      const result = await store.dispatch('app/getCatalogGroupList', params)
      productGroup1.children = result

      params = {
        params: {
          CatalogGroupId: productGroup1.id,
          SkipCount: 0,
          MaxResultCount: 6,
          Sorting: 'IsTop DESC, Number DESC'
        }
      }
      productGroup1.items = (await store.dispatch('app/getCatalogList', params)).items
    }
    params = {
      params: {
        SkipCount: 0,
        MaxResultCount: 2
      }
    }
    announces = (await store.dispatch('app/getAnounces', params)).items
    return { ad1, announces, newsGroup1, picGroup1, productGroup1 }
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
    }
  }
}
</script>
